import { NavLink } from "react-router-dom";

export default () => {
  return (
    <>
      <h1>Home Page</h1>
      <br />
      <NavLink to="/about">Goto About</NavLink>
    </>
  );
};
