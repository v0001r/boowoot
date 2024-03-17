import React, { Component } from "react";
import { TrainerType } from "../../actions";
import { connect } from "react-redux";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../Custom/ToastConfig";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CustomSpinner from "../Custom/spinner";

const FA = require("react-fontawesome");

class Typeoftrainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      gender: "",
      formData: "",
      email: "",
      c_address: "",
      servicingArea: "",
      district: "",
      state: "",
      pin: "",
      password: "",
    };
  }

  // selectType(e) {
  //   let array = this.state.type,
  //     newItem = e.target.value;
  //   array.indexOf(newItem) === -1 ? array.push(newItem) : array.pop(newItem);
  //   this.setState({
  //     type: array
  //   });
  // }

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getPincode = pin => {
    let self = this;
    this.setState({
      pin: pin.target.value
    });
    if (pin.target.value.length === 6) {
      self.setState({
        loading: true,
        pinError: false
      });
      fetch("https://api.postalpincode.in/pincode/" + pin.target.value)
        .then(function(response) {
          return response ? response.json() : {};
        })
        .then(function(data) {
          if (data[0].PostOffice) {
            let area = [];
            Object.keys(data[0].PostOffice).map(k => {
              area.push(data[0].PostOffice[k].Name);
              self.setState({
                servicingArea: area,
                state: data[0].PostOffice[k].State.toString(),
                district: data[0].PostOffice[k].District.toString()
              });
            });
            self.setState({
              loading: false
            });
          } else {
            self.setState({
              loading: false,
              pinError: true
            });
            toast("Please enter valid pin", toastConfig);
          }
        });
    }
  };
  handleClick = e => {
    
 let add = this.state;
 let self = this;

 return new Promise(function(resolve, reject) {
  fetch('http://fitfinitytrainer.com/api/v1/trainers/', {
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
   if(responseData.success){
        self.props.onSubmit();

    this.props.history.push({
      pathname: "/trainersuccess",
    });
   }else{
    toast(responseData.message, toastConfig);
   }

  }).catch(err => {
      toast(err.message, toastConfig);
      reject(err);
    }); // parses response to JSON
});
  };

  render() {
    console.log(this.state.type);
    const { formData, submitted } = this.state;

    return (
      <div className="col-sm-12">
      <ValidatorForm onSubmit={this.handleClick}>

        <h4>You are good at ? </h4>
        <div className="form-group">
            <div className="row col-sm-12">
              <div className="book_session_radio">
                <input
                  id="radio-1"
                  type="radio"
                  name="type"
                  value="Fitness Trainer"
                  checked={this.state.type === "Fitness Trainer"}
                  onChange={this.handleInputChange}
                />
                <label for="radio-1" className="book_radio">
                  Fitness Trainer
                </label>
              </div>
              <div className="book_session_radio">
                <input
                  id="radio-2"
                  type="radio"
                  name="type"
                  value="Yoga Trainer"
                  checked={this.state.type === "Yoga Trainer"}
                  onChange={this.handleInputChange}
                />
                <label for="radio-2" className="book_radio">
                Yoga Trainer
                </label>
              </div>
            </div>
          </div>
        <div className="form-group ">
            <div className="inputfield">
              <TextValidator
                label="Name *"
                validators={["required"]}
                errorMessages={"Please input your name !"}
                type="text"
                placeholder="Name"
                className="form-control"
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
            </div>
          </div>
        <div className="form-group">
            <div className="row col-sm-6">
              <div className="book_session_radio">
                <input
                  id="radio-3"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={this.state.gender === "Male"}
                  onChange={this.handleInputChange}
                />
                <label for="radio-3" className="book_radio">
                  Male
                </label>
              </div>
              <div className="book_session_radio">
                <input
                  id="radio-4"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={this.state.gender === "Female"}
                  onChange={this.handleInputChange}
                />
                <label for="radio-4" className="book_radio">
                  Female
                </label>
              </div>
            </div>
          </div>
        <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Phone Number *"
                placeholder="Phone Number"
                className="form-control"
                name="phone"
                max="10"
                onChange={this.handleInputChange}
                value={this.state.phone}
                type="number"
                pattern="/^-?\d+\.?\d*$/"
                errorMessages={"Please enter valid contact number  !"}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="inputfield">
              <TextValidator
                label="Email *"
                validators={["required", "isEmail"]}
                type="email"
                placeholder="Email"
                className="form-control"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email || this.props.trainer.email}
                errorMessages={"This field is mandatory !"}
              />
            </div>
          </div>
          <div className="input">
                    <div className="form-group">
                <div className="inputfield">

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
                <div className="form-group">
                <div className="inputfield">

                  <TextValidator
                    placeholder="Enter your current Address"
                    className="form-control"
                    name="c_address"
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.c_address}
                    label="Current Residence address *"
                    validators={["required"]}
                    errorMessages={"This field is mandatory!"}
                  />
                </div>
                </div>
                <div className="form-group">
                <div className="inputfield">

                  <TextValidator
                    placeholder="Enter pin code"
                    className="form-control"
                    name="pincode"
                    type="number"
                    onChange={e => this.getPincode(e)}
                    value={this.state.pin}
                    label="Pincode *"
                    validators={["required"]}
                    errorMessages={"Please enter a valid pin code!"}
                    max="999999"
                    min="111111"
                    pattern="\d*"
                  />
                </div>
                </div>

                {this.state.servicingArea ? (
                  <span style={{ color: "rgba(51, 51, 51, 0.5) !important" }}>
                    Serving Area
                    <div className="form-group">
                      <TextValidator
                        disabled
                        style={{ color: "black !important" }}
                        className="form-control"
                        value={this.state.servicingArea.toString()}
                      />
                    </div>
                  </span>
                ) : null}
                {this.state.district ? (
                  <span style={{ color: "rgba(51, 51, 51, 0.5) !important" }}>
                    City
                    <div className="form-group">
                      <TextValidator
                        disabled
                        style={{ color: "black !important" }}
                        className="form-control"
                        value={this.state.district}
                      />
                    </div>
                  </span>
                ) : null}
                {this.state.state ? (
                  <span style={{ color: "rgba(51, 51, 51, 0.5) !important" }}>
                    State
                    <div className="form-group">
                      <TextValidator
                        disabled
                        style={{ color: "black !important" }}
                        className="form-control"
                        value={this.state.state}
                      />
                    </div>
                  </span>
                ) : null}
        <button type="submit" className="buttonsubmit">
                Submit
              </button>
                </ValidatorForm>

        <ToastContainer transition={Flip} />
      </div>
    );
  }
}

const mapStateToProps = State => {
  return { trainer: State.trainerInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    storeTrainerType: data => {
      dispatch(TrainerType(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Typeoftrainer);
