import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home/home';
import Header from './layout/header';


const Main = () => (
    <>
        <header>
            <Header />
        </header>
        <Switch>
            <Route to="/" exact>
                <Home />
            </Route>
        </Switch>
    </>
);


export default Main;