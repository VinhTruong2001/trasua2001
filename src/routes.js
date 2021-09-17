import React from 'react';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Order from './pages/Order';
import Payment from './pages/Payment';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Homepage />
    },
    {
        path: '/order/:category/:id',
        exact: false,
        main: ({match}) => <Order match={match} />
    },
    {
        path: '/order',
        exact: false,
        main: () => <Order />
    },
    {
        path: '/payment',
        exact: false,
        main: () => {
            const cartData = JSON.parse(window.localStorage.getItem("products")) || [];
            
            if (cartData.length === 0) {
                return <NotFound />
            }
            else {
                return <Payment />
            }
        }
    },
    {
        path: '*',
        exact: false,
        main: () => <NotFound />
    },
];

export default routes;