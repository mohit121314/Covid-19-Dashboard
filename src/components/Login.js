import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import firebase from "../firebase/firebase";
import "../App.css";

class Login extends Component {
  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };
  handleGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        console.log(user);
        if (user.additionalUserInfo.isNewUser) {
          firebase.firestore().collection("user").doc(user.user.uid).set({
            email: user.user.email,
            name: user.user.displayName,
            uid: user.user.uid,
            image: user.user.photoURL,
          });
        }
      });
  };

  render() {
    const { loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div className="loginContainer">
          <div className="loginWrapper">
            <div className="loginForm">
              <h1>Login</h1>
              <div className="formGroup">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={this.handleEmailChange}
                  placeholder="Enter Email"
                />
              </div>
              <div className="formGroup">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={this.handlePasswordChange}
                />
              </div>
              {loginError && <p>Incorrect email or password.</p>}
              <div className="formGroup">
                <input
                  type="button"
                  value="login"
                  onClick={this.handleSubmit}
                />
              </div>
              <div className="googleLogin">
                <span>or login with</span>
                <i
                  className="fa fa-google google-icon"
                  aria-hidden="true"
                  onClick={() => this.handleGoogle()}
                ></i>
              </div>
              <div class="createAccount">
                <a href="/signup">Create an Account</a>
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
