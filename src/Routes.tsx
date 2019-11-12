import React from 'react';
import {Switch, Route} from "react-router-dom";
import Layout from './components/common/Layout/Layout';
import constants from './constants';

// Pages
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ImagePage from './pages/ImagePage/ImagePage';

const {ROUTES} = constants;

export default function Routes() {
    return (
        <Layout>
            <Switch>
                <Route path={ROUTES.IMAGES}>
                    <ImagePage/>
                </Route>
                <Route path={ROUTES.ROOT}>
                    <DashboardPage/>
                </Route>
            </Switch>
        </Layout>
    );
}
