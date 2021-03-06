import React from "react";
import { Switch, Route } from 'react-router-dom';
import { NavLink} from "react-router-dom";
import Home from '../Home';
import Product from '../pages/Product';

export default function Layout() {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <NavLink className="nav-link" to="/" activeClassName='active-menu'>
                Home
              </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/product" activeClassName='active-menu'>
                Product
              </NavLink>
          </li>
        </ul>
      </nav>

      <div className='content'>
        <Route exact path="/"><Home /></Route>
        <Route path="/product"><Product /></Route>
      </div>

    </div>
  );
}