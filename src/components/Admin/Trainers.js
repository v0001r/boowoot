import React from "react"
import { firebase } from "../firebase/index";
import TrainerProfile from "./TrainerProfile"

class Trainers extends React.Component{
    constructor(){
        super()
        this.state = {
          result:[],
          open:true,
          tid:'',
          tname:''
        }
    }
    
      componentDidMount(){
        
        fetch("http://fitfinitytrainer.com/api/v1/trainers?page=1&limit=10", {
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
          })
          .catch(err => {
          });
      }

      handleClick = (e) =>{
        this.setState({
          open:false,
          tid:e.target.id
        });
      }

      handleBack = () =>{
        this.setState({
            open:true
        })
      }

    render(){
        const resultant = this.state.result;
        return(
            <div className="col render">
              {this.state.open?
              <div>
              <span className="dashboard-logo">TRAINER</span>
              <div className="padding-top">
                  <div class="view-con">
                  {resultant
                    ? Object.keys(resultant).map((item, i) => (
                      <div key={i}>
                        {resultant[item]._doc?
                        <div className="enroll-now-container border_design view-container">
                          <div style={{ width: "100%" }} className="row">
                            <div className="container-service">

                              <div className="col-sm-12 wid">
                                

                                <div className="row">
                             
                                  <span style={{textTransform:"capitalize"}} className="pd">
                                    {resultant[item]._doc?resultant[item]._doc.name:null}
                                  </span>
                            
                                  <span className="pd">
                                   {resultant[item]._doc?resultant[item]._doc.age:null}
                                  </span>
                            
                                  <span className="pd">
                                    {resultant[item]._doc?resultant[item]._doc.email:null}
                                  </span>

                                  <span className="pd">
                                    {resultant[item]._doc?resultant[item]._doc.phone:null}
                                  </span>

                                  <span className="pd">
                                    {resultant[item]._doc?resultant[item]._doc.pin:null}
                                  </span>

                                </div>

                                <div className="row" style={{fontWeight:"600"}}>
                                  <span className="pd">Leads Till Now: 24</span>
                                  <span className="pd">Leads Served: 24</span>
                                </div>

                            </div>

                            <div className="right-side col-sm-4">
                             
                              <div>
                              <span className="text-primary" onClick={this.handleClick}><u id={resultant[item]._doc.ref_id}>View Profile</u></span>
                              </div>
                              
                              <div >
                                <div style={{backgroundColor:"orange",padding:"3px 1px 3px 1px",width:"100px",borderRadius:"15px",fontWeight:"bold",textAlign:"center",color:"white"}}>
                                  {resultant[item]._doc?resultant[item]._doc.experience:null}
                                </div>
                              </div>

                              <div >
                                <span style={{color:"#14900f"}}>
                                  4.5 <i className="fa fa-star star"></i>
                                </span>
                              </div>

                              </div>
                            </div>
                            </div>
                        </div>
                        :null
                      }
                      </div>
                      ))
                    : null}
                    </div>
                    </div>
                    </div>
                    : <div><i class="fa fa-arrow-left dashboard-logo" onClick={this.handleBack} style={{display:"inline",paddingRight:"30px",fontSize:"20px"}}></i><TrainerProfile tid={this.state.tid}/></div>
                    }
            </div>
        )
    }
}

export default Trainers