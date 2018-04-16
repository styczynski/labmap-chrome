import React, { Component, PropTypes } from 'react';
import style from './LoginTerminal.css';

export default class MainSection extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    const {actions, labData} = this.props;
    
    actions.changeSSHLogin(event.target.value);
  }

  componentDidMount() {
    
    const {actions, plan, labData} = this.props;
    
    const proceed = () => {
      setTimeout(function(){
        window.location = "https://chrome.google.com/webstore/detail/secure-shell-extension/iodihamcpbpeioajjeobimgagajmlibd?hl=en"
      }, 500);
      window.location="ssh://"+login+"@students.mimuw.edu.pl";
    };
    
    const login = (plan.sshLogin)?(plan.sshLogin):'';
    if(login.length > 0) proceed();
  }
  
  render() {
    const {actions, plan, labData} = this.props;
    
    const login = (plan.sshLogin)?(plan.sshLogin):'';
    
    const proceed = () => {
      setTimeout(function(){
        window.location = "https://chrome.google.com/webstore/detail/secure-shell-extension/iodihamcpbpeioajjeobimgagajmlibd?hl=en"
      }, 500);
      window.location="ssh://"+login+"@students.mimuw.edu.pl";
    };
    
    return (
      <div className={style.loginTerminal}>
        <p>This window will not be shown again after entering login for Students machine.</p>
        <p>Please enter the login in the form <b>xy123456</b></p>
        <p>The Secure Shell App must be installed in order to work on SSH remotely</p>
        <p>If the extension is not found you will be redirected to the download page.</p>
        <p>Please enter your ssh login (it will be saved):</p>
        <form>
          <label>
            <input type="text" value={login} onChange={this.handleChange} />
          </label>
        </form>
        <button onClick={proceed}>
          Proceed
        </button>
      </div>
    );
  }
}
