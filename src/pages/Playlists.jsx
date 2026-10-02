import PageNavigation from "../components/PageNavigation";

export default function Playlists({ searchValue, onSearchChange }) {
  return (
    <main className="page-placeholder">
      <PageNavigation searchValue={searchValue} onSearchChange={onSearchChange} />
      <h1>PLAYLISTS.</h1>
    </main>
  );
}
