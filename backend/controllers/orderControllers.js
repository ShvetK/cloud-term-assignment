const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const axios = require("axios");

module.exports.get_orders = async (req, res) => {
  const userId = req.params.id;
  Order.find({ userId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
};

module.exports.checkout = async (req, res) => {
  try {
    const userId = req.params.id;
    let cart = await Cart.findOne({ userId });
    let user = await User.findOne({ _id: userId });

    if (cart) {
      const order = await Order.create({
        userId,
        items: cart.items,
        bill: cart.bill,
      });
      const data = await Cart.findByIdAndDelete({ _id: cart.id });

      const apiUrl =
        "https://eawleioq74.execute-api.us-east-1.amazonaws.com/deployment/mailsend";

      axios
        .post(apiUrl, {
          userEmail: user.email,
          subject: `Your order is succefully completed and your orderId is ${order._id}`,
          text: `
          Your order for ${order.items.length} items completed.          
          Your total bill for this order is $ ${order.bill}`,
        })
        .then((response) => {
          // handle success
          console.log(response.data);
        })
        .catch((error) => {
          // handle error
          console.log("Email successfully sent");
        });

      return res.status(201).send(order);
    } else {
      res.status(500).send("You do not have items in cart");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
