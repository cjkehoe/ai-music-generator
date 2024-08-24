// utils.ts

export interface GeneratedSong {
    id: string;
    prompt: string;
    audioUrl: string;
    albumCoverUrl: string;
    createdAt: number;
}

const STORAGE_KEY = 'ai_music_generator_songs';

export const storeSong = (song: GeneratedSong) => {
    const storedSongs = getSongs();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([song, ...storedSongs]));
};

export const getSongs = (): GeneratedSong[] => {
    const storedSongs = localStorage.getItem(STORAGE_KEY);
    return storedSongs ? JSON.parse(storedSongs) : [];
};

export const deleteSong = (id: string) => {
    const storedSongs = getSongs();
    const updatedSongs = storedSongs.filter(song => song.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSongs));
};