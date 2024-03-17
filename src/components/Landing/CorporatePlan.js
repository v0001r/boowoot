import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "../../css/corporateplan.css";
import { connect } from "react-redux";
import { firebase } from "./../firebase";
import { withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";

class Corporateplan extends React.Component {
  state = {
    name: "",
    company: "",
    requirement: "",
    email: "",
    phone: ""
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    if (
      this.state.name.trim() &&
      this.state.company.trim() &&
      this.state.requirement.trim() &&
      this.state.phone.trim() &&
      this.state.email.trim()
    ) {

      let add = this.state;
      let self = this;
      return new Promise(function(resolve, reject) {
        fetch('http://localhost:5011/v1/corporate-enquiry', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Accept-Encoding": "gzip"
          },
          body: JSON.stringify(add) // body data type must match "Content-Type" header
        }).then((response) => { 
          console.log(response)
          if(response.ok){
            toast(
              "Your Information in received we will contact you soon!!",
              toastConfig
            );
            self.handleReset();

          }
        })
        .catch(err => {
            toast(err.message, toastConfig);
            reject(err);
          }); // parses response to JSON
      });
      
    }
  };

  handleReset = () => {
    this.setState({
      name: "",
      company: "",
      requirement: "",
      email: "",
      phone: ""
    });
  };

  render() {
    return (
      <div className="corporate_background">
        <h2 className="corporateplanheader">
          <strong className="">Corporate Plan</strong>
        </h2>

        <div className="corporate-container">
          <ValidatorForm onSubmit={() => this.handleClick()}>
            <div className="inputfieldsize">
              <TextValidator
                label="Name *"
                type="text"
                placeholder="Enter Your Name"
                className="form-control"
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
                validators={["required"]}
                errorMessages={["Name is required"]}
              />
            </div>
            <div className="inputfieldsize">
              <TextValidator
                label="Company Name *"
                type="text"
                placeholder="Enter Company Name"
                className="form-control"
                name="company"
                onChange={this.handleInputChange}
                value={this.state.company}
                validators={["required"]}
                errorMessages={["Company name is mandatory"]}
              />
            </div>

            <div className="inputfieldsize">
              <TextValidator
                type="email"
                label="Email *"
                placeholder="Enter email"
                className="form-control"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
                validators={["required", "isEmail"]}
                errorMessages={["Kindly enter valid email-id"]}
              />
            </div>
            <div className="inputfieldsize">
              <TextValidator
                type="text"
                label="Phone *"
                placeholder="Enter Phone No."
                className="form-control"
                name="phone"
                onChange={this.handleInputChange}
                value={this.state.phone}
                validators={["required"]}
                errorMessages={["Kindly enter Phone No."]}
              />
            </div>
            <div className="inputfieldsize">
              <TextValidator
                label="Requirement"
                type="text"
                placeholder="Enter Requirement *"
                className="form-control"
                name="requirement"
                onChange={this.handleInputChange}
                value={this.state.requirement}
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
            </div>
            <div
              className="form-group enroll_main"
              style={{ alignItems: "center" }}
            >
              <button type="submit" className="buttonsubmit">
                Submit
              </button>
            </div>
            <div className="message_container col-sm-6">
              send us your special requirements we will get back to you ASAP.
            </div>
          </ValidatorForm>
        </div>
        <div className="corporate_image" />
        <ToastContainer transition={Flip} style={{ top: "0%" }} />
      </div>
    );
  }
}

export default withRouter(connect()(Corporateplan));
