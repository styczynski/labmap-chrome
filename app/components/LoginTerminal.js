import React, { Component, PropTypes } from 'react';
import style from './LoginTerminal.css';

export default class MainSection extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    
    const {actions, labData} = this.props;
    
    //window.location="ssh://"+labData.username+"@students.mimuw.edu.pl"
    /*setTimeout(function(){
      window.location = "https://chrome.google.com/webstore/detail/secure-shell-extension/iodihamcpbpeioajjeobimgagajmlibd?hl=en"
    }, 500);*/
  }
  
  render() {
    const {actions, labData} = this.props;
    
    return (
      <div>
        
      </div>
    );
  }
}
