import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {addUserById} from "../lib/MessageList"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import firebase from "../lib/firebase";
import Appcontext from "../lib/AppContext";
import { onLog } from "firebase";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      user: "",
      password: "",
      param:this.props.match.params.info,
      error:false,
      errormessage:""
    };
  }

  componentDidUpdate(){
      if (this.state.param != this.props.match.params.info){
      this.setState({param:this.props.match.params.info})
      }
  }

  submit(onLogChange) {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
          onLogChange(true)
          this.setState({name:"",password:"",email:""})
      })
      .catch(e=>{
        this.setState({error:true,errormessage:e.message})
      })
  }
  register() {
    if(this.state.user.length>2){
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          firebase.auth().currentUser.updateProfile({
            displayName:this.state.user
          })
          this.setState({name:"",password:"",email:""})
          addUserById(firebase.auth().currentUser.providerData[0].uid,{name:this.state.user,uid:firebase.auth().currentUser.providerData[0].uid})
        })
        .catch((e)=>{
          this.setState({error:true,errormessage:e.message})
        })

    }

    else{
      this.setState({error:true,errormessage:"username must be at least 3 letters"});
    }

  }

  loginwithgoogle(onLogChange){
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      res=>{
        addUserById(res.additionalUserInfo.profile.id,{name:res.user.displayName,uid:res.additionalUserInfo.profile.id})
        onLogChange(true)
      }
    )
  }
  render() {
    return (
      <>
        <Appcontext.Consumer>
            {({onLogChange})=>(

        <>
        {!firebase.auth().currentUser && 
        <>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control className="username-input" value={this.state.email}  type="text" placeholder="Email" onChange={(event) => {this.setState({ email: event.target.value,error:false });}} />
          <Form.Label>Password</Form.Label>
          <Form.Control className="username-input" value={this.state.password} type="password"placeholder="Password" onChange={(event) => {this.setState({ password: event.target.value,error:false });}}/>
        {this.state.param=="register" && 
        <>
        <Form.Label>User Name</Form.Label>
        <Form.Control className="username-input" value={this.state.user} type="text" placeholder="Username" onChange={(event) => { this.setState({ user: event.target.value,error:false })}}/>
        <Button variant="primary" onClick={() => {this.register();}}> Register </Button>
        <Link to={`/user/login`} >GO to login</Link>    
        </>
        }
        </Form.Group>
        <>
        {this.state.param=="login" &&
        <>
        <Button variant="primary"onClick={() => { this.submit(onLogChange);}}>Log in</Button>
        <Link to={`/user/register`} >GO to register</Link> 
        <Button className="google"onClick={()=>{this.loginwithgoogle(onLogChange)}}>Log-in With Google</Button>
        </>
        }
        </>
        </>
        }
        {firebase.auth().currentUser && <div>You are signed in Click<Button className="log-out-button" onClick={()=>{firebase.auth().signOut() ; 
          onLogChange(false)}} variant="primary">here</Button> to log out </div>}
        {this.state.error && <div>{this.state.errormessage}</div>}
        
        </>
            )}
        </Appcontext.Consumer>
        </>
    );
    
  }
}

export default withRouter(LogIn);
