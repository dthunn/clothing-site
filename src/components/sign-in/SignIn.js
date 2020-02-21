import React from 'react';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-botton/CustomButton';
import Alert from '../alert/alert';

import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      alert: true,
      msg: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      this.setState({ alert: true, msg: 'Unable to log in' });
      setTimeout(() => {
        this.setState({ alert: false, msg: '' });
      }, 3000);
      console.log(error);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { alert, msg } = this.state;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        {alert && <Alert msg={msg} />}
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
          </div>
        </form>
        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
          Sign in with Google
        </CustomButton>
      </div>
    );
  }
}

export default SignIn;
