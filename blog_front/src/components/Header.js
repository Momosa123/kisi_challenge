import { useNavigate } from "react-router-dom";
import Search from "./Search";

export default function Header() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  return (
    <div>
      <header>
        <h1 onClick={handleClick} className="header-title" type="button">
          TECH Blog
        </h1>

        <Search />
      </header>
    </div>
  );
}
