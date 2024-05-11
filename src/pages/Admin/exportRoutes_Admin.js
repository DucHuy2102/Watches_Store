import { Login_AdminPage, AddProduct, EditProduct } from './pages/exportPagesAdmin';

export const routes = [
    {
        path: '/admin/login',
        component: Login_AdminPage,
    },
    {
        path: '/admin/add-product',
        component: AddProduct,
    },
    {
        path: '/admin/edit-product',
        component: EditProduct,
    },
];
