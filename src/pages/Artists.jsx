import PageNavigation from "../components/PageNavigation";

export default function Artists({ searchValue, onSearchChange }) {
  return (
    <main className="page-placeholder">
      <PageNavigation searchValue={searchValue} onSearchChange={onSearchChange} />
      <h1>ARTISTS.</h1>
    </main>
  );
}
