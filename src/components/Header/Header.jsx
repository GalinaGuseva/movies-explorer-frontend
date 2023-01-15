import React from 'react';
import { useRoutes } from 'react-router-dom';
import HeaderMain from './HeaderMain';
import HeaderLanding from './HeaderLanding';
import './Header.css';

export default function Header({ isLoggedIn, openMenu }) {
  return useRoutes([
    { path: '/', element: isLoggedIn ? <HeaderMain onShowMenu={openMenu} /> : <HeaderLanding /> },
    { path: '/movies', element: <HeaderMain onShowMenu={openMenu} /> },
    { path: '/saved-movies', element: <HeaderMain onShowMenu={openMenu} /> },
    { path: '/signup', element: '' },
    { path: '/signin', element: '' },
    { path: '/profile', element: <HeaderMain onShowMenu={openMenu} /> },
  ])
}
