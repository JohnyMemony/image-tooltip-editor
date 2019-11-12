import React from 'react';
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';

import './Layout.scss';

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <Header />
            <div className="page">
                <div className="page__sidebar">
                    <MainMenu />
                </div>
                <div className="page__content">
                    {children}
                </div>
            </div>
        </div>
    )
}
