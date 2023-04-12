import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch) => {
  axios
    .post("/api/items", item)
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

  const ApiUrl =
    "https://gqy3s0g1m2.execute-api.us-east-1.amazonaws.com/developement";
  axios({
    method: "post",
    url: ApiUrl,
    data: {
      orderId: "123456789",
      userEmail: "shvetanghan@gmail.com",
    },
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    });
};

export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateItem = (id, item) => (dispatch) => {
  axios
    .put(`/api/items/${id}`, item)
    .then((res) =>
      dispatch({
        type: UPDATE_ITEM,
        payload: Promise.all([id, res.data]),
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
