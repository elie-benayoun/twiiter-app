import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AppContext from "../lib/AppContext";
import firebase from "../lib/firebase";
import {addUserById, getUsernameById} from "../lib/MessageList"
class Username extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:"",
            succes:false,
            image:""
        }
    }

    handlechange(value){
        this.setState({name:value,succes:false})
    }
    submit(onNameChange){
        localStorage.setItem("name", JSON.stringify(this.state.name));
        onNameChange()
        firebase.auth().currentUser.updateProfile({
            displayName:this.state.name
          })
          addUserById(firebase.auth().currentUser.providerData[0].uid,{name:this.state.name,uid:firebase.auth().currentUser.providerData[0].uid})
        this.setState({succes:true})
        firebase.auth().currentUser.updateProfile({
            photoURL:this.state.image
          })
    }

    render(){
        return(
            <>
        {firebase.auth().currentUser && 
            <div className="profile-wrapper">
            <h2>Profile</h2>
            <Form.Group>
            <Form.Label>Your current name is {firebase.auth().currentUser.displayName}</Form.Label>
            <Form.Control className="username-input" value={this.state.name} type="text" placeholder="New Name" onChange={(event)=>{this.handlechange(event.target.value)}} />
            <Form.Label>Picture</Form.Label>
            <Form.Control className="username-input" onChange={(event)=>{this.setState({image:event.target.value})}} value={this.state.image} type="text" placeholder="Picture"  />
            <img src={firebase.auth().currentUser.photoURL}/>
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
        
        }
        <>
        {!firebase.auth().currentUser && <div>You have to be signed in to use this functionality</div>}
        </>
        </>
        )
    }
}

export default Username