import React from 'react';
import { BarChart3, Camera, Upload, TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';

export default function Dashboard() {
  const { state } = useDetection();
  const { results, stats } = state;
  
  const recentResults = results.slice(0, 5);
  
  const getPartDistribution = () => {
    const distribution: Record<string, number> = {};
    results.forEach(result => {
      result.parts.forEach(part => {
        distribution[part.name] = (distribution[part.name] || 0) + 1;
      });
    });
    return Object.entries(distribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const partDistribution = getPartDistribution();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Welcome to CarVision Pro</h2>
        <p className="text-blue-100 dark:text-blue-200 text-lg leading-relaxed">
          Advanced AI-powered car parts detection system with real-time analysis capabilities.
          Upload images or use live camera feed to detect and analyze automotive components with precision.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Analyses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAnalyses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Accuracy</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.averageAccuracy.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Processing Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.averageProcessingTime.toFixed(0)}ms
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Status</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">Active</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Results and Part Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Results */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Analyses</h3>
          </div>
          <div className="p-6">
            {recentResults.length > 0 ? (
              <div className="space-y-4">
                {recentResults.map((result, index) => (
                  <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {result.totalParts} parts detected
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {result.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        {result.accuracy}% accuracy
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {result.totalCoverage}% coverage
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No analyses yet</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Start by uploading an image or using live detection</p>
              </div>
            )}
          </div>
        </div>

        {/* Part Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Most Detected Parts</h3>
          </div>
          <div className="p-6">
            {partDistribution.length > 0 ? (
              <div className="space-y-4">
                {partDistribution.map(([partName, count], index) => (
                  <div key={partName} className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{partName}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{count} detections</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(count / Math.max(...partDistribution.map(([,c]) => c))) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No data available</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Part statistics will appear after analyses</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Start Live Detection</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use camera for real-time analysis</p>
            </div>
          </button>
          <button className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <Upload className="w-8 h-8 text-green-600 dark:text-green-400 mr-4" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Upload Images</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Analyze car parts from photos</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}