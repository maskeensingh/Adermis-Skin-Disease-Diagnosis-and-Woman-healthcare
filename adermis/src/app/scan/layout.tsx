'use client';

import React from 'react';
import { SkinAnalysisProvider } from './context/SkinAnalysisContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SkinAnalysisProvider>
      {children}
    </SkinAnalysisProvider>
  );
}
