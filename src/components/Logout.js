import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import Container from "@material-ui/core/Container";

class Logout extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    return (
      <Container maxWidth="md">
        <button style={{ marginTop: "40px" }} onClick={this.handleLogout}>
          Logout
        </button>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}

export default connect(mapStateToProps)(Logout);
