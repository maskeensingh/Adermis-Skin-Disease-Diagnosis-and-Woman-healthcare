import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Fetch actual user data from database
    const userData = await prisma.user.findUnique({
      where: { id: '1' }, // Replace with actual user ID retrieval logic
      select: {
        id: true,
        name: true,
        email: true,
        // Add other fields from your User model
        // profileImage: true,
        // dateJoined: true
      }
    });

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        // Add other fields you want to update
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}