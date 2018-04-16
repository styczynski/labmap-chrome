import React, { PropTypes, Component } from 'react';
import style from './Footer.css';

export default class Header extends Component {

  render() {
    return (
      <footer onClick={() => {
        window.open('https://gitlab.com/styczynski/labmap-chrome');
      }} className={style.footer}>
        <p>Coding/design: <b>Piotr Styczyński</b></p>
        <p>API: <b>Tomasz Miśków</b></p>
      </footer>
    );
  }
}
