import React from 'react';

function Footer() {

  // Динамическое обновление года
  let date = new Date().getFullYear();

  return (
    <footer className="footer page__padding">
      <p className="footer__copyright">© {date} Mesto Russia</p>
    </footer>
  )
}

export default Footer;
