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
    Admin_LoginPage,
    Admin_ListProduct,
    Admin_DashboardPage,
    Admin_CategoryPage,
    Admin_BillPage,
    Admin_UserPage,
} from '../pages/exportPages';

export const routes = [
    // Admin
    {
        path: '/admin',
        component: Admin_LoginPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '/admin/dashboard',
        component: Admin_DashboardPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '/admin/product',
        component: Admin_ListProduct,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '/admin/category',
        component: Admin_CategoryPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '/admin/bill',
        component: Admin_BillPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '/admin/user',
        component: Admin_UserPage,
        isShowHeader: false,
        isPrivate: true,
    },

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
        path: '/product_detail/:id',
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
