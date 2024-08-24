// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { generateMusic } from '@/services/musicGenerationService';

export async function POST(request: Request) {
    try {
        const { prompt, makeInstrumental } = await request.json();
        const result = await generateMusic(prompt, makeInstrumental);
        console.log('API route result:', result);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Failed to generate music' }, { status: 500 });
    }
}