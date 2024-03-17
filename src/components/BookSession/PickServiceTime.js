import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast, Flip } from "react-toastify";
import { createPickTrialDate, createServiceDate, createUserCategory, userBooking } from "./../../actions/index";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { ValidatorForm } from "react-material-ui-form-validator";
import { toastConfig } from "../Custom/ToastConfig";
import { TimePickJson } from "./TimePickJson";

const FA = require("react-fontawesome");
Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
};
export class PickServiceTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfservice: props.service.services ? props.service.services : null,
      service_time: props.user.service_time,
      trial_time: props.user.trial_time,
      localtimestochild: props.time,
      user_category: props.user.user_category,
      trial_date: props.user.trial_date,
      temp_date: props.user.trial_date
    };
  }
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  handleSubmit = e => {
    e.preventDefault();
    let self = this.state;
    if (this.state.service_time !== undefined) {
      this.props.onAddPost(self.service_time, this.props.service.services, self.trial_date, self.user_category, self.trial_time);
      this.props.nextStep();
    } else {
      toast("Please input all the required data !!", toastConfig);
    }
  };
  handleInputChangeTomo = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.handleTomo();
  };
  handleTomo = () => {
    var tempTmrDate = new Date(new Date().valueOf() + 1000 * 3600 * 24),
      temp = [];
    var nextdate =
      tempTmrDate.getDate() +
      "-" +
      (tempTmrDate.getMonth() + 1) +
      "-" +
      tempTmrDate.getFullYear() +
      " ";
    const tomorow = nextdate;
    var x = 60; //minutes interval
    var tomotimes = []; // time array
    var tt = 360; // start time
    var ap = ["AM", "PM"]; // AM-PM
    //loop to increment the time and push results in array
    for (var i = 0; tt < 23 * 60; i++) {
      var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      var mm = tt % 60; // getting minutes of the hour in 0-55 format
      tomotimes[i] = ("0" + hh).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
      temp[i] = tomotimes[i];
      // this.props.callParentTomo(tomotimes[i]);
    }
    this.setState({
      temp_date: temp
    });
  };
  handletoday = () => {
    var tempDate = new Date(),
      temp = [];
    var date =
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear() +
      " ";
    const today = date;
    var todaytime = tempDate.getHours();
    if (today) {
      if (todaytime <= 12) {
        todaytime = todaytime + 4;
        var x = 60; //minutes interval
        var times = []; // time array
        var tt = 0; // start time
        var ap = ["AM", "PM"]; // AM-PM

        //loop to increment the time and push results in array
        for (var i = 0; tt < 23 * 60; i++) {
          var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
          var mm = tt % 60; // getting minutes of the hour in 0-55 format
          times[i] = ("0" + hh).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
          tt = tt + x;
          if (times[i] > todaytime && times[i] < 22) {
            temp[i] = times[i];
            // this.props.callParent(times[i]);
          }
        }
        this.setState({
          temp_date: temp.filter(Boolean)
        });
      } else {
        toast("No slots are their !!", toastConfig);
      }
    }
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    let temp = this.state.startDate;
    var tempDate = new Date();
    var date =
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      "-" +
      tempDate.getFullYear() +
      " ";
    var todaytime = tempDate.getHours();

    const today = date;

    var tempTmrDate = new Date(new Date().valueOf() + 1000 * 3600 * 24);
    var nextdate =
      (tempTmrDate.getMonth() + 1) +
      "-" +
      tempTmrDate.getDate() +
      "-" +
      tempTmrDate.getFullYear() +
      " ";
    const tomorow = nextdate;

    var tempdayAter = new Date(new Date().valueOf() + 1000 * 3600 * 48);
    var nextdayater = tempdayAter.getDay();
    var weekday = new Array(7);
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[0] = "Sunday";
    var nextdayaterfirebase =
      (tempdayAter.getMonth() + 1)+
      "-" +
      tempdayAter.getDate() +
      "-" +
      tempdayAter.getFullYear() +
      " ";
    const dayafterfire = nextdayaterfirebase;
    const dayaftertmrw = weekday[nextdayater];

    var tempdayAterTmr = new Date(new Date().valueOf() + 1000 * 3600 * 72);
    var nextdayatertmr = tempdayAterTmr.getDay();
    var nextdayaterTmrfirebase =
     (tempdayAterTmr.getMonth() + 1) +
      "-" +
      tempdayAterTmr.getDate()+
      "-" +
      tempdayAterTmr.getFullYear() +
      " ";
    const dayaftertmrfire = nextdayaterTmrfirebase;
    const dayaftertmrwDay = weekday[nextdayatertmr];
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <div className="input">
            <div className="form-group">
              <strong className="book_heading">
                Generally At what time you want to be served?
              </strong>

              <select
                    className="form-control dropdown "
                    id="service_time"
                    name="service_time"
                    onChange={this.handleInputChange}
                    value={this.state.service_time}
                  >
                    <option value="" selected="selected" disabled="disabled">
                      -- select one --
                    </option>

                    <option value="6:00-7:00AM">6:00-7:00AM</option>
                    <option value="7:00-8:00AM">7:00-8:00AM</option>
                    <option value="8:00-9:00AM">8:00-9:00AM</option>
                    <option value="9:00-10:00AM">9:00-10:00AM</option>
                    <option value="10:00-11:00AM">10:00-11:00AM</option>
                    <option value="11:00-12:00AM">11:00-12:00AM</option>
                    <option value="12:00-01:00PM">12:00-01:00PM</option>
                    <option value="01:00-02:00PM">01:00-02:00PM</option>
                    <option value="02:00-03:00PM">02:00-03:00PM</option>
                    <option value="03:00-04:00PM">03:00-04:00PM</option>
                    <option value="05:00-06:00PM">05:00-06:00PM</option>
                    <option value="06:00-07:00PM">06:00-07:00PM</option>
                    <option value="07:00-08:00PM">07:00-08:00PM</option>
                    <option value="08:00-09:00PM">08:00-09:00PM</option>
                    <option value="9:00-10:00PM">9:00-10:00PM</option>
                  </select>
            </div>
          </div>
          <div>
          <div className="input">
            <div className="form-group">
              <strong className="book_heading">Training Needed for</strong>
              <div
                class="container-row book_session_radio user_category_column"
                style={{ flexWrap: "wrap" }}
              >
                <div class="radio ">
                  <input
                    id="radio-1"
                    name="user_category"
                    type="radio"
                    value="Male"
                    checked={this.state.user_category === "Male"}
                    onChange={this.handleInputChange}
                    className={
                      this.state.user_category === "Male" ? "Male" : null
                    }
                  />
                  <label for="radio-1" className="book_radio">
                    Male
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-2"
                    name="user_category"
                    type="radio"
                    value="Female"
                    checked={this.state.user_category === "Female"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-2" className="book_radio">
                    Female
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-3"
                    name="user_category"
                    type="radio"
                    value="Couple"
                    checked={this.state.user_category === "Couple"}
                    onChange={this.handleInputChange}
                  />
                  <label for="radio-3" className="book_radio">
                    Couple
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-4"
                    name="user_category"
                    type="radio"
                    value="Group"
                    checked={this.state.user_category === "Group"}
                    onChange={this.handleInputChange}
                    validators={["required"]}
                    errorMessages={["Service cannot be empty"]}
                  />
                  <label for="radio-4" className="book_radio">
                    Group
                  </label>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="input">
            <div className="form-group">
              <strong className="book_heading">Select Trial Date</strong>
              <div
                class="container-row book_session_radio user_category_column"
                style={{ flexWrap: "wrap" }}
              >
                {todaytime >= 12 ? null : (
                  <div className="radio ">
                    <input
                      id="radio-5"
                      name="trial_date"
                      type="radio"
                      value={today}
                      checked={this.state.trial_date === today}
                      onChange={this.handleInputChangeToday}
                    />
                    <label for="radio-5" className="book_radio">
                      Today
                    </label>
                  </div>
                )}
                <div className="radio">
                  <input
                    id="radio-6"
                    name="trial_date"
                    type="radio"
                    value={tomorow}
                    checked={this.state.trial_date === tomorow}
                    onChange={this.handleInputChangeTomo}
                  />
                  <label for="radio-6" className="book_radio">
                    Tomorrow
                  </label>
                </div>
                <div className="radio">
                  <input
                    id="radio-7"
                    name="trial_date"
                    type="radio"
                    value={dayafterfire}
                    checked={this.state.trial_date === dayafterfire}
                    onChange={this.handleInputChangeTomo}
                  />
                  <label for="radio-7" className="book_radio">
                    {dayaftertmrw}
                  </label>
                </div>
                {todaytime >= 12 ? (
                  <div className="radio">
                    <input
                      id="radio-8"
                      name="trial_date"
                      type="radio"
                      value={dayaftertmrfire}
                      checked={this.state.trial_date === dayaftertmrfire}
                      onChange={this.handleInputChangeTomo}
                    />
                    <label for="radio-8" className="book_radio">
                      {dayaftertmrwDay}
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="input">
            <div className="form-group">
              <strong className="book_heading">
              Generally At what time you want to take trial session?
              </strong>

              <select
                    className="form-control dropdown "
                    id="trial_time"
                    name="trial_time"
                    onChange={this.handleInputChange}
                    value={this.state.trial_time}
                  >
                    <option value="" selected="selected" disabled="disabled">
                      -- select one --
                    </option>

                    <option value="6:00-7:00AM">6:00-7:00AM</option>
                    <option value="7:00-8:00AM">7:00-8:00AM</option>
                    <option value="8:00-9:00AM">8:00-9:00AM</option>
                    <option value="9:00-10:00AM">9:00-10:00AM</option>
                    <option value="10:00-11:00AM">10:00-11:00AM</option>
                    <option value="11:00-12:00AM">11:00-12:00AM</option>
                    <option value="12:00-01:00PM">12:00-01:00PM</option>
                    <option value="01:00-02:00PM">01:00-02:00PM</option>
                    <option value="02:00-03:00PM">02:00-03:00PM</option>
                    <option value="03:00-04:00PM">03:00-04:00PM</option>
                    <option value="05:00-06:00PM">05:00-06:00PM</option>
                    <option value="06:00-07:00PM">06:00-07:00PM</option>
                    <option value="07:00-08:00PM">07:00-08:00PM</option>
                    <option value="08:00-09:00PM">08:00-09:00PM</option>
                    <option value="9:00-10:00PM">9:00-10:00PM</option>
                  </select>
            </div>
          </div>
          <FA
            name="arrow-right"
            onClick={e => this.handleSubmit(e)}
            className="iconNext"
          />
        </ValidatorForm>
        <ToastContainer transition={Flip} />
      </div>
    );
  }
}
const mapStateToProps = State => {
  return { user: State.bookSession, service: State.serviceState };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPost: (service_time, typeOfservice, trial_date, user_category, trial_time) => {
      dispatch(userBooking({ service_time, typeOfservice, trial_date, user_category, trial_time}));


    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PickServiceTime);
