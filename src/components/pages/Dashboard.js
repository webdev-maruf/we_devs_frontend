import React, { Component } from "react";
import { Redirect, Switch, Route, Link,NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import axios from 'axios';
import { getToken, getUser,removeUserSession, setUserSession } from '../../lib/Common';

import Home from "../Home";
import Product from "./Product";
import NotFound from "./NotFound";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false
    };
  }
  signOut = () => {    
    const token = getToken();
    const apiUrl = process.env.REACT_APP_API_URL;
    if(token){
      axios.post(apiUrl+"/logout", {},{
          headers: { 
            Accept:'application/json',
            Authorization: 'Bearer '+token
          } 
        })
      .then(response => {
      })
    }

    removeUserSession(); 
    this.setState({
      islogout: true
    });

  };
  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (
      <div>
        <ul className='nav'>
          <li>
            <Link to={`${match.path}`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`${match.path}/product`}>Product</Link>
          </li>
          <li className="push-right">
            <button  onClick={this.signOut} className='signout-button'>
              Sign Out
            </button>
          </li>
        </ul>
        <main role="main">
          <div className="main">
            <Switch>
              <Route path={`${match.path}/product`}>
                <Product />
              </Route>
              <Route exact path={`${match.path}`}>
                <Home />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
 
export default withRouter(Dashboard);