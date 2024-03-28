import {
    HomePage,
    OrderPage,
    ProductPage,
    NotFoundPage,
    AboutPage,
    ContactPage,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    BlogPage,
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
    },
    {
        path: '/register',
        component: Register,
        isShowHeader: true,
    },
    {
        path: '/forgotPassword',
        component: ForgotPassword,
        isShowHeader: true,
    },
    {
        path: '/resetPassword',
        component: ResetPassword,
        isShowHeader: true,
    },
    {
        path: '/blogs',
        component: BlogPage,
        isShowHeader: true,
    },

    // not found page
    {
        path: '*',
        component: NotFoundPage,
    },
];
