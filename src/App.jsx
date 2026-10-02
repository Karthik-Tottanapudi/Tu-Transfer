import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Landing from "./pages/Landing";
import Library from "./pages/Library";
import Playlists from "./pages/Playlists";
import Artists from "./pages/Artists";
import Upload from "./pages/Upload";
import PlayerBar from "./components/PlayerBar";

function AppRoutes({ selectedSong, setSelectedSong, searchValue, onSearchChange }) {
  const { pathname } = useLocation();
  const showPlayer = ["/library", "/playlists", "/artists", "/upload"].includes(pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/library" element={<Library onPlay={setSelectedSong} searchValue={searchValue} onSearchChange={onSearchChange} />} />
        <Route path="/playlists" element={<Playlists searchValue={searchValue} onSearchChange={onSearchChange} />} />
        <Route path="/artists" element={<Artists searchValue={searchValue} onSearchChange={onSearchChange} />} />
        <Route path="/upload" element={<Upload searchValue={searchValue} onSearchChange={onSearchChange} />} />
      </Routes>
      {showPlayer && (
        <PlayerBar key={selectedSong?.id ?? "empty-player"} song={selectedSong} />
      )}
    </>
  );
}

function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  return (
    <BrowserRouter>
      <AppRoutes
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
    </BrowserRouter>
  );
}

export default App;