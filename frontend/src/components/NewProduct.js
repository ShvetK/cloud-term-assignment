import React, { Component } from "react";
import "../css/NewProduct.css";
import { withRouter } from "react-router-dom";
import { axiosInstance } from "../actions/axiosI";

class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      category: "",
      price: "",
      image: null,
      errors: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleImageChange(event) {
    this.setState({
      image: event.target.files[0],
    });
  }

  handleClick = () => {
    this.props.history.push("/home");
  };

  handleSubmit(event) {
    event.preventDefault();

    const { title, description, category, price, image } = this.state;

    // Validation
    const errors = {};
    if (!title.trim()) {
      errors.title = "Title is required";
    }
    if (!description.trim()) {
      errors.description = "Description is required";
    }
    if (!category.trim()) {
      errors.category = "Category is required";
    }
    if (!price.trim()) {
      errors.price = "Price is required";
    } else if (!/^\d+$/.test(price.trim())) {
      errors.price = "Price must be an integer";
    }
    this.setState({ errors });

    // If there are errors, stop form submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Send data to server
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("category", category.trim());
    formData.append("price", price.trim());
    formData.append("image", image);
    console.log(formData);

    const addProduct = async () => {
      try {
        axiosInstance({
          method: "post",
          url: "/api/items",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            console.log(response);
            this.setState({
              title: "",
              description: "",
              category: "",
              price: "",
              image: null,
              errors: {},
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    addProduct();
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="innerDiv">
          <form
            onSubmit={this.handleSubmit}
            className="formN"
            encType="multipart/form-data"
          >
            <div className="conI">
              <h1 className="h1N"> New Product</h1>
              <label className="lableN" htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={this.state.title}
                required
                onChange={this.handleInputChange}
                className="textFieldN"
              />
              {errors.title && <div className="error">{errors.title}</div>}
            </div>
            <div className="conI">
              <label className="lableN" htmlFor="description">
                Description:
              </label>
              <input
                id="description"
                name="description"
                value={this.state.description}
                required
                className="textFieldN"
                onChange={this.handleInputChange}
              />
              {errors.description && (
                <div className="error">{errors.description}</div>
              )}
            </div>
            <div className="conI">
              <label htmlFor="category" className="lableN">
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={this.state.category}
                required
                className="textFieldN"
                onChange={this.handleInputChange}
              />
              {errors.category && (
                <div className="error">{errors.category}</div>
              )}
            </div>
            <div className="conI">
              <label htmlFor="price" className="lableN">
                Price:
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={this.state.price}
                onChange={this.handleInputChange}
                required
                className="textFieldN"
                pattern="[0-9]+"
              />
              {errors.price && <div className="error">{errors.price}</div>}
            </div>
            <div className="conI">
              <label htmlFor="image" className="lableN">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image1"
                required
                onChange={this.handleImageChange}
                className="textFieldNI"
                accept=".jpeg, .png, .jpg"
              />
            </div>
            <button type="submit" className="buttonN">
              Submit
            </button>
          </form>
        </div>
        <div className="centered-button">
          <button className="buttonN" onClick={this.handleClick}>
            {" "}
            Goto Home
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(NewProduct);
