import axios from 'axios';

// get all comments
export const getComments = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comment`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};

// get comment by id product
export const getCommentByIdProduct = async (idProduct) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comment/${idProduct}`);
    return res.data;
};

// post comment in product
export const postComment = async (token, data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/comment/createComment`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};

// edit comment in product
export const editComment = async (token, data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/comment/editComment`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};

// delete comment in product
export const deleteComment = async (token, idComment) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/comment/delete/${idComment}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};
