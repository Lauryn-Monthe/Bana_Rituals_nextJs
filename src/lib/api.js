import axios from 'axios';

const API_URL = 'http://localhost:3999/api';

export async function getItems() {
    const res = await axios.get(`${API_URL}/items`);
    return res.data;
}

export async function createOrder(orderData, token) {
    const res = await axios.post(`${API_URL}/orders`, orderData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return res.data;
}