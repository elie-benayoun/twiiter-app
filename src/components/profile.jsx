import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AppContext from "../lib/AppContext";
class Username extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:JSON.parse(localStorage.getItem("name")),
            succes:false
        }
    }

    handlechange(value){
        this.setState({name:value,succes:false})
    }
    submit(onNameChange){
        localStorage.setItem("name", JSON.stringify(this.state.name));
        onNameChange()
        this.setState({succes:true})
    }

    render(){
        return(
        <div className="profile-wrapper">
        <h2>Profile</h2>
        <Form.Group>
        <Form.Label>User Name</Form.Label>
        <Form.Control className="username-input" value={this.state.name} type="text" placeholder="UserName" onChange={(event)=>{this.handlechange(event.target.value)}} />
        </Form.Group>
        <div className="buttonWrapper">
            <AppContext.Consumer>
                {({onNameChange})=>(
                    <Button variant="primary" onClick={()=>{this.submit(onNameChange)}}>Save</Button>
                )}
            </AppContext.Consumer>
        </div>
        {this.state.succes && <div>Your name was changed</div>}
        </div>
        )
    }
}

export default Username