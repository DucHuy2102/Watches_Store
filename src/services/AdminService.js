import axios from 'axios';

// approve order by admin
export const acceptOrder = async (token, orderId) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/approvalOrder?orderId=${encodeURIComponent(
            orderId
        )}`,
        null,

        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return res.data;
};

// cancel order by admin
export const cancelOrder = async (token, orderId) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/cancelOrder?orderId=${encodeURIComponent(orderId)}`,
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return res.data;
};
