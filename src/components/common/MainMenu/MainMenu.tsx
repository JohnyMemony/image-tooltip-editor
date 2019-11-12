import React from 'react';
import {Link} from 'react-router-dom';
import constants from '../../../constants';

import './MainMenu.scss';

const {ROUTES} = constants;

export default function MainMenu() {
    return (
        <nav>
            <ul className="main-menu">
                <li>
                    <Link to={ROUTES.ROOT}>Dashboard</Link>
                </li>
                <li>
                    <Link to={ROUTES.IMAGES}>Add image</Link>
                </li>
            </ul>
        </nav>
    )
}
