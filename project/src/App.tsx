import React, { useState } from 'react';
import { Camera, Upload, Settings, BarChart3, HelpCircle, Moon, Sun } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CameraDetection from './components/CameraDetection';
import ImageUpload from './components/ImageUpload';
import SettingsPanel from './components/SettingsPanel';
import Documentation from './components/Documentation';
import { DetectionProvider } from './context/DetectionContext';
import { useTheme } from './context/ThemeContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { state: themeState, dispatch: themeDispatch } = useTheme();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'camera', label: 'Live Detection', icon: Camera },
    { id: 'upload', label: 'Upload & Analyze', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'docs', label: 'Documentation', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'camera':
        return <CameraDetection />;
      case 'upload':
        return <ImageUpload />;
      case 'settings':
        return <SettingsPanel />;
      case 'docs':
        return <Documentation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DetectionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">CarVision Pro</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => themeDispatch({ type: 'TOGGLE_THEME' })}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  title={themeState.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {themeState.isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  AI-Powered Car Parts Detection
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      </div>
    </DetectionProvider>
  );
}

export default App;