import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // In a real app, this would process the image and call your Python backend
    // For demo purposes, we'll simulate a response
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response from the AI model
    const result = {
      condition: 'Eczema',
      confidence: 92,
      severity: 'Medium',
      description: 'Eczema (atopic dermatitis) is a condition that makes your skin red and itchy. It\'s common in children but can occur at any age. Eczema is long-lasting (chronic) and tends to flare periodically.',
      recommendations: [
        'Apply moisturizer regularly, especially after bathing',
        'Use mild, fragrance-free soaps and detergents',
        'Avoid scratching the affected areas',
        'Consider using over-the-counter hydrocortisone cream for mild symptoms',
        'Consult with a dermatologist for prescription treatments if symptoms are severe'
      ]
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}