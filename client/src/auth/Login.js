import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Fragment>
      <section className='container'>
        <div className='jumbotron'>
          <h1 className='large text-success'>Sign In</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Sign into your account
          </p>
          <form action='dashboard.html' className='form'>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                minlength='6'
                className='form-control'
              />
            </div>
            <input
              type='submit'
              value='Login'
              className='btn btn-success form-control'
            />
          </form>
          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
