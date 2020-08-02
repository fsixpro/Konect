import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { connect } from 'react-redux';
import Alert from '../components/layout/Alert';
const Register = ({ setAlert, alerts: { alert } }) => {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formInput;

  const onChangeHandler = e => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    // if (!name || !email || !password || !password2) {
    //   setAlert('please enter all fields', 'danger');
    // } else
    if (password !== password2) {
      setAlert('password not match', 'danger');
    }
  };
  return (
    <Fragment>
      <section className='container flex'>
        <div className='jumbotron'>
          <Alert />

          <h1 className='large text-success mx-auto'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create Your Account
          </p>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                name='name'
                value={name}
                type='text'
                placeholder='Name'
                className='form-control'
                onChange={onChangeHandler}
              />
            </div>
            <div className='form-group'>
              <input
                name='email'
                value={email}
                type='email'
                placeholder='Email Address'
                className='form-control'
                onChange={onChangeHandler}
              />
            </div>
            <div className='form-group'>
              <input
                name='password'
                value={password}
                type='password'
                placeholder='Password'
                className='form-control'
                onChange={onChangeHandler}
              />
            </div>
            <div className='form-group'>
              <input
                name='password2'
                value={password2}
                type='password'
                placeholder='Confirm Password'
                className='form-control'
                onChange={onChangeHandler}
              />
            </div>
            <input
              type='submit'
              value='Register'
              className='btn btn-success form-control'
            />
          </form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert })(Register);
