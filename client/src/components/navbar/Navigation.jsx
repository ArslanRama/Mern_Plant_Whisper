import React, { Component} from 'react'
import {useState} from 'react'

import {BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect} from 'react-router-dom'

// import {Form, FormControl, Button} from 'react-bootstrap';

/* */
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';


const Navigation =()=>  {
    return (
      <Router>
        <div className="App">
          <nav className="Navbar">
            <ul className="navbar-title">
              {/* We cannot use "activeStyle" with Link.  */}
              <li><NavLink activeStyle={{ color: 'red' }} to='/' > Home </NavLink></li>
              <li><Link to='/about' >About</Link></li>
              <li><Link to='/contact' >Contact</Link></li>
              <Redirect to='/'/>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Redirect to='/'/>
          </Switch>
        </div>
      </Router>
    );
  }


export default Navigation;