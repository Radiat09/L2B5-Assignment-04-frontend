import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4 px-5">
      <Link to="/">Home</Link>
      <Link to="/add-book">Add book</Link>
      <Link to="/borrow-summery">Borrow Summary</Link>
      {/* <div className="cursor-pointer">
        <ModeToggle />
      </div> */}
    </nav>
  );
}
