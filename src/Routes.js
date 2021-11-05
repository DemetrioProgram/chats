import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import ListCalls from './pages/ListCalls/ListCalls';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/chats" component={ListCalls} />
            </Switch>
        </BrowserRouter>
    );
}