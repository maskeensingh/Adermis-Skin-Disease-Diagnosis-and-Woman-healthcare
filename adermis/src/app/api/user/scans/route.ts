import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real app, this would fetch scan history from database
    // For demo purposes, we'll return mock data
    
    // Get limit from query params
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    
    const scans = [
      {
        id: 1,
        date: '2023-03-15',
        condition: 'Eczema',
        confidence: 92,
        severity: 'Medium',
        imageUrl: 'https://dermnetnz.org/assets/Uploads/eczema-close.jpg',
      },
      {
        id: 2,
        date: '2023-02-28',
        condition: 'Psoriasis',
        confidence: 87,
        severity: 'High',
        imageUrl: 'https://dermnetnz.org/assets/Uploads/psoriasis-plaque3.jpg',
      },
      {
        id: 3,
        date: '2023-01-10',
        condition: 'Acne',
        confidence: 95,
        severity: 'Low',
        imageUrl: 'https://dermnetnz.org/assets/Uploads/acne-mild3.jpg',
      },
      {
        id: 4,
        date: '2022-12-05',
        condition: 'Rosacea',
        confidence: 89,
        severity: 'Medium',
        imageUrl: 'https://dermnetnz.org/assets/Uploads/rosacea-6.jpg',
      },
    ];
    
    return NextResponse.json(limit ? scans.slice(0, limit) : scans);
  } catch (error) {
    console.error('Error fetching scans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scan history' },
      { status: 500 }
    );
  }
}