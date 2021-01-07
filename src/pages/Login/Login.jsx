import React, { Component } from 'react';
import Header from '../../components/Header'
import './Login.scss';

class Login extends Component {
  gotoHome = () => {
    this.props.history.push('/home')
  }
  
  render() {
    return (
      <div className='P_loginContainer'>
        <Header />
        <div>Page Login</div>
        <button onClick={this.gotoHome}>Home</button>
      </div>
    )
  }
}

export default Login;