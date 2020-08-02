import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Fragment>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Konect</h1>
            <p className='lead'>connect and share post with friends</p>
            <div className='buttons'>
              <Link to='/login' className='btn btn-primary'>
                Login
              </Link>
              <Link to='/register' className='btn btn-success'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
