import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ active = false, className = '', children, ...props }) => (
  <Link className={`nav-link ${active ? 'active' : ''} ${className}`} {...props}>
    {children}
  </Link>
);

export default NavLink;
