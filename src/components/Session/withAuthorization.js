import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import { firebase } from "../firebase";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {

      const token = localStorage.getItem('token');

     
        if (!token) {
          this.props.history.push("/login");
        }
    }

    render() {
      return this.props.authUser ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
  });

  return compose(
    withRouter,
    connect(mapStateToProps)
  )(WithAuthorization);
};

export default withAuthorization;
