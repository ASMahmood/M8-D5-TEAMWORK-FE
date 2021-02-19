import React, { Component } from "react";
import { Container, Image, Button } from "react-bootstrap";
import logo from "../logo/Spotify_Logo_Black.png";
import fb from "../logo/fb.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
//import useForm from "./UseForm"; // IMPORTING THE COMPONENT WITH HOOKS

class SignUp extends Component {
  //const { handleChange, values, handleSubmit } = useForm(); // DESTRUCTURING HOOKS TO BE ABLE TO USE THEM IN THIS COMPONENT
  state = {
    email: "",
    password:""
  }
async postData() {
    try {

      let user = await fetch("http://localhost:3003/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });
      let response = await user.json();
      console.log(response);
      if (user.ok) {
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container fluid id="signup-page-wrapper">
        <div className="sign-logo-wrapper">
          <Image src={logo} id="signup-page-logo" />
        </div>
        <div className="signup-items">
          <a href="http://localhost:3003/users/3rdparty/facebook">
            <Button className="signup-btn fb my-2 w-100">
              <Image src={fb} id="fb" />
              CONTINUE WITH FACEBOOK
            </Button>
          </a>
          <a href="http://localhost:3003/users/3rdparty/spotify">
            <Button className="signup-btn apple my-2 w-100">
              CONTINUE WITH SPOTIFY ...wait
            </Button>
          </a>
          <a href="https://www.youtube.com/watch?v=2ocykBzWDiM">
            <Button className="signup-btn google my-2 w-100">
              CONTINUE WITH GOOGLE
            </Button>
          </a>
        </div>
        <h6>OR</h6>
        <div className="form-inputs">
          <form
            className="form"
            // onSubmit={handleSubmit}
          >
            <label>Email addess or username</label>
            <input
              className="form-input"
              id="email" // WITH THIS ID IT CHECKS IF IT'S A VALID EMAIL
              name="email"
              type="email"
              placeholder="Email adress or username"
              // value={values.email} // TAKES THE VALUE FROM MY CUSTOM HOOKS IN USEFORM COMPONENT
              onChange={(e) => this.setState({email : e.target.value})} // THE FUNCTION THAT LISTENS TO THE CHANGE OF THE VALUE
            />
            <br />
            <label>Password</label>
            <input
              className="form-input"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              // value={values.password}
              onChange={(e) => this.setState({password : e.target.value})}
            />
            <br />
            <a href="#"> Forgot your password? </a>
            <div className="submit-btn">
              <input type="checkbox" id="checkbox" className="my-auto" />
              <p className="ml-n5 my-auto">Remember me</p>
              <button
                className="form-input-submit"

                onClick={(e) => {
                  e.preventDefault();
                  this.postData();
                }}

              >
                LOG IN
              </button>
            </div>
          </form>
          <hr />
          <h4 className="text-center mb-3">Don't have an account?</h4>
          <button id="bottom-btn">SIGN UP FOR SPOTIFY</button>
        </div>
      </Container>
    );
  }
}

export default withRouter(SignUp);
