import React, { useRef, useEffect, useState } from 'react';
import { Camera, Square, Play, Pause, Download, Settings } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';
import { simulateDetection, drawDetections } from '../utils/detectionEngine';

export default function CameraDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectionInterval, setDetectionInterval] = useState<NodeJS.Timeout | null>(null);
  const [currentResult, setCurrentResult] = useState<any>(null);
  
  const { state, dispatch } = useDetection();

  useEffect(() => {
    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
      stopCamera();
    };
  }, [detectionInterval]);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setIsDetecting(false);
    if (detectionInterval) {
      clearInterval(detectionInterval);
      setDetectionInterval(null);
    }
  };

  const startDetection = () => {
    if (!isStreaming || !videoRef.current || !canvasRef.current) return;
    
    setIsDetecting(true);
    
    const interval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx || video.videoWidth === 0) return;
      
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame
      ctx.drawImage(video, 0, 0);
      
      try {
        dispatch({ type: 'SET_PROCESSING', payload: true });
        
        const result = await simulateDetection(
          video.videoWidth,
          video.videoHeight,
          state.settings.confidenceThreshold
        );
        
        setCurrentResult(result);
        
        // Draw detections on canvas
        drawDetections(canvas, result.parts);
        
        if (state.settings.autoSave) {
          dispatch({ type: 'ADD_RESULT', payload: result });
        }
        
      } catch (error) {
        console.error('Detection error:', error);
      } finally {
        dispatch({ type: 'SET_PROCESSING', payload: false });
      }
    }, state.settings.realTimeMode ? 1000 : 3000); // 1s or 3s intervals
    
    setDetectionInterval(interval);
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (detectionInterval) {
      clearInterval(detectionInterval);
      setDetectionInterval(null);
    }
  };

  const captureFrame = () => {
    if (!canvasRef.current || !currentResult) return;
    
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    
    const resultWithImage = {
      ...currentResult,
      imageData: dataUrl,
    };
    
    dispatch({ type: 'ADD_RESULT', payload: resultWithImage });
    
    // Download the image
    const link = document.createElement('a');
    link.download = `detection_${new Date().toISOString()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Live Detection</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time car parts detection using camera feed</p>
        </div>
        <div className="flex items-center space-x-3">
          {isStreaming && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Camera Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Camera Controls</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={startCamera}
              disabled={isStreaming}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>Start Camera</span>
            </button>
            <button
              onClick={stopCamera}
              disabled={!isStreaming}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Square className="w-4 h-4" />
              <span>Stop</span>
            </button>
            {isStreaming && (
              <>
                <button
                  onClick={isDetecting ? stopDetection : startDetection}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  {isDetecting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isDetecting ? 'Stop Detection' : 'Start Detection'}</span>
                </button>
                {currentResult && (
                  <button
                    onClick={captureFrame}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Capture</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Video Feed */}
        <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-auto"
            style={{ display: isStreaming ? 'block' : 'none' }}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{ display: isDetecting ? 'block' : 'none' }}
          />
          
          {!isStreaming && (
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-600 dark:text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">Camera feed will appear here</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Click "Start Camera" to begin</p>
              </div>
            </div>
          )}
          
          {state.isProcessing && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
              Processing...
            </div>
          )}
        </div>
      </div>

      {/* Detection Results */}
      {currentResult && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Detection Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentResult.totalParts}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Parts Detected</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{currentResult.accuracy}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currentResult.totalCoverage}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Coverage</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 dark:text-white">Detected Parts:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {currentResult.parts.map((part: any) => (
                <div key={part.id} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: part.color }}
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{part.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{Math.round(part.confidence * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}