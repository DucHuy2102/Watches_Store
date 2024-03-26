import {
    HomePage,
    OrderPage,
    ProductPage,
    NotFoundPage,
    AboutPage,
    ContactPage,
    Login,
    Register,
} from '../pages/exportPages';

export const routes = [
    {
        path: '/',
        component: HomePage,
        isShowHeader: true,
    },
    {
        path: '/order',
        component: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/products',
        component: ProductPage,
        isShowHeader: true,
    },
    {
        path: '/about',
        component: AboutPage,
        isShowHeader: true,
    },
    {
        path: '/contact',
        component: ContactPage,
        isShowHeader: true,
    },
    {
        path: '/login',
        component: Login,
        isShowHeader: true,
        isShowFooter: false,
    },
    {
        path: '/register',
        component: Register,
        isShowHeader: true,
        isShowFooter: false,
    },

    // not found page
    {
        path: '*',
        component: NotFoundPage,
    },
];
