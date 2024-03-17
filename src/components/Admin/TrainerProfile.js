import React from "react"
import { ToastContainer, toast, Flip } from "react-toastify";
import { firebase } from "../firebase/index"
import { toastConfig } from "../Custom/ToastConfig";
import { withRouter } from "react-router-dom";

class TrainerProfile extends React.Component{

    constructor(){
        super()
        this.state = {
          result:[],
          result2:[],
          status: "",
          block: "",
          kyc: ""
        }
      }

    componentDidMount(){
        fetch("http://fitfinitytrainer.com/api/v1/trainers/"+this.props.tid, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then(response => response.json()).then((responseData) => {
            this.setState({result:responseData})
            this.setState({status:responseData._doc.status})
            this.setState({kyc:responseData._doc.kyc})
            this.setState({block:responseData._doc.block_status})
          })
          .catch(err => {
          });
    }


    handleBlock = () =>{
        const data = {
            id: this.props.tid
        }
        fetch("http://fitfinitytrainer.com/api/v1/trainers/block/", {
          method: "post", // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json()).then(responseData => {
            console.log(responseData)
            if(responseData.success){

                toast(
                    "Rejected Succesfully",
                    toastConfig
                  );
                  window.location.reload();
            }else{
                toast(
                    "Some error occured",
                    toastConfig
                  );
            }
          })
          .catch(err => {
          }); 
    }

    handleUnblock = () =>{
        const data = {
            id: this.props.tid
        }
        fetch("http://fitfinitytrainer.com/api/v1/trainers/unblock/", {
          method: "post", // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json()).then(responseData => {
            console.log(responseData)
            if(responseData.success){

                toast(
                    "Rejected Succesfully",
                    toastConfig
                  );
                  window.location.reload();
            }else{
                toast(
                    "Some error occured",
                    toastConfig
                  );
            }
          })
          .catch(err => {
          }); 
    }

    handleReject = () =>{
        const data = {
            id: this.props.tid
        }
        fetch("http://fitfinitytrainer.com/api/v1/trainers/reject/", {
          method: "post", // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json()).then(responseData => {
            console.log(responseData)
            if(responseData.success){

                toast(
                    "Rejected Succesfully",
                    toastConfig
                  );
                  window.location.reload();
            }else{
                toast(
                    "Some error occured",
                    toastConfig
                  );
            }
          })
          .catch(err => {
          }); 
    }

    handleApprove = () =>{
        const data = {
            id: this.props.tid
        }
        fetch("http://fitfinitytrainer.com/api/v1/trainers/approve/", {
          method: "post", // *GET, POST, PUT, DELETE, etc.
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data)
        })
        .then((response) => response.json()).then(responseData => {
            if(responseData){
                console.log(responseData)
                toast(
                    "Approved Succesfully",
                    toastConfig
                  );
                  window.location.reload();
            }else{
                toast(
                    "Some error occured",
                    toastConfig
                  );
            }
        })
          .catch(err => {
          });
    }

    render(){
        // let resultant=this.state.result2
        // let table=[]
        // { Object.keys(resultant).map((item, i) => {
        //     Object.keys(resultant[item]).map((tran , j) =>{
        //         resultant[item][tran].trainerId === this.props.tid?  
        //         table.push(<tr className="service-row" key={j}>
        //         <td className="table-padding">{resultant[item][tran].trial_date?resultant[item][tran].trial_date:"-"}</td>
        //         <td className="table-padding">{resultant[item][tran].trial_time?resultant[item][tran].trial_time:"-"}</td>
        //         <td className="table-padding">{resultant[item][tran].typeOfservice?resultant[item][tran].typeOfservice:"-"}</td>
        //         <td className="table-padding">{resultant[item][tran].area?resultant[item][tran].area:"-"}</td>
        //         <td className="table-padding right-data">20</td>
        //         </tr> )
        //     : console.log("no")
        //     })
        // })}
        return(
            <div>
                <span className="dashboard-logo" style={{marginLeft:"40px",position:"absolute", marginTop:"-30px"}}>Profile - <span style={{textTransform:"capitalize"}}>{this.state.result._doc?this.state.result._doc.name:null}</span></span>
                <div className="padding-top">
                    <div className="view-conn">

                        <div className="right-side">
                            <div>
                                <div className="row">
                                   

                                    <div>
                                        <span className="pd" style={{textTransform:"capitalize"}}>{this.state.result._doc?this.state.result._doc.name:"-"}</span><br/>
                                        <span className="pd">{this.state.result._doc?this.state.result._doc.phone:"-"}</span><br/>
                                        <span className="pd">{this.props.tid?this.props.tid:"-"}</span>
                                        <span className="pd">{this.state.status?this.state.status:"-"}</span>
                                        <div className="row">
                                        <div className="col">
                                            {(this.state.kyc === "1") ?
                                            <button className="btn btn-danger btn-class"><b>KYC NOT DONE</b></button>
                                            :
                                            <button className="btn btn-success btn-class"><b>KYC DONE</b></button>

                                            }                                   
                                        </div>
                                        </div>
                                    </div>

                                    
                                    
                                </div>    
                            </div>
                                                                                                         
                            <div>
                                <div className="row">
                                    <div className="col">
                                        {(this.state.block === "Block") ?
                                        <button className="btn btn-success btn-class" onClick={this.handleUnblock}><b>Unblock</b></button>
                                        :
                                        <button className="btn btn-danger btn-class" onClick={this.handleBlock}><b>Block</b></button>

                                        }                                   
                                    </div>
                                    
                                </div>
                            </div>
                            <div>
                                
                                <div className="row">
                                    <div className="col">
                                        {(this.state.status === "A") ?
                                        <button className="btn btn-success btn-class"><b>Approved</b></button>
                                        :
                                        <button className="btn btn-danger btn-class" onClick={this.handleReject}><b>Reject</b></button>

                                        }                                   
                                    </div>
                                    <div className="col">
                                        {(this.state.status === "P" && this.state.kyc === "2") ?
                                        <button className="btn btn-warning btn-class" onClick={this.handleApprove}><b>Approve</b></button>
                                        :null
                                            
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row right-side" style={{paddingTop:"60px"}}>
                            <div className="col-sm-3 tdata">
                                <span style={{fontWeight:"600"}}>ADDRESS</span><br/>
                                {this.state.result._doc?this.state.result._doc.c_address:"-"}<br/>
                                {this.state.result._doc?this.state.result._doc.district:"-"}<br/>
                                {this.state.result._doc?this.state.result._doc.state:"-"}<br/>
                                {this.state.result._doc?this.state.result._doc.pin:"-"}
                            </div>
                           
                            <div className="col-sm-3 tdata">
                                <span style={{fontWeight:"600"}}>BANK ACCOUNT DETAILS</span><br/>
                                {this.state.result._doc?this.state.result._doc.account_no:"-"}<br/>
                                {this.state.result._doc?this.state.result._doc.ifsc_code:"-"}<br/>
                                {this.state.result._doc?this.state.result._doc.branch_name:"-"}<br/>
                                {this.state.result._doc?this.state.result._doc.bank_name:"-"}
                            </div>
                            <div className="col-sm-3 tdata">
                                <span style={{fontWeight:"600"}}>Submitted Documents</span><br/>
                              Aadhar: <a href={this.state.result._doc?this.state.result._doc.adhhar:'#'} target="_blank">View</a><br/>
                              Pan: <a href={this.state.result._doc?this.state.result._doc.pan:'#'} target="_blank">View</a><br/>
                              Certificate:  <a href={this.state.result._doc?this.state.result._doc.certificate:'#'} target="_blank">View</a><br/>
                              Photo: <a href={this.state.result._doc?this.state.result._doc.photo:'#'} target="_blank">View</a>
                            </div>

                            <div className="col-sm-3 tdata">
                                <span style={{fontWeight:"600"}}>SERVICING AREA</span><br/>
                                {this.state.result._doc?
                                <span>
                                    {Object.keys(this.state.result._doc.servicing_area).map((da, m)=>(
                                        <span>{this.state.result._doc.servicing_area[m]}<br/></span>
                                    ))}
                                </span>
                                :null}<br/>
                            </div>
                            
                            {/* <div className="col-sm-2 tdata" style={{textAlign:"center"}}>
                                <span style={{fontWeight:"600"}}>Credit Available</span><br/>
                                <span style={{fontWeight:"bold",fontSize:"25px"}}>1234</span><br/>
                                <button className="btn btn-warning btn-class"><b>Add Credit</b></button>
                            </div> */}
                        </div>

                        {/* <div style={{paddingTop:"30px"}}>
                            <table className="table-service">
                                <tr style={{fontWeight:"100"}}>
                                    <th className="table-padding">Date</th>
                                    <th className="table-padding">Time</th>
                                    <th className="table-padding">Service Type</th>
                                    <th className="table-padding">Serviced Area</th>
                                    <th className="right-data table-padding" style={{color:"green"}}>Credit spend</th>
                                </tr>
                                <tbody>
                                    {table}                                
                                </tbody>
                                
                            </table>
                        </div> */}

                <ToastContainer transition={Flip} />
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(TrainerProfile)