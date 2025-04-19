import React from 'react';
import { Outlet, Link } from "react-router-dom";

const LayoutWithNav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/folders">Folders</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

const Layout = () => {
    return <Outlet />;
}

export default Layout;