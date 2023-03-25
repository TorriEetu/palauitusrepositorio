import React from "react";

const success = {
  color: "green",
  background: "lightgrey",
  font_size: 20,
  border_style: "solid",
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
};

const error = {
  color: "red",
  background: "lightgrey",
  font_size: 20,
  border_style: "solid",
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  //Probably super bad way to do this
  if (message[1] === false) {
    return <div className="error" style={error}>{message}</div>;
  }
  return <div className="success" style={success}>{message}</div>;
};

export default Notification;
