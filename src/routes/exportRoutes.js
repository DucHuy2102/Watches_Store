import {
    HomePage,
    OrderPage,
    ProductPage,
    NotFoundPage,
    AboutPage,
    ContactPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    BlogPage,
    CheckoutPage,
    ProductDetail,
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
        component: LoginPage,
        isShowHeader: true,
    },
    {
        path: '/register',
        component: RegisterPage,
        isShowHeader: true,
    },
    {
        path: '/forgotPassword',
        component: ForgotPasswordPage,
        isShowHeader: true,
    },
    {
        path: '/resetPassword',
        component: ResetPasswordPage,
        isShowHeader: true,
    },
    {
        path: '/blogs',
        component: BlogPage,
        isShowHeader: true,
    },
    {
        path: '/checkout',
        component: CheckoutPage,
        isShowHeader: true,
    },
    {
        path: '/products/:id',
        component: ProductDetail,
        isShowHeader: true,
    },

    // page not found
    {
        path: '*',
        component: NotFoundPage,
    },
];
