import { axiosInstance } from "./axiosI";

import { returnErrors } from "./errorActions";
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from "./types";

export const getCart = (id) => (dispatch) => {
  dispatch(setCartLoading());
  axiosInstance
    .get(`/api/cart/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateCart = (userId, productId, qty) => (dispatch) => {
  dispatch(setCartLoading());
  axiosInstance
    .put(`/api/cart/${userId}`, { productId, qty })
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log("Error in update cart:", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addToCart = (id, productId, quantity) => (dispatch) => {
  axiosInstance
    .post(`/api/cart/${id}`, { productId, quantity })
    .then((res) =>
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteFromCart = (userId, itemId) => (dispatch) => {
  axiosInstance
    .delete(`/api/cart/${userId}/${itemId}`)
    .then((res) =>
      dispatch({
        type: DELETE_FROM_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCartLoading = () => {
  return {
    type: CART_LOADING,
  };
};
