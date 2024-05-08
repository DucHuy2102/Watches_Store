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
    ProfilePage,
} from '../pages/exportPages';

export const routes = [
    // pages
    {
        path: '/',
        component: HomePage,
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
        path: '/blogs',
        component: BlogPage,
        isShowHeader: true,
    },

    // product
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
        path: '/product/:id',
        component: ProductDetail,
        isShowHeader: true,
    },

    // auth
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

    // checkout
    {
        path: '/checkout',
        component: CheckoutPage,
        isShowHeader: true,
    },

    // profile
    {
        path: '/profile',
        component: ProfilePage,
        isShowHeader: true,
    },

    // page not found
    {
        path: '*',
        component: NotFoundPage,
    },
];
