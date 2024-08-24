'use client'

import { useState, useEffect, useRef } from 'react'
import { PromptInput } from '../components/PromptInput'
import { GenerateButton } from '../components/GenerateButton'
import { PlayerControls } from '../components/PlayerControls'
import { GeneratedSong, storeSong, getSongs, deleteSong } from '../utils'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const [musicPrompt, setMusicPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentSong, setCurrentSong] = useState<GeneratedSong | null>(null)
  const [storedSongs, setStoredSongs] = useState<GeneratedSong[]>([])
  const [error, setError] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setStoredSongs(getSongs());
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setCurrentSong(null);

    try {
      const response = await axios.post('/api/generate', {
        prompt: musicPrompt,
        makeInstrumental: false,
      });

      const tracks = response.data;

      if (tracks && tracks.length > 0) {
        const firstTrack = tracks[0];
        if (firstTrack.audio_url) {
          const newSong: GeneratedSong = {
            id: uuidv4(),
            prompt: musicPrompt,
            audioUrl: firstTrack.audio_url,
            albumCoverUrl: firstTrack.image_url,
            createdAt: Date.now(),
          };
          setCurrentSong(newSong);
          storeSong(newSong);
          setStoredSongs(getSongs());
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

  useEffect(() => {
    if (currentSong) {
      audioRef.current = new Audio(currentSong.audioUrl);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current!.currentTime);
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      audioRef.current.volume = volume;
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDeleteSong = (id: string) => {
    deleteSong(id);
    setStoredSongs(getSongs());
    if (currentSong && currentSong.id === id) {
      setCurrentSong(null);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="space-y-8 pb-24">
      <h1 className="text-3xl font-bold text-spotify-white">Create AI-Generated Music</h1>

      <div className="bg-spotify-lightBlack rounded-lg p-6 space-y-6">
        <PromptInput
          value={musicPrompt}
          onChange={setMusicPrompt}
          placeholder="E.g., An upbeat jazz melody with piano and saxophone"
        />
        <GenerateButton onClick={handleGenerate} isGenerating={isGenerating} />
      </div>

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {currentSong && (
        <div className="bg-spotify-lightBlack rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            {currentSong.albumCoverUrl && (
              <img src={currentSong.albumCoverUrl} alt="Album Cover" className="w-16 h-16 object-cover rounded" />
            )}
            <div>
              <h2 className="text-xl font-semibold text-spotify-white">{currentSong.prompt}</h2>
              <p className="text-spotify-darkGray">AI Music Generator</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-spotify-darkGray">{formatTime(currentTime)}</span>
            <div className="flex-grow mx-4 h-1 bg-spotify-darkGray rounded-full">
              <div
                className="h-1 bg-spotify-green rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-spotify-darkGray">{formatTime(duration)}</span>
          </div>
        </div>
      )}

      <div className="bg-spotify-lightBlack rounded-lg p-6">
        <h2 className="text-2xl font-bold text-spotify-white mb-4">Your Generated Songs</h2>
        {storedSongs.map((song) => (
          <div key={song.id} className="flex items-center justify-between py-2 border-b border-spotify-darkGray last:border-b-0">
            <div className="flex items-center space-x-4">
              <img src={song.albumCoverUrl} alt="Album Cover" className="w-12 h-12 object-cover rounded" />
              <div>
                <h3 className="text-spotify-white font-semibold">{song.prompt}</h3>
                <p className="text-spotify-darkGray text-sm">{new Date(song.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSong(song)}
                className="text-spotify-green hover:text-spotify-white transition"
              >
                Play
              </button>
              <button
                onClick={() => handleDeleteSong(song.id)}
                className="text-spotify-darkGray hover:text-spotify-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <PlayerControls
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  )
}