import React from "react";
import { connect } from "react-redux";

import { firebase } from "../firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const token = localStorage.getItem('token');

    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({ type: "AUTH_USER_SET", authUser })
  });

  return connect(
    null,
    mapDispatchToProps
  )(WithAuthentication);
};

export default withAuthentication;
