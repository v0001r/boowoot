import React, { Component, PropTypes } from "react";
import {
  fitnessplan,
  FinalPlan,
  RegisterService,
  TotalAmount,
  ServiceforForm,
  Description,
  PaymentTransactionDietPlans
} from "../../../actions/index";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import FitnessDietProd from "./FitnessDietProd";
import FitnessForm from "./FitnessForm";
import { Card, Modal, Button, NavItem, Accordion } from "react-bootstrap";
import Payment from "../Payment";
import { firebase } from "../../firebase";
import "../../../css/fitnesstraining.css";
import Header from "../../Header";
import { ToastContainer, toast, Flip } from "react-toastify";
import { toastConfig } from "../../Custom/ToastConfig";
import PackageDetails from "./PackageDetails";
import CustomSpinner from "../../Custom/spinner";
import Acknowledgement from "./Acknowledgement";
import TransactionFailure from "./TransactionFailure";
class FitnessDietPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packagedetails: false,
      loading: false,
      transactionid: props.User.TransactionID,
      closepayment: false
    };
  }

  showPackageDetails() {
    this.setState({
      packagedetails: true
    });
  }

  closepackagedetails() {
    this.setState({
      packagedetails: false
    });
  }

  closeModalDietForm() {
    this.props.closeservice("");
    this.showpayment();
  }

  showpayment() {
    this.setState({
      showpayment: true
    });
  }

  closeacknowledgementform() {
    this.setState({
      acknowledgementform: false,
      showpayment: false
    });
    this.props.FITNESSPLAN("");
    this.props.paymentTransactionId("");
  }

  closePaymentModal() {
    this.setState({
      closepayment: true,
      showpayment: false
    });
  }

  closeFailureTransaction() {
    this.setState({
      closepayment: false
    });
  }

 

  transactionstart() {
    this.setState({
      loading: true
    });
    let fitness = {};
    let self = this;

    fitness = Object.assign(this.props.User);


    return new Promise(function(resolve, reject) {
      fetch('http://fitfinitytrainer.com/api/v1/fitness-plans', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          
          "Content-Type": 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Accept-Encoding": "gzip"
        },
        body: JSON.stringify(fitness) // body data type must match "Content-Type" header
      }).then((response) => { 
        console.log(response)
        if(response.ok){
         self.success();
        }
      })
      .catch(err => {
          toast(err.message, toastConfig);
          reject(err);
        }); // parses response to JSON
    });
  }
  success(){
    this.setState({
      loading: false,
      acknowledgementform: true
    });
  }
  render() {
    console.log("the payment ", this.state.closepayment);
    return (
      <div>
        <div className="gym-background background-watermark">
          {this.props.userRenderPage === "ChooseDietPlan" ? null : <Header />}
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
              <div className="col-xs-4 col-sm-4 col-md-7 col-lg-6 container-row diet_2_card_mq">
                {FitnessDietProd.map((person, index) => (
                  <div
                    className="enroll-now-container"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px 0 0 0"
                    }}
                    onClick={() => {
                      if (localStorage.getItem('token')) {
                        this.props.getamount(person.Price);
                        this.props.getplan(person.content);
                        this.props.typeofserivicing("DIET");
                        this.props.getdescription(person.description);
                        this.showPackageDetails();
                        // this.showpayment(true);
                      } else {
                        this.props.history.push("/login");
                        this.props.getamount(person.Price);
                        this.props.getplan(person.content);
                        this.props.typeofserivicing("DIET");
                      }
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
                        src={require("./../../../assests/" + person.image)}
                        style={{ width: "20%" }}
                        className="diet_2_img_mq"
                      />
                      <strong style={{ color: "rgb(70,77,99)" }}>
                        {person.content}
                      </strong>
                    </div>
                    <div className="priceandbuttonfitnesstraining">
                      <strong style={{ color: "rgb(34,41,91)" }}>
                        Rs.{person.Price}
                      </strong>
                      <span
                        className="rightarrowsize"
                        onClick={() => {
                          if (localStorage.getItem('token')) {
                            this.props.getamount(person.Price);
                            this.props.getplan(person.content);
                            this.props.getdescription(person.description);
                            this.props.typeofserivicing("DIET");
                            this.showPackageDetails();
                          } else {
                            this.props.history.push("/login");
                            this.props.getamount(person.Price);
                            this.props.getplan(person.content);
                            this.props.typeofserivicing("DIET");
                          }
                        }}
                      >
                        <i className="fa fa-arrow-right arrowSize"></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <Modal
          backdrop={"static"}
          keyboard={false}
          show={this.state.packagedetails}
          onHide={() => this.closepackagedetails()}
        >
          <Modal.Header closeButton bsPrefix className="PackageDetails_Header">
            <h5>Diet Plan</h5>
          </Modal.Header>
          <PackageDetails closepackage={() => this.closepackagedetails()} />
        </Modal>
        <Modal
          backdrop={"static"}
          keyboard={false}
          show={this.props.formType === "DIET" && this.props.User.showmodal}
          scrollable={true}
          onHide={() => this.closeModalDietForm()}
        >
          <Modal.Header  className="marginHeaderDiet">
            <h4>
              <br />
              <strong>Help us know your body better</strong>
            </h4>
            <h4 style={
              {paddingLeft: "40px",
              cursor: "pointer"}
            } onClick={() => this.closePaymentModal()}><br /><span aria-hidden="true">×</span></h4>
            
          </Modal.Header>
          <FitnessForm close={() => this.closeModalDietForm()} />
        </Modal>
        {this.state.showpayment ? (
          <Payment
            refToParent={() => this.showpayment()}
            transactionoccurs={() => this.transactionstart()}
            refToParent={() => this.closePaymentModal()}
          />
        ) : null}
        {this.state.loading ? (
          <CustomSpinner
            spinnerVal={true}
            val="Creating Your Profile ! It may take a while "
          />
        ) : null}

        <Modal
          backdrop={"static"}
          keyboard={false}
          show={this.state.acknowledgementform}
          onHide={() => this.closeacknowledgementform()}
          className="enroll-now-container-diet"
          style={{
            background: "rgba(0,0,0,.03",
            padding: "40px 20px"
          }}
        >
          <Modal.Header closeButton className="Acknowledgement_Header">
            <h3>Acknowledgement</h3>
          </Modal.Header>
          <Acknowledgement
            closeParentAck={() => this.closeacknowledgementform()}
          />
        </Modal>

        <Modal
          backdrop={"static"}
          keyboard={false}
          show={this.state.closepayment}
          onHide={() => this.closeFailureTransaction()}
          className="enroll-now-container-diet"
          style={{
            background: "rgba(0,0,0,.03",
            padding: "40px 20px"
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <TransactionFailure
            hideFailure={() => this.closeFailureTransaction()}
          />
        </Modal>
        <ToastContainer transition={Flip} />

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
    FITNESSPLAN: fitnessplans => {
      dispatch(fitnessplan(fitnessplans));
    },
    paymentTransactionId: paymentid => {
      dispatch(PaymentTransactionDietPlans(paymentid));
    },
    getplan: plan => {
      dispatch(FinalPlan(plan));
    },
    closeservice: plan => {
      dispatch(ServiceforForm(plan));
    },

    getamount: amount => {
      dispatch(TotalAmount(amount));
    },
    typeofserivicing: services => {
      dispatch(ServiceforForm(services));
    },
    getdescription: description => {
      dispatch(Description(description));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FitnessDietPlan)
);
