import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface DetectedPart {
  id: string;
  name: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  area: number;
  color: string;
}

export interface DetectionResult {
  id: string;
  timestamp: Date;
  totalParts: number;
  totalCoverage: number;
  accuracy: number;
  processingTime: number;
  parts: DetectedPart[];
  imageData?: string;
}

interface DetectionState {
  results: DetectionResult[];
  isProcessing: boolean;
  settings: {
    confidenceThreshold: number;
    realTimeMode: boolean;
    autoSave: boolean;
  };
  stats: {
    totalAnalyses: number;
    averageAccuracy: number;
    averageProcessingTime: number;
  };
}

type DetectionAction =
  | { type: 'ADD_RESULT'; payload: DetectionResult }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<DetectionState['settings']> }
  | { type: 'CLEAR_RESULTS' };

const initialState: DetectionState = {
  results: [],
  isProcessing: false,
  settings: {
    confidenceThreshold: 0.7,
    realTimeMode: true,
    autoSave: false,
  },
  stats: {
    totalAnalyses: 0,
    averageAccuracy: 0,
    averageProcessingTime: 0,
  },
};

function detectionReducer(state: DetectionState, action: DetectionAction): DetectionState {
  switch (action.type) {
    case 'ADD_RESULT':
      const newResults = [action.payload, ...state.results.slice(0, 49)]; // Keep last 50 results
      const totalAnalyses = state.stats.totalAnalyses + 1;
      const averageAccuracy = 
        (state.stats.averageAccuracy * state.stats.totalAnalyses + action.payload.accuracy) / totalAnalyses;
      const averageProcessingTime = 
        (state.stats.averageProcessingTime * state.stats.totalAnalyses + action.payload.processingTime) / totalAnalyses;
      
      return {
        ...state,
        results: newResults,
        stats: {
          totalAnalyses,
          averageAccuracy,
          averageProcessingTime,
        },
      };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case 'CLEAR_RESULTS':
      return {
        ...state,
        results: [],
        stats: {
          totalAnalyses: 0,
          averageAccuracy: 0,
          averageProcessingTime: 0,
        },
      };
    default:
      return state;
  }
}

const DetectionContext = createContext<{
  state: DetectionState;
  dispatch: React.Dispatch<DetectionAction>;
} | null>(null);

export function DetectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(detectionReducer, initialState);

  return (
    <DetectionContext.Provider value={{ state, dispatch }}>
      {children}
    </DetectionContext.Provider>
  );
}

export function useDetection() {
  const context = useContext(DetectionContext);
  if (!context) {
    throw new Error('useDetection must be used within a DetectionProvider');
  }
  return context;
}