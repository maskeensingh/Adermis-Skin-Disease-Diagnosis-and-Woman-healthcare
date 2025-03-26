'use client';

import React, { createContext, useContext, useState } from 'react';

// Types
interface SkinConcernInput {
  image?: File | null;
  imagePreview?: string | null;
  textDescription?: string;
  selectedConcerns?: string[];
}

interface AnalysisResult {
  condition: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  recommendations: string[];
  followUpQuestions?: string[];
}

interface SkinAnalysisContextType {
  input: SkinConcernInput;
  setInput: React.Dispatch<React.SetStateAction<SkinConcernInput>>;
  result: AnalysisResult | null;
  setResult: React.Dispatch<React.SetStateAction<AnalysisResult | null>>;
  finalTreatment: string;
  setFinalTreatment: React.Dispatch<React.SetStateAction<string>>;
}

const SkinAnalysisContext = createContext<SkinAnalysisContextType | undefined>(undefined);

export function SkinAnalysisProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState<SkinConcernInput>({
    image: null,
    imagePreview: null,
    textDescription: '',
    selectedConcerns: []
  });

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [finalTreatment, setFinalTreatment] = useState<string>('');

  const value: SkinAnalysisContextType = {
    input,
    setInput,
    result,
    setResult,
    finalTreatment,
    setFinalTreatment
  };

  return (
    <SkinAnalysisContext.Provider value={value}>
      {children}
    </SkinAnalysisContext.Provider>
  );
}

export function useSkinAnalysis() {
  const context = useContext(SkinAnalysisContext);
  if (!context) {
    throw new Error('useSkinAnalysis must be used within a SkinAnalysisProvider');
  }
  return context;
}
