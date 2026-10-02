import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  ["LIBRARY", "/library"],
  ["PLAYLISTS", "/playlists"],
  ["ARTISTS", "/artists"],
  ["UPLOAD", "/upload"],
];

export default function PageNavigation({ searchValue, onSearchChange }) {
  const [isOpen, setIsOpen] = useState(() => {
    return sessionStorage.getItem("tureka-navigation-open") === "true";
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleNavigation = () => {
    setIsOpen((open) => {
      const nextOpen = !open;
      sessionStorage.setItem("tureka-navigation-open", String(nextOpen));
      return nextOpen;
    });
  };

  return (
    <div className="page-navigation-shell">
      <nav className={`page-navigation${isOpen ? " is-open" : ""}`}>
        <div className="navigation-links">
          {navigationItems.map(([label, path]) => (
            <Link
              className={pathname === path ? "is-active" : ""}
              key={path}
              to={path}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          className="navigation-toggle"
          type="button"
          onClick={toggleNavigation}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`navigation-search${isSearchOpen ? " is-open" : ""}`}>
        {isSearchOpen && (
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsSearchOpen(false);
              }
            }}
            placeholder="Search songs"
            aria-label="Search songs by title or artist"
            autoFocus
          />
        )}
        <button
          className="navigation-search-toggle"
          type="button"
          onClick={() => setIsSearchOpen((open) => !open)}
          aria-label={isSearchOpen ? "Close song search" : "Open song search"}
          aria-expanded={isSearchOpen}
        >
          {isSearchOpen ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.3" />
              <path d="m15.5 15.5 4 4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
