import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createRegisterUser,
  storeUserLoginInfo,
  createLoggedUser,
  userLoginDetails
} from "./../../actions/index";
import { firebase } from "./../firebase";
import { Row, Col } from "reactstrap";
import "../../css/LoginModal.css";
import "../../css/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ToastContainer, toast, Flip } from "react-toastify";
import { toastConfig } from "../Custom/ToastConfig";
import Payment from "../Landing/Payment";
import CustomSpinner from "../Custom/spinner";
import { functions_for_users } from "../../function_constant";

class Signin extends Component {
  constructor(props, { match }) {
    super(props, { match });
    this.state = {
      isUser: false,
      isTrainer: false,
      isAdmin: false,
      email: "",
      password: "",
      res: "",
      emailError: "",
      passwordError: "",
      loading: false,
      uid: "",
      isSignUpCompleted: false
    };
    this.login = this.login.bind(this);
  }

  handleInputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillMount() {
    const user = localStorage.getItem('token');
    const user_type = localStorage.getItem('user_type');

    if(user && user_type == "A"){
      this.props.history.push({
        pathname: "/admin/adminDashboard",
        params: { username: "Admin" }
      });
    }else if(user &&  user_type == "U"){
      this.props.history.push({
        pathname: "user/userDashboard",
      });
    }
   
  }

  async login(event) {
    this.setState({
      loading: true
    });
    let self = this;
    // alert(self.state.email);

    let data = {
      "username": self.state.email,
    "password": self.state.password
    }
    return new Promise(function(resolve, reject) {
      fetch('http://localhost:5011/v1/auth/login', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          
          "Content-Type": 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then((response) => response.json())
      .then((responseData) => {
        let user = responseData;        
        self.postDatatrail(user);
      }).catch(err => {
          toast(err.message, toastConfig);
          reject(err);
        }); // parses response to JSON
    });
    

}

postDatatrail(user) {
  this.setState({
    loading: true
  });
  // let userdetails = response.json();
  localStorage.setItem("token", user.token);
  localStorage.setItem("user_id", user.userId);
  localStorage.setItem("user_type", user.user_type);
  localStorage.setItem("name", user.name);
  localStorage.setItem("mobile", user.mobile);
  localStorage.setItem("email", user.email);

  this.props.UserDetail(user);

                if(user.user_type == "A"){
                  this.props.history.push({
                    pathname: "/admin/adminDashboard",
                    params: { username: "Admin" }
                  });
                }else if(user.user_type == "U"){
                  console.log(this.props.service)
                  if(this.props.service == "YOGA" || this.props.service == "FITNESS"){
                    this.props.history.push({
                      pathname: "/bookSession",
                      params: { username: user.name}
                    });
                  }else{

                    this.props.history.goBack();
                  }

                }else {
                  this.props.history.goBack();
                  this.setState({
                    loading: false
                  });
                }
return user;
}

  postData(url = ``, data) {
    return new Promise(function(resolve, reject) {
      fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        mode: 'no-cors',
        headers: {
          
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => resolve(response.json()))
        .catch(err => {
          toast(err.message, toastConfig);
          reject(err);
        }); // parses response to JSON
    });
  }
  reset_password = () => {
    this.setState({
      reset: true,
      password: ""
    });
  };
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <div className="modalcontainer ">
              <ValidatorForm onSubmit={() => this.login()}>
                <div>
                  <div className="form-group">
                    <TextValidator
                      label="Email *"
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      value={this.state.email}
                      validators={["required", "isEmail"]}
                      errorMessages={["Valid Email is required"]}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <TextValidator
                      label="Password *"
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      name="password"
                      validators={["required"]}
                      errorMessages={["Password is required"]}
                      value={this.state.password}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                </div>

                <center className="bottom">
                  <button type="submit" className="login_signup_button ">
                    Login
                  </button>
                  {/* {this.state.reset === true ?
                   <button type="submit" className="login_signup_button ">
                    "Send Rest Password Link"
                 </button> : null} */}
                </center>
              </ValidatorForm>
            </div>
          </Col>
        </Row>

        <ToastContainer transition={Flip} />
        {this.state.loading ? <CustomSpinner spinnerVal={true} /> : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { User: state.userDetail, service: state.serviceState.services };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPost: reguser => {
      dispatch(createRegisterUser(reguser));
    },
    getUserLoginState: User => {
      dispatch(storeUserLoginInfo(User));
    },
    createdUser: username => {
      dispatch(createLoggedUser(username));
    },
    UserDetail: userlogindetails => {
      dispatch(userLoginDetails(userlogindetails));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
