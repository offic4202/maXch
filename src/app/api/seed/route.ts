import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/store';

export async function GET() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}