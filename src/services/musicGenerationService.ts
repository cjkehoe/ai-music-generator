// src/services/musicGenerationService.ts

import axios from 'axios';

const API_BASE_URL = 'https://api.aimlapi.com';
const API_KEY = process.env.SUNO_API_KEY;

interface MusicGenerationResponse {
    id: string;
    status: string;
    audio_url?: string;
}

export async function generateMusic(prompt: string, makeInstrumental: boolean = false): Promise<any> {
    try {
        console.log('Generating music with prompt:', prompt);
        const response = await axios.post(
            `${API_BASE_URL}/generate`,
            {
                prompt,
                make_instrumental: makeInstrumental,
                wait_audio: true,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Suno API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error generating music:', error);
        throw error;
    }
}

export async function getMusicDetails(id: string): Promise<MusicGenerationResponse> {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/?ids[0]=${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data[0];
    } catch (error) {
        console.error('Error fetching music details:', error);
        throw new Error('Failed to fetch music details');
    }
}