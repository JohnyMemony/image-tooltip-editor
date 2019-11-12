import React from 'react';
import {Link} from 'react-router-dom';
import constants from '../../../constants';
import logo from '../../../assets/images/logo192.png';

import './Header.scss';

const {ROUTES} = constants;

export default function Header() {
    return (
        <header className="header">
            <Link to={ROUTES.ROOT} className="header__logo">
                <img src={logo} alt=""/>
            </Link>
        </header>
    )
}
