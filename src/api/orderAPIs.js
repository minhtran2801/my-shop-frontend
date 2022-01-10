import { API } from "../config";

export const createOrder = (userId, token, order) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ order: order }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSingleOrder = (orderId, userId, token) => {
  return fetch(`${API}/order/${userId}/${orderId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOrderStatus = (userId, token) => {
  return fetch(`${API}/order/status/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateOrderStatus = (orderId, userId, token, status) => {
  return fetch(`${API}/order/${userId}/status/${orderId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ orderId, status }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
