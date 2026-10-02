import { useEffect, useRef, useState } from "react";

function formatTime(time) {
  const safeTime = Number.isFinite(time) && time > 0 ? time : 0;
  const minutes = Math.floor(safeTime / 60);
  const seconds = Math.floor(safeTime % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function PlayerBar({ song }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const durationLabel = duration > 0
    ? formatTime(duration)
    : song?.duration ?? "--:--";
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    audioRef.current?.pause();
    audioRef.current?.load();
  }, [song?.id, song?.audioUrl]);

  const togglePlayback = () => {
    const audio = audioRef.current;

    if (!audio || !song?.audioUrl) {
      return;
    }

    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  const seekTo = (event) => {
    const nextTime = Number(event.target.value);
    setCurrentTime(nextTime);

    if (audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }
  };

  const skipBy = (seconds) => {
    const audio = audioRef.current;

    if (!audio || duration === 0) {
      return;
    }

    const nextTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <section className="player-bar" aria-label="Music player">
      <audio
        ref={audioRef}
        src={song?.audioUrl || undefined}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="player-track-info" aria-live="polite">
        {song ? (
          <img className="player-cover" src={song.coverUrl} alt="" />
        ) : (
          <div className="player-cover is-empty" aria-hidden="true" />
        )}
        <div className="player-track-copy">
          {song ? (
            <>
              <strong>{song.title}</strong>
              <span>{song.artist}</span>
            </>
          ) : (
            <>
              <span className="player-placeholder-line" aria-hidden="true" />
              <span className="player-placeholder-line is-short" aria-hidden="true" />
              <span className="sr-only">No song selected</span>
            </>
          )}
        </div>
      </div>

      <div className="player-controls" aria-label="Playback controls">
        <div className="player-control-buttons">
          <button type="button" aria-label="Previous song" disabled>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="5" width="3" height="14" />
              <path d="M19 5v14L8 12z" />
            </svg>
          </button>
          <button
            className="player-skip-button"
            type="button"
            onClick={() => skipBy(-10)}
            aria-label="Skip back 10 seconds"
            disabled={!song?.audioUrl || duration === 0}
          >
            <span aria-hidden="true">−10</span>
          </button>
          <button
            className="player-play-button"
            type="button"
            onClick={togglePlayback}
            aria-label={song ? `${isPlaying ? "Pause" : "Play"} ${song.title}` : "Select a song to play"}
            disabled={!song?.audioUrl}
          >
            {isPlaying ? "Ⅱ" : "▶"}
          </button>
          <button
            className="player-skip-button"
            type="button"
            onClick={() => skipBy(10)}
            aria-label="Skip forward 10 seconds"
            disabled={!song?.audioUrl || duration === 0}
          >
            <span aria-hidden="true">+10</span>
          </button>
          <button type="button" aria-label="Next song" disabled>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 5v14l11-7z" />
              <rect x="16" y="5" width="3" height="14" />
            </svg>
          </button>
        </div>
        <div className="player-timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            className="player-progress-range"
            type="range"
            min="0"
            max={duration || 1}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={seekTo}
            disabled={!song?.audioUrl || duration === 0}
            aria-label="Song progress"
            aria-valuetext={`${formatTime(currentTime)} of ${durationLabel}`}
            style={{ "--player-progress": `${progress}%` }}
          />
          <span>{durationLabel}</span>
        </div>
      </div>

      <div className="player-volume" aria-hidden="true">
        <span className="player-volume-icon">&#9834;</span>
        <span className="player-volume-track" />
      </div>
    </section>
  );
}
