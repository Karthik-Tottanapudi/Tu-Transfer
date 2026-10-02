import PageNavigation from "../components/PageNavigation";

export default function Upload({ searchValue, onSearchChange }) {
  return (
    <main className="page-placeholder">
      <PageNavigation searchValue={searchValue} onSearchChange={onSearchChange} />
      <h1>UPLOAD.</h1>
    </main>
  );
}
