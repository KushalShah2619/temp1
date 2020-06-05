import React, { Component } from 'react';
import axios from 'axios';
import DropdownDate from 'react-dropdown-date';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl, Button} from 'react-bootstrap'

class NodeLaunchPlanRegistration extends Component{

    state = {
        numNodesPlanned : "",
        expectedLaunchDate : "",
        expectedShipmentsVolumesPerDay : "",
        errors : ''
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        let nodeLaunchPlan = {
            numNodesPlanned : this.state.numNodesPlanned,
            expectedLaunchDate : this.state.expectedLaunchDate,
            expectedShipmentsVolumesPerDay : this.state.expectedShipmentsVolumesPerDay
        }
        let data = JSON.stringify(nodeLaunchPlan)
        console.log(data)
        axios({
            method : 'POST',
            url : 'https://xo67n8.execute-api.us-east-1.amazonaws.com/beta/registrations/123/nodeLaunchPlans',
            data : data,
            responseType : 'json'
        })
        .then(res => {
            console.log(res)
        })
        .catch(res => {
            console.log(res.response)
            this.setState({errors : res.response.data.errorMessage})
        })
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value}) 
    }

    checkAllFieldsPresent = event => {
        if(this.state.numNodesPlanned === "" || this.state.expectedLaunchDate === "" 
            || this.state.expectedShipmentsVolumesPerDay === ""){
                return false
            }
        else{
            return true
        }
        
    }

    getCurrentDate(){
        let d = new Date()
        let currentDate = {
            year : d.getFullYear(),
            month : d.getMonth() + 1,
            day : d.getDate()
        }
        return currentDate
    }

    formatDate = (date) => {	// formats a JS date to 'yyyy-mm-dd'
        var month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year].join('/');
    }

    render(){

        let isSubmitEnabled = !this.checkAllFieldsPresent();

        let errorNotification = this.state.errors ? (<center><h4 style={{color:'red'}}>{this.state.errors}</h4></center>) : null

        return(
            <div>
                <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#link">Link</Nav.Link>
                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                    <Form inline>
                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
                
                <form>
                    <label>
                        Number of nodes to be launched:  
                    </label>
                    <input name="numNodesPlanned" type="number" min="1" onChange={this.onChange}/>
                    <br />
                    <label>
                        Expected shipments volume per day: 
                    </label>
                    <input name="expectedShipmentsVolumesPerDay" type="number" min="1" onChange={this.onChange}/>
                    <br />
                    <label>
                        Expected Launch Date:
                    </label>
                    <DropdownDate
                        startDate={                         
                            this.getCurrentDate().year + '-' + this.getCurrentDate().month + '-' + (this.getCurrentDate().day + 1)              
                        }
                        endDate={                           
                            (this.getCurrentDate().year + 10) + '-12-31'                    
                        }
                        order={                             
                            ['year', 'month', 'day']        
                        }
                        onDateChange={(date) => {          
                            this.setState({ expectedLaunchDate: this.formatDate(date)});
                        }}
                        ids={                               
                            {
                                year: 'select-year',
                                month: 'select-month',
                                day: 'select-day'
                            }
                        }
                        names={                             
                            {
                                year: 'year',
                                month: 'month',
                                day: 'day'
                            }
                        }
                        defaultValues={                     
                            {
                                year: 'select year',
                                month: 'select month',
                                day: 'select day'
                            }
                        }
                        options={                           
                            {
                                monthShort: true,               
                                monthCaps: true                 
                            }
                        }
                    />
                </form>
                <button disabled={isSubmitEnabled} onClick={this.handleSubmit} >Submit</button>
                {errorNotification}
            </div>
        )
    }
}

export default NodeLaunchPlanRegistration;