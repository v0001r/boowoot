import React, { Component, PropTypes } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Card, Modal, Button, NavItem, Accordion } from "react-bootstrap";
import "../../css/fitnesstraining.css";
import {
    RegisterService,
    Description
  } from "./../../actions/index";
class SelectService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packagedetails: false,
      loading: false,


      closepayment: false
    };
  }

  fitnessService = () => {
    this.props.typeOfService("FITNESS");
    this.props.history.push("/fitnessplan");
  };
  dietService = () => {
    this.props.typeOfService("DIET");
    if (localStorage.getItem('token')) {
      this.props.getdescription();
    } else {
      this.props.getdescription("some content");
    }

    this.props.history.push("/diet");
  };

  render() {
    return (
      <div>
        <div className="gym-background background-watermark">
          <div>
            <div className="howitworks">
              <div className="enroll-now-container fitnesscontainer ">
                <ul>
                  <strong>How it works</strong>
                  <li>Pick your service</li>
                  <li>Fill the simple body assessment form</li>
                  <li>Choose the duration plan (1/3 Months plan)</li>
                  <li>Make payment and sit back </li>
                  <li>
                    Let our experts work on your training plan and send it to
                    you within 24 hours.
                  </li>
                </ul>
              </div>
            </div>

            <section style={{ marginTop: "0px" }}>
              <h2 className="shady_header">
                <strong className="iconsheading">
                  Fitness Plans to help you stay fit !{" "}
                </strong>
              </h2>
              <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-7 col-lg-6 container-row diet_2_card_mq">
                  <div
                    className="enroll-now-container"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px 0 0 0",
                      width: "50%"
                    }}
                    
                  >
                    <div
                      style={{
                        padding: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src={require("./../../assests/apple.png")}
                        style={{ width: "20%" }}
                        className="diet_2_img_mq"
                      />
                      <strong style={{ color: "rgb(70,77,99)" }}>
                      Diet Plans
                      </strong>
                    </div>
                    <div className="priceandbuttonfitnesstraining">
                    <strong style={{ color: "rgb(34,41,91)" }}>
                         Select Diet Plans
                      </strong>
                      <span
                        className="rightarrowsize"
                        onClick={() => this.dietService()}
                      >
                        <i className="fa fa-arrow-right arrowSize"></i>
                      </span>
                    </div>
                  </div>
                  <div
                    className="enroll-now-container"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px 0 0 0",
                      width: "50%"
                    }}
                  >
                    <div
                      style={{
                        padding: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src={require("./../../assests/asset1.png")}
                        style={{ width: "20%" }}
                        className="diet_2_img_mq"
                      />
                      <strong style={{ color: "rgb(70,77,99)" }}>
                      Fitness Plans

                      </strong>
                    </div>
                    <div className="priceandbuttonfitnesstraining">
                    <strong style={{ color: "rgb(34,41,91)" }}>
                    Select Fitness Plans
                      </strong>
                      <span
                        className="rightarrowsize"
                        onClick={() => this.fitnessService()}
                      >
                        <i className="fa fa-arrow-right arrowSize"></i>
                      </span>
                    </div>
                  </div>
              </div>
             
              </div>
            </section>
          </div>
        </div>
        
        
       
      
      </div>
    );
  }
}
const mapStateToProps = State => {
  return {
    userRenderPage: State.userDetail.userpage,
    formType: State.serviceState.formType,
    User: State.dietPlan
  };
};

const mapDispatchToProps = dispatch => {
  return {
    typeOfService: services => {
        dispatch(RegisterService(services));
      },
      getdescription: description => {
        dispatch(Description(description));
      },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectService));

