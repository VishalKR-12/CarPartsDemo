import React, { useState } from 'react';
import { 
  Book, 
  Camera, 
  Upload, 
  Settings, 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle,
  Info,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export default function Documentation() {
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            CarVision Pro is an advanced AI-powered system for detecting and analyzing car parts in real-time. 
            This documentation will guide you through all features and best practices.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Quick Start</h4>
                <p className="text-blue-700 text-sm">
                  Navigate to the "Live Detection" tab to start using your camera, or go to "Upload & Analyze" 
                  to process existing images. The Dashboard provides an overview of your analysis history.
                </p>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900">System Requirements</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
            <li>Camera access for live detection (optional)</li>
            <li>Stable internet connection</li>
            <li>Minimum resolution: 640x480 pixels</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'live-detection',
      title: 'Live Detection',
      icon: Camera,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Camera Setup</h4>
          <p className="text-gray-700">
            The live detection feature uses your device's camera to analyze car parts in real-time.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900">Best Practices</h4>
                <ul className="text-green-700 text-sm space-y-1 mt-1">
                  <li>• Ensure good lighting conditions</li>
                  <li>• Keep the camera steady</li>
                  <li>• Maintain 2-4 feet distance from the car</li>
                  <li>• Avoid reflective surfaces and shadows</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900">Detection Controls</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Start Camera</p>
                <p className="text-sm text-gray-600">Initialize camera feed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Start Detection</p>
                <p className="text-sm text-gray-600">Begin real-time analysis</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900">Camera Permissions</h4>
                <p className="text-yellow-700 text-sm">
                  You may be prompted to allow camera access. This is required for live detection to work.
                  Your video is processed locally and never sent to external servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'image-upload',
      title: 'Image Upload & Analysis',
      icon: Upload,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Supported Formats</h4>
          <p className="text-gray-700">
            Upload car images in various formats for detailed analysis:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>JPEG (.jpg, .jpeg)</li>
            <li>PNG (.png)</li>
            <li>GIF (.gif)</li>
            <li>WebP (.webp)</li>
            <li>Maximum file size: 10MB</li>
          </ul>

          <h4 className="font-semibold text-gray-900">Upload Methods</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Drag & Drop</h5>
              <p className="text-sm text-gray-600">
                Simply drag your image file onto the upload area for quick processing.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">File Browser</h5>
              <p className="text-sm text-gray-600">
                Click "Choose File" to browse and select images from your device.
              </p>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900">Analysis Features</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Automatic part detection and labeling</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Confidence scoring for each detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Coverage percentage calculation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Interactive boundary visualization</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Image Quality Tips</h4>
                <ul className="text-blue-700 text-sm space-y-1 mt-1">
                  <li>• Use high-resolution images (minimum 800x600)</li>
                  <li>• Ensure the car is the main subject</li>
                  <li>• Avoid heavily cropped or zoomed images</li>
                  <li>• Include multiple car parts for better analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'settings',
      title: 'Settings & Configuration',
      icon: Settings,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Detection Parameters</h4>
          
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Confidence Threshold</h5>
              <p className="text-sm text-gray-600 mb-2">
                Controls the minimum confidence level required for part detection.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Lower values (50-70%):</strong> More sensitive, may include false positives</li>
                <li>• <strong>Higher values (80-95%):</strong> More precise, may miss some parts</li>
                <li>• <strong>Recommended:</strong> 70% for balanced results</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Real-time Mode</h5>
              <p className="text-sm text-gray-600">
                Enables faster detection intervals (1 second) for live camera feed. 
                Disable for more thorough analysis with 3-second intervals.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Auto-save Results</h5>
              <p className="text-sm text-gray-600">
                Automatically saves detection results from live camera to your analysis history.
                Useful for continuous monitoring applications.
              </p>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900">Performance Modes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-2">Speed Optimized</h5>
              <p className="text-blue-700 text-sm">
                Prioritizes fast processing for real-time applications. 
                Slight reduction in accuracy for improved performance.
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h5 className="font-semibold text-green-900 mb-2">Quality Optimized</h5>
              <p className="text-green-700 text-sm">
                Maximum accuracy with longer processing times. 
                Best for detailed analysis and documentation.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: HelpCircle,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Common Issues</h4>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Camera Not Working</h5>
              <p className="text-sm text-gray-600 mb-2"><strong>Symptoms:</strong> "Unable to access camera" error</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Solutions:</strong></p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Check browser permissions for camera access</li>
                <li>• Ensure no other applications are using the camera</li>
                <li>• Try refreshing the page</li>
                <li>• Use a different browser if the issue persists</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Poor Detection Accuracy</h5>
              <p className="text-sm text-gray-600 mb-2"><strong>Symptoms:</strong> Missing parts or false detections</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Solutions:</strong></p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Improve lighting conditions</li>
                <li>• Adjust confidence threshold in settings</li>
                <li>• Use higher resolution images</li>
                <li>• Ensure the car is clearly visible and unobstructed</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Slow Processing</h5>
              <p className="text-sm text-gray-600 mb-2"><strong>Symptoms:</strong> Long processing times</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Solutions:</strong></p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Switch to "Speed Optimized" mode in settings</li>
                <li>• Use smaller image files (under 5MB)</li>
                <li>• Close other browser tabs to free up resources</li>
                <li>• Check your internet connection</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Upload Failures</h5>
              <p className="text-sm text-gray-600 mb-2"><strong>Symptoms:</strong> Images won't upload or process</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Solutions:</strong></p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Verify file format is supported (JPG, PNG, GIF, WebP)</li>
                <li>• Ensure file size is under 10MB</li>
                <li>• Try a different image</li>
                <li>• Clear browser cache and reload</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900">Contact Support</h4>
                <p className="text-red-700 text-sm">
                  If you continue experiencing issues after trying these solutions, 
                  please contact our support team with details about your browser, 
                  operating system, and the specific error you're encountering.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Documentation</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Complete guide to using CarVision Pro for car parts detection and analysis
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-center"
              >
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">{section.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          
          return (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                )}
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Video Tutorials</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Watch step-by-step video guides for common tasks and advanced features.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">API Documentation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Technical documentation for developers integrating with CarVision Pro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}