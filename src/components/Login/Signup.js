import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { createRegisterUser } from "../../actions";
import "../../css/LoginModal.css";
import { Row, Col } from "reactstrap";
import { firebase } from "../firebase/index";
import { ToastContainer, toast, Flip } from "react-toastify";
import { toastConfig } from "../Custom/ToastConfig";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import { functions_for_users } from "../../function_constant";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      email: "",
      password: ""
    };
    // this.postDatatrail = this.postDatatrail.bind(this);
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    let add,
      self = this;
    if (
      this.state.name.trim() &&
      this.state.mobile.trim() &&
      this.state.email.trim() &&
      this.state.password
    ) {
      add = this.state;
      this.props.onAddPost(add);
      this.postDatatrail();
    }
  };

  postDatatrail() {
    let add = this.state,
      self = this;
    add.user_type = "U";

    return new Promise(function(resolve, reject) {
      fetch('http://fitfinitytrainer.com/api/v1/auth/register', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          
          "Content-Type": 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify(add) // body data type must match "Content-Type" header
      }).then((response) => response.json())
      .then((responseData) => {
        let user = responseData;    
        toast("Registered Successfully", toastConfig);
    
      }).catch(err => {
          toast(err.message, toastConfig);
          reject(err);
        }); // parses response to JSON
    });
  }

  postData(url = ``, data) {
    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "POST",
        cache: "no-cache",
        // credentials: "same-origin",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify(data)
      })
        .then(response => resolve(response.json()))
        .catch(err => {
          toast(err.code, err.message, toastConfig);
          reject(err);
        });
    });
  }
  handleReset = () => {
    this.setState({
      name: "",
      gender: "",
      phoneNumber: "",
      password: "",
      email: ""
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <div className="modalcontainer">
              <ValidatorForm
                onSubmit={() => this.handleClick()}
                className="login"
              >
                <div className="input">
                  <div className="form-group">
                    <TextValidator
                      label="Name *"
                      type="text"
                      placeholder="Name *"
                      className="form-control"
                      name="name"
                      onChange={this.handleInputChange}
                      value={this.state.name}
                      validators={["required"]}
                      errorMessages={["Name is required"]}
                    />
                  </div>
                </div>
                <div className="input">
                  <div className="form-group">
                    <TextValidator
                      label="Phone Number *"
                      type="text"
                      placeholder="Phone Number"
                      className="form-control"
                      name="mobile"
                      onChange={this.handleInputChange}
                      value={this.state.mobile}
                      validators={["required"]}
                      errorMessages={[
                        "Please enter a valid phone number along with code"
                      ]}
                    />
                  </div>
                </div>
                <div className="input">
                  <div className="form-group">
                    <TextValidator
                      label="Email *"
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      name="email"
                      onChange={this.handleInputChange}
                      value={this.state.email}
                      validators={["required", "isEmail"]}
                      errorMessages={["Valid Email is required"]}
                    />
                  </div>
                  <div className="input">
                    <div className="form-group">
                      <TextValidator
                        label="Password *"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        validators={["required"]}
                        errorMessages={[
                          "Please enter a password with 6 or more characters with any 0-9 number included "
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-2"></div>
                  </div>

                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm-2"></div>
                    </div>
                    <center className="bottom">
                      <button type="submit" className="login_signup_button ">
                        Sign Up
                      </button>
                    </center>
                  </div>
                </div>
              </ValidatorForm>
            </div>
          </Col>
        </Row>
        <ToastContainer transition={Flip} />
      </div>
    );
  }
}
const mapStateToProps = State => {
  return { reguser: State.reguser };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: reguser => {
      dispatch(createRegisterUser(reguser));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
