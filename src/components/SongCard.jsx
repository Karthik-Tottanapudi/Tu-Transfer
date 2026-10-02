export default function SongCard({ song, onPlay }) {
  return (
    <article className="song-card">
      <img className="song-card-cover" src={song.coverUrl} alt="" />
      <div className="song-card-details">
        <h2>{song.title}</h2>
        <p>{song.artist}</p>
        <span>{song.duration}</span>
      </div>
      <button type="button" onClick={() => onPlay(song)} aria-label={`Play ${song.title}`}>
        Play
      </button>
    </article>
  );
}
