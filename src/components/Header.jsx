import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img width={150} src="/metafar.svg" alt="logo" />
      </Link>
        <span>Stocks</span>
    </header>
  );
}
