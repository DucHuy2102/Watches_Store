import axios from 'axios';

// login
export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
    return res.data;
};

// register
export const registerUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
    return res.data;
};

// get user info
export const getUserDetail = async (access_token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

// update user info
export const updateInfoUser = async (access_token, data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/editDetail`, data, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};

// get address user
export const getAddressUser = async (access_token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/address`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

// fortgot password
export const forgotPassword = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, data);
    return res.data;
};

// reset password
export const resetPassword = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/resetPassword`, data);
    return res.data;
};

// get all user
export const getAllUser = async (access_token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getAll`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

// delete user
export const deleteUser = async (access_token, id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};

// block user
export const blockUser = async (access_token, id, message) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/blockUser/${id}?message=${encodeURIComponent(
            message
        )}`,
        null,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return res.data;
};

// unblock user
export const unblockUser = async (access_token, id) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/unBlockUser/${id}`, null, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};
