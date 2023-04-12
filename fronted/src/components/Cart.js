import { Component, Fragment } from "react";
// import { useHistory } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import "../css/Cart.css";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Alert,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCart, deleteFromCart, updateCart } from "../actions/cartActions";
import Checkout from "./Checkout";
import { checkout } from "../actions/orderActions";
// import { NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";
// import PaymentPopup from "./PaymentPopup";
class Cart extends Component {
  state = {
    loaded: false,
  };
  // state = {
  //   showPaymentPopup: false,
  // };

  // handlePayment = () => {
  //   this.setState({
  //     showPaymentPopup: true,
  //   });
  // };

  // state = {
  //   showPaymentPopup: false,
  // };
  // handlePayNowClick = this.handlePayNowClick.bind(this);
  // handlePaymentSubmit = this.handlePaymentSubmit.bind(this);

  // handlePayNowClick() {
  //   this.setState({ showPaymentPopup: true });
  // }

  // handlePaymentSubmit() {
  //   // handle payment submit logic here
  //   // navigate to orders page using react-router-dom
  // }

  static propTypes = {
    getCart: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    addToCart: PropTypes.func.isRequired,
    deleteFromCart: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
    checkout: PropTypes.func.isRequired,
  };

  handleClick = () => {
    this.props.history.push("/orders");
  };

  getCartItems = async (id) => {
    await this.props.getCart(id);
    this.state.loaded = true;
  };

  onDeleteFromCart = (id, itemId) => {
    this.props.deleteFromCart(id, itemId);
  };
  onUpdateQuantity = async (userId, productId, qty) => {
    await this.props.updateCart(userId, productId, qty);
  };

  render() {
    const user = this.props.user;
    if (
      this.props.isAuthenticated &&
      !this.props.cart.loading &&
      !this.state.loaded
    ) {
      this.getCartItems(user._id);
    }
    return (
      <div>
        <AppNavbar />
        {this.props.isAuthenticated ? (
          <Fragment>
            {this.props.cart.cart ? null : (
              <Alert color="info" className="text-center">
                Your cart is empty!
              </Alert>
            )}
          </Fragment>
        ) : (
          <Alert color="danger" className="text-center">
            Login to View!
          </Alert>
        )}

        {this.props.isAuthenticated &&
        !this.props.cart.loading &&
        this.state.loaded &&
        this.props.cart.cart ? (
          <Container>
            <div className="row">
              {this.props.cart.cart.items.map((item) => (
                <div className="col-md-4">
                  <Card>
                    <CardBody className="cardBody">
                      <CardTitle className="cardSpace" tag="h5">
                        {item.name}
                      </CardTitle>
                      <CardSubtitle className="cardSpace" tag="h6">
                        $ {item.price}
                      </CardSubtitle>
                      <div style={qtyBox}>
                        <p
                          style={{
                            ...qtyBtn,
                            border: "1px solid red",
                            color: "Red",
                            marginRight: "1rem",
                            marginLeft: "5px",
                          }}
                          onClick={() =>
                            this.onUpdateQuantity(
                              user._id,
                              item.productId,
                              item.quantity - 1
                            )
                          }
                        >
                          -1
                        </p>
                        <CardText>Quantity : {item.quantity}</CardText>
                        <p
                          style={{
                            ...qtyBtn,
                            border: "1px solid green",
                            color: "green",
                            marginRight: "5px",
                            marginLeft: "1rem",
                          }}
                          onClick={() =>
                            this.onUpdateQuantity(
                              user._id,
                              item.productId,
                              item.quantity + 1
                            )
                          }
                        >
                          +1
                        </p>
                      </div>
                      <Button
                        color="danger"
                        onClick={this.onDeleteFromCart.bind(
                          this,
                          user._id,
                          item.productId
                        )}
                      >
                        Delete
                      </Button>
                    </CardBody>
                  </Card>
                  <br />
                </div>
              ))}
              <div class="col-md-12">
                <Card>
                  <CardBody className="cardBody">
                    <CardTitle tag="h5">
                      Total Cost = $ {this.props.cart.cart.bill}
                    </CardTitle>
                    <div onClick={this.handleClick}>
                      <Checkout
                        user={user._id}
                        amount={this.props.cart.cart.bill}
                        checkout={this.props.checkout}
                      />
                      {/* <button onClick={this.props.checkout}>direct buy</button> */}

                      {/* <button onClick={this.handlePayment}>Pay Now</button>
                      {this.state.showPaymentPopup && <PaymentPopup />} */}

                      {/* <button onClick={this.handlePayNowClick}>Pay Now</button>
                      {this.state.showPaymentPopup && (
                        <PaymentPopup
                          onClose={() =>
                            this.setState({ showPaymentPopup: false })
                          }
                          onSubmit={this.handlePaymentSubmit}
                        />
                      )} */}
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="centered-button">
                <button className="button" onClick={this.handleClick}>
                  {" "}
                  Goto Order List
                </button>
              </div>
              {/* <div class="centered-button">
                <button class="button" onClick={this.handleClick}>
                  {" "}
                  Goto Order
                </button>
              </div> */}
            </div>
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const qtyBox = {
  display: "flex",
  justifyContent: "space-evenly",
  border: "1px solid #aaa",
  borderRadius: "5px",
  paddingTop: "5px",
  paddingBottom: "5px",
  marginBottom: "1rem",
};
const qtyBtn = {
  paddingLeft: "5px",
  paddingRight: "5px",
  borderRadius: "5px",
  marginBottom: "0px",
};

export default connect(mapStateToProps, {
  getCart,
  updateCart,
  deleteFromCart,
  checkout,
})(withRouter(Cart));
