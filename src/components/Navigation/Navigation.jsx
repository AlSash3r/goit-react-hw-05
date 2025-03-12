import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

export default function Navigation() {
  const buildClasses = ({ isActive }) => clsx(s.navig, { [s.active]: isActive });

  return (
    <header className={s.navigationHeader}>
      <nav className={s.nav}>
        <NavLink to="/" className={buildClasses}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildClasses}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
