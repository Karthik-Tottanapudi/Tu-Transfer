import { useEffect, useState } from "react";
import PageNavigation from "../components/PageNavigation";
import SongCard from "../components/SongCard";
import { getSongs } from "../services/songService";

export default function Library({ onPlay = () => {}, searchValue = "", onSearchChange }) {
  const [songs, setSongs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const normalizedSearch = searchValue.trim().toLowerCase();
  const filteredSongs = normalizedSearch
    ? songs.filter((song) =>
        `${song.title} ${song.artist}`.toLowerCase().includes(normalizedSearch),
      )
    : songs;

  useEffect(() => {
    let isMounted = true;

    getSongs()
      .then((loadedSongs) => {
        if (isMounted) {
          setSongs(loadedSongs);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("We could not load your library.");
          setStatus("error");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="library-page">
      <PageNavigation searchValue={searchValue} onSearchChange={onSearchChange} />
      <header className="library-header">
        <h1>LIBRARY.</h1>
      </header>

      {status === "loading" && <p className="library-status">Loading library...</p>}
      {status === "error" && <p className="library-status">{error}</p>}
      {status === "ready" && songs.length === 0 && (
        <p className="library-status">Your library is empty.</p>
      )}
      {status === "ready" && songs.length > 0 && filteredSongs.length === 0 && (
        <p className="library-status">No songs match your search.</p>
      )}
      {status === "ready" && songs.length > 0 && (
        <section className="song-grid" aria-label="Songs">
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} onPlay={onPlay} />
          ))}
        </section>
      )}
    </main>
  );
}