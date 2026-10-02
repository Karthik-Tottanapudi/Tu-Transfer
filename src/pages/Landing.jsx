import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PhotoColumns from "../components/PhotoColumns";

const heroFontOptions = [
  ["Dela Gothic One", "'Dela Gothic One', Impact, sans-serif"],
];

function ReverseTypingText({ text, className, startDelay = 4, style }) {
  const characters = Array.from(text);

  return (
    <span className={className} style={style} aria-label={text}>
      {characters.map((character, index) => (
        <span
          className="reverse-typing-character"
          key={`${character}-${index}`}
          style={{
            "--character-delay": `${startDelay + (characters.length - 1 - index) * 0.02}s`,
          }}
          aria-hidden="true"
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}

export default function Landing() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.height = isExpanded
        ? "100vh"
        : `${cardRef.current.offsetHeight}px`;
    }
  }, [isExpanded]);

  const handleLaunch = () => {
    if (hasLaunched) {
      return;
    }

    setHasLaunched(true);
    window.setTimeout(() => setIsExpanded(true), 800);
  };

  return (
    <main className="landing-page">

      {/* Moving photograph background */}
      <PhotoColumns />

      {/* Dark cinematic overlay */}
      <div className="background-overlay" />

      {/* Center glass card */}
      <section
        ref={cardRef}
        className={`launch-card${hasLaunched ? " is-launched" : ""}${isExpanded ? " is-expanded" : ""}`}
      >

        <div className={`launch-content${hasLaunched ? " is-launched" : ""}`}>

          <div className="font-options">
            {heroFontOptions.map(([, family]) => (
              <div className="font-option" key={family}>
                <ReverseTypingText
                  className="font-sample"
                  text="Hi  Karthik."
                  startDelay={0.1}
                  style={{ fontFamily: family }}
                />
              </div>
            ))}
          </div>

          <h1>
            <ReverseTypingText
              className="heading-script"
              text="Music,"
              startDelay={0.1}
            />{" "}
            <ReverseTypingText
              className="heading-serif"
              text="the way you want it to be."
              startDelay={0.1}
            />
          </h1>

          <button
            className={`launch-button${hasLaunched ? " is-launching" : ""}`}
            onClick={handleLaunch}
            aria-label="Launch Tureka"
          >
            <span>Launch Tureka.</span>
          </button>

        </div>

        <div className="expanded-title" aria-hidden={!isExpanded}>
          Tureka.
        </div>

        <div className="split-cards" aria-hidden={!isExpanded}>
          <Link className="split-card split-card-top-left" to="/library" aria-label="Open Library">
            <svg className="split-card-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
              <path d="M4 5.5v16M8 7h8M8 11h8" />
            </svg>
            <span>LIBRARY</span>
          </Link>
          <Link className="split-card split-card-top-right" to="/playlists" aria-label="Open Playlists">
            <svg className="split-card-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h11M4 11h11M4 16h7" />
              <circle cx="18" cy="16" r="3" />
              <path d="M21 16V5l-6 1.5" />
            </svg>
            <span>PLAYLISTS</span>
          </Link>
          <Link className="split-card split-card-bottom-left" to="/artists" aria-label="Open Artists">
            <svg className="split-card-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21a7 7 0 0 1 14 0M17 4.5a3 3 0 0 1 0 7" />
            </svg>
            <span>ARTISTS</span>
          </Link>
          <Link className="split-card split-card-bottom-right" to="/upload" aria-label="Open Upload">
            <svg className="split-card-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 15V3M7 8l5-5 5 5M5 14v5h14v-5" />
            </svg>
            <span>UPLOAD</span>
          </Link>
        </div>

      </section>

    </main>
  );
}