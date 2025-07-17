import React from 'react';
import { Settings, Sliders, Camera, Save, RotateCcw } from 'lucide-react';
import { useDetection } from '../context/DetectionContext';

export default function SettingsPanel() {
  const { state, dispatch } = useDetection();
  const { settings } = state;

  const updateSetting = (key: keyof typeof settings, value: any) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { [key]: value },
    });
  };

  const resetSettings = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        confidenceThreshold: 0.7,
        realTimeMode: true,
        autoSave: false,
      },
    });
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all detection data? This action cannot be undone.')) {
      dispatch({ type: 'CLEAR_RESULTS' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Configure detection parameters and system preferences</p>
        </div>
        <button
          onClick={resetSettings}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Detection Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detection Parameters</h3>
            <p className="text-gray-600 dark:text-gray-400">Adjust AI detection sensitivity and accuracy</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Confidence Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confidence Threshold: {Math.round(settings.confidenceThreshold * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="0.95"
              step="0.05"
              value={settings.confidenceThreshold}
              onChange={(e) => updateSetting('confidenceThreshold', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>50% (More sensitive)</span>
              <span>95% (More precise)</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Lower values detect more parts but may include false positives. Higher values are more precise but may miss some parts.
            </p>
          </div>

          {/* Real-time Mode */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Real-time Detection Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enable faster detection intervals for live camera feed</p>
            </div>
            <button
              onClick={() => updateSetting('realTimeMode', !settings.realTimeMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.realTimeMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.realTimeMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Auto-save */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Auto-save Results</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically save detection results from live camera</p>
            </div>
            <button
              onClick={() => updateSetting('autoSave', !settings.autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoSave ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Performance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <Camera className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance & Quality</h3>
            <p className="text-gray-600 dark:text-gray-400">Optimize detection speed and quality</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Speed Optimized</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
              Faster detection with slightly reduced accuracy. Best for real-time applications.
            </p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply Speed Mode
            </button>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">Quality Optimized</h4>
            <p className="text-sm text-green-700 dark:text-green-400 mb-3">
              Highest accuracy with longer processing time. Best for detailed analysis.
            </p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Apply Quality Mode
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Information</h3>
            <p className="text-gray-600 dark:text-gray-400">Current system status and statistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Analyses</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{state.stats.totalAnalyses}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Accuracy</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{state.stats.averageAccuracy.toFixed(1)}%</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Processing Time</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{state.stats.averageProcessingTime.toFixed(0)}ms</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Stored Results</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{state.results.length}</p>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
            <Save className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Management</h3>
            <p className="text-gray-600 dark:text-gray-400">Manage stored detection data and results</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">Storage Usage</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">
              Currently storing {state.results.length} detection results. 
              Data is stored locally in your browser.
            </p>
            <div className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
              <div 
                className="bg-yellow-600 dark:bg-yellow-500 h-2 rounded-full"
                style={{ width: `${Math.min((state.results.length / 50) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
              {state.results.length}/50 results stored
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All Data
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}