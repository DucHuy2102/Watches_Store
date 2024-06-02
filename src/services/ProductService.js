import axios from 'axios';

// Get all products
export const getAllProduct = async () => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/getAll`
    );
    return res.data;
};

// Get product by id
export const getProductById = async (id) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`
    );
    return res.data;
};

// Get all product by category
export const getAllProductByCategory = async (id) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/${id}`
    );
    return res.data;
};

// Get product by category
export const getProductByCategory = async (id) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/${id}`
    );
    return res.data;
};

// Create product
export const createProduct = async (token, data) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/create`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return res.data;
};

// Edit product
export const editProduct = async (token, data) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/edit`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return res.data;
};

// Delete product
export const deleteProduct = async (token, id) => {
    const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/product/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return res.data;
};

// find product by name
export const findProductByName = async (name) => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/find/${name}`
    );
    return res.data;
};
