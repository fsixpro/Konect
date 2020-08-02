import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Fragment>
      <nav className='navbar bg-dark'>
        <h1>
          <a href='/'>
            {' '}
            <i className='fas fa-compress'></i> K{' '}
          </a>
        </h1>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
