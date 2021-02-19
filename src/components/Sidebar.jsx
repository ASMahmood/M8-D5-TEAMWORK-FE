import React from "react";
import { Button } from "@material-ui/core";
import { Image } from "react-bootstrap";
import SidebarData from "./SidebarData";
import logo from "../logo/Spotify_Logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  populateProfile: () =>
    dispatch(async (dispatch, getState) => {
      let response = await fetch(
        "http://localhost:3003/users/homepage/login/help/me",
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        let profile = await response.json();
        dispatch({
          type: "POPULATE_USER",
          payload: profile,
        });
      }
    }),
});

class Sidebar extends React.Component {
  componentDidMount = () => {
    this.props.populateProfile();
  };

  handleLogout = (e) => {
    e.preventDefault();
    document.cookie = "";
    this.props.history.push("/signup");
  };

  render() {
    return (
      <>
        <div className="sidebar">
          <div id="sidebar-logo-wrapper">
            <Image src={logo} id="sidebar-logo" />
          </div>
          <ul className="sidebar-list ml-5">
            {SidebarData.map((prop, key) => {
              return (
                <li
                  key={key}
                  id={
                    this.props.location.pathname === prop.link ? "active" : ""
                  }
                  onClick={() => {
                    this.props.history.push(prop.link);
                  }}
                  className="sidebar-item"
                >
                  <div id="sidebar-icon">{prop.icon}</div>{" "}
                  <div className="sidebar-item-name">{prop.title}</div>
                </li>
              );
            })}
          </ul>
          {this.props.user.username === "" ? (
            <div id="sidebar-buttons">
              <div className="d-flex justify-content-center mb-3">
                <Button
                  onClick={() => {
                    window.location.pathname = "/signup";
                  }}
                  variant="light"
                  id="signup"
                >
                  Sign Up
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <Button variant="light" id="login">
                  Login
                </Button>
              </div>
            </div>
          ) : (
            <div id="sidebar-buttons">
              <div className="d-flex justify-content-center mb-3">
                <img src={this.props.user.imgUrl} alt="pfp" width="40px" />
                <span className="ml-2" style={{ pointerEvents: "none" }}>
                  Hello, {this.props.user.username}
                </span>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  variant="light"
                  id="login"
                  onClick={(e) => this.handleLogout(e)}
                >
                  SIGN OUT
                </Button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
