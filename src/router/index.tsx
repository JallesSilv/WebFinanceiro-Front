import React from 'react';
import { Route } from 'react-router-dom';
import { RequireAuth } from '../contexts/Auth/RequireAuth';

import { Dashboard } from '../pages/dashboard/Dashboard';
import { EmptyPage } from '../pages/emptyPage/EmptyPage';
import { Financeiro } from '../pages/financeiro';
import { Partido } from '../pages/partido/index';

export const Router = (props) => {
    return (
        <>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/empty" component={EmptyPage}/>
            <Route path="/partido" component={Partido}/>
            <RequireAuth><Route path="/financeiro" component={Financeiro}/></RequireAuth>
        </>
    );
}
