import { axiosInstance } from "./axiosI";

import { returnErrors } from "./errorActions";
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from "./types";

export const getOrders = (id) => (dispatch) => {
  dispatch(setOrdersLoading());
  axiosInstance
    .get(`/api/order/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const checkout = (id, source) => (dispatch) => {
  axiosInstance
    .post(`/api/order/${id}`, { source })
    .then((res) =>
      dispatch({
        type: CHECKOUT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
