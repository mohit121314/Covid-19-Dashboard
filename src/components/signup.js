import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { myFirebase } from "../firebase/firebase";
import firebase from "firebase";
import "../signup.css";

class Login extends Component {
  state = { email: "", password: "", name: "", password1: "", checked: true };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    myFirebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        firebase.firestore().collection("user").doc(user.user.uid).set({
          email: this.state.email,
          name: this.state.name,
          uid: user.user.uid,
          image:
            "https://image.shutterstock.com/image-vector/people-vector-icon-260nw-378571234.jpg",
        });
      });
  };

  handlecheck = () => {
    if (this.state.password === "") alert("Please Fill your Details");
    else if (this.state.password1 === "") alert("Please enter Repeat password");
    else if (this.state.password !== this.state.password1) {
      alert("\nPassword did not match: Please try again...");
      return false;
    } else if (this.state.checked === false) {
      alert("Please Accept the Terms and Condition");
    } else {
      this.handleSubmit();
    }
  };
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div className="signupContainer">
          <div className="signupWrapper">
            <div className="signupForm">
              <h1>Sign up</h1>
              <div className="formGroup">
                <label>Name</label>
                <input
                  type="text"
                  pattern="^[a-zA-Z]+(\s[a-zA-Z]+)?$"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="formGroup">
                <label>Email</label>
                <input type="email" onChange={this.handleEmailChange} />
              </div>
              <div className="formGroup">
                <label>Password</label>
                <input type="password" onChange={this.handlePasswordChange} />
              </div>
              <div className="formGroup">
                <label>Confirm password</label>
                <input
                  type="password"
                  onChange={(e) => this.setState({ password1: e.target.value })}
                />
              </div>
              <div className="formGroup">
                <input
                  type="checkbox"
                  disabled
                  checked={this.state.checked}
                  onChange={(e) => this.setState({ checked: e.target.checked })}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />{" "}
                <label className="checkboxLabel">
                  I agree all statements in Terms of service
                </label>
              </div>
              <div className="formGroup">
                <input
                  type="button"
                  value="Sign Up"
                  onClick={() => this.handlecheck()}
                />
              </div>
              <div className="alreadyUser">
                <a href="/">
                  <span>Already a user sign in.. </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
