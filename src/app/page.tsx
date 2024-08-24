// src/app/page.tsx
'use client'

import { useState } from 'react'
import { PromptInput } from '../components/PromptInput'
import { GenerateButton } from '../components/GenerateButton'
import { Toggle } from '../components/Toggle'
import { Music, Image, Play } from 'react-feather'
import axios from 'axios'

export default function Home() {
  const [musicPrompt, setMusicPrompt] = useState('')
  const [useCustomAlbumPrompt, setUseCustomAlbumPrompt] = useState(false)
  const [albumPrompt, setAlbumPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [error, setError] = useState('')
  const [albumCoverUrl, setAlbumCoverUrl] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setAudioUrl('');
    setAlbumCoverUrl('');

    try {
      const response = await axios.post('/api/generate', {
        prompt: musicPrompt,
        makeInstrumental: false,
      });

      const tracks = response.data;

      if (tracks && tracks.length > 0) {
        const firstTrack = tracks[0];
        if (firstTrack.audio_url) {
          setAudioUrl(firstTrack.audio_url);
          // Set the album cover URL
          setAlbumCoverUrl(firstTrack.image_url);
        } else {
          setError('Music generation succeeded, but no audio URL was provided.');
        }
      } else {
        setError('No tracks were generated. Please try again.');
      }
    } catch (error) {
      console.error('Error generating music:', error);
      setError('An error occurred while generating music. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-5xl font-bold text-primary-500 dark:text-primary-400 text-center mb-6">Create AI-Generated Music</h1>

      <div className="bg-white dark:bg-dark-300 rounded-lg shadow-lg p-6 space-y-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-start space-x-2">
          <Music className="text-primary-500 mt-8 flex-shrink-0" />
          <div className="flex-grow">
            <PromptInput
              label="Enter your music prompt"
              value={musicPrompt}
              onChange={setMusicPrompt}
              placeholder="E.g., An upbeat jazz melody with piano and saxophone"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Use custom album cover prompt</span>
          <Toggle enabled={useCustomAlbumPrompt} setEnabled={setUseCustomAlbumPrompt} />
        </div>

        {useCustomAlbumPrompt && (
          <div className="flex items-start space-x-2 animate-fadeIn">
            <Image className="text-primary-500 mt-8 flex-shrink-0" />
            <div className="flex-grow">
              <PromptInput
                label="Enter your album cover prompt"
                value={albumPrompt}
                onChange={setAlbumPrompt}
                placeholder="E.g., A vibrant cityscape with jazz instruments floating in the sky"
              />
            </div>
          </div>
        )}

        <GenerateButton onClick={handleGenerate} isGenerating={isGenerating} />

        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audio player */}
        <div className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600 dark:text-primary-400 flex items-center">
            <Play className="mr-2" />
            Audio Player
          </h2>
          {audioUrl ? (
            <div>
              <p>Audio URL: {audioUrl}</p>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <div className="bg-gray-200 dark:bg-dark-400 h-24 rounded flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 italic">Generate music to play</p>
            </div>
          )}
        </div>

        {/* Visualization area */}
        <div className="bg-white dark:bg-dark-300 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600 dark:text-primary-400 flex items-center">
            <Music className="mr-2" />
            Visualization
          </h2>
          <div className="bg-gray-200 dark:bg-dark-400 h-48 rounded flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 italic">Music visualization will appear here</p>
          </div>
        </div>

        {/* Album cover */}
        <div className="md:col-span-2 bg-white dark:bg-dark-300 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600 dark:text-primary-400 flex items-center">
            <Image className="mr-2" />
            Album Cover
          </h2>
          {albumCoverUrl ? (
            <img src={albumCoverUrl} alt="Generated Album Cover" className="w-full h-64 object-cover rounded" />
          ) : (
            <div className="bg-gray-200 dark:bg-dark-400 h-64 rounded flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 italic">
                {isGenerating ? "Generating album cover..." : "Generate music to create an album cover"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}