import React from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'react-feather'
import { GeneratedSong } from '../utils'

interface PlayerControlsProps {
    currentSong: GeneratedSong | null;
    isPlaying: boolean;
    onPlayPause: () => void;
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
}

export function PlayerControls({
    currentSong,
    isPlaying,
    onPlayPause,
    currentTime,
    duration,
    onSeek,
    volume,
    onVolumeChange
}: PlayerControlsProps) {
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        onSeek(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        onVolumeChange(newVolume);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-spotify-lightBlack p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Current song info */}
                <div className="flex items-center space-x-4 w-1/4">
                    {currentSong && (
                        <>
                            <img src={currentSong.albumCoverUrl} alt="Album Cover" className="w-14 h-14 object-cover rounded" />
                            <div>
                                <h3 className="text-spotify-white text-sm font-medium truncate">{currentSong.prompt}</h3>
                                <p className="text-spotify-darkGray text-xs">AI Music Generator</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Middle: Playback controls */}
                <div className="flex flex-col items-center w-1/2">
                    <div className="flex items-center space-x-4 mb-2">
                        <SkipBack className="text-spotify-white cursor-pointer" size={20} />
                        <button
                            onClick={onPlayPause}
                            className="bg-spotify-white rounded-full p-2 hover:scale-105 transition"
                        >
                            {isPlaying ? (
                                <Pause className="text-spotify-black" size={24} />
                            ) : (
                                <Play className="text-spotify-black" size={24} />
                            )}
                        </button>
                        <SkipForward className="text-spotify-white cursor-pointer" size={20} />
                    </div>
                    <div className="w-full flex items-center space-x-2">
                        <span className="text-xs text-spotify-darkGray">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1 bg-spotify-darkGray appearance-none rounded-full"
                            style={{
                                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(currentTime / duration) * 100}%, #535353 ${(currentTime / duration) * 100}%, #535353 100%)`,
                            }}
                        />
                        <span className="text-xs text-spotify-darkGray">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Right: Volume control */}
                <div className="flex items-center space-x-2 w-1/4 justify-end">
                    <Volume2 className="text-spotify-white" size={20} />
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-spotify-darkGray appearance-none rounded-full"
                        style={{
                            background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${volume * 100}%, #535353 ${volume * 100}%, #535353 100%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}