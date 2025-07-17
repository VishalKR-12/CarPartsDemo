import React, { useRef, useState, useCallback } from 'react';
import { Upload, Image, X, Download, Eye, Edit3 } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';
import { simulateDetection, drawDetections } from '../utils/detectionEngine';

export default function ImageUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<any>(null);
  const [showLabels, setShowLabels] = useState(true);
  
  const { state, dispatch } = useDetection();

  const handleFiles = useCallback(async (files: FileList) => {
    const file = files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setUploadedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Process image
    await processImage(file);
  }, []);

  const processImage = async (file: File) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = async () => {
        if (!canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image
        ctx.drawImage(img, 0, 0);

        try {
          dispatch({ type: 'SET_PROCESSING', payload: true });
          
          const result = await simulateDetection(
            img.width,
            img.height,
            state.settings.confidenceThreshold
          );

          // Add image data to result
          const resultWithImage = {
            ...result,
            imageData: canvas.toDataURL(),
          };

          setCurrentResult(resultWithImage);
          
          // Draw detections
          drawDetections(canvas, result.parts, showLabels);
          
          dispatch({ type: 'ADD_RESULT', payload: resultWithImage });
          
        } catch (error) {
          console.error('Processing error:', error);
        } finally {
          dispatch({ type: 'SET_PROCESSING', payload: false });
        }
        
        resolve();
      };
      
      img.src = imagePreview || URL.createObjectURL(file);
    });
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const clearImage = () => {
    setUploadedFile(null);
    setImagePreview(null);
    setCurrentResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadResult = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `detection_${new Date().toISOString()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const toggleLabels = async () => {
    setShowLabels(!showLabels);
    if (currentResult && canvasRef.current && imagePreview) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Redraw image
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        drawDetections(canvas, currentResult.parts, !showLabels);
      };
      img.src = imagePreview;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Image Analysis</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Upload car images for detailed parts detection and analysis</p>
        </div>
        {currentResult && (
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLabels}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{showLabels ? 'Hide Labels' : 'Show Labels'}</span>
            </button>
            <button
              onClick={downloadResult}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        )}
      </div>

      {/* Upload Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          
          {!uploadedFile ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Upload car image for analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drag and drop your image here, or click to browse
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Supports: JPG, PNG, GIF, WebP (Max 10MB)
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <Image className="w-6 h-6 text-green-600" />
                <span className="font-medium text-gray-900 dark:text-white">{uploadedFile.name}</span>
                <button
                  onClick={clearImage}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Display and Results */}
      {imagePreview && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Canvas */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detection Results</h3>
              {state.isProcessing && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Processing...</span>
                </div>
              )}
            </div>
            
            <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Metrics */}
            {currentResult && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analysis Metrics</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Parts Detected</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{currentResult.totalParts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Coverage</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{currentResult.totalCoverage}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Accuracy</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{currentResult.accuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Processing Time</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{currentResult.processingTime}ms</span>
                  </div>
                </div>
              </div>
            )}

            {/* Detected Parts List */}
            {currentResult && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detected Parts</h3>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {currentResult.parts.map((part: any) => (
                    <div key={part.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: part.color }}
                        />
                        <span className="font-medium text-gray-900 dark:text-white">{part.name}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.round(part.confidence * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}