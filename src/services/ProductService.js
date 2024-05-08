import axios from 'axios';

// Get all products
export const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAll`);
    return res.data;
};

// Get product by id
export const getProductById = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`);
    return res.data;
};
