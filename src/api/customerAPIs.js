import { API } from "../config";

export const signUpUser = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signInUser = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signOutUser = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const readProfile = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
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

export const updateProfile = (userId, token, user) => {
  return fetch(`${API}/user/update/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProfileLocal = (user, next) => {
  if (typeof window === "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    let profile = JSON.parse(localStorage.getItem("jwt"));
    profile.user.f_name = user.f_name;
    profile.user.l_name = user.l_name;
    profile.user.email = user.email;
    localStorage.setItem("jwt", JSON.stringify(profile));
    next();
  } else {
    return false;
  }
};

export const changePassword = (userId, token, user) => {
  return fetch(`${API}/user/update/password/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOrderHistory = (userId, token) => {
  return fetch(`${API}/order/history/${userId}`, {
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
