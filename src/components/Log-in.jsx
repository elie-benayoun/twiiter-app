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

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      user: "",
      password: "",
      param:this.props.match.params.info
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
      });
  }
  register() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        firebase.auth().currentUser.updateProfile({
          displayName:this.state.user
        })
        addUserById(firebase.auth().currentUser.providerData[0].uid,{name:this.state.user})
      });
  }

  loginwithgoogle(onLogChange){
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      res=>{
        addUserById(res.user.uid,{name:res.user.displayName})
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
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control className="username-input"  type="text" placeholder="Email" onChange={(event) => {this.setState({ email: event.target.value });}} />
          <Form.Label>Password</Form.Label>
          <Form.Control className="username-input" type="password"placeholder="Password" onChange={(event) => {this.setState({ password: event.target.value });}}/>
        {this.state.param=="register" && 
        <>
        <Form.Label>User Name</Form.Label>
        <Form.Control className="username-input" type="text" placeholder="Username" onChange={(event) => { this.setState({ user: event.target.value })}}/>
        <Button variant="primary" onClick={() => {this.register();}}> Register </Button>
        <Link to={`/user/login`} >GO to login</Link>    
        </>
        }
        </Form.Group>
        {this.state.param=="login" &&
        <>
        <Button variant="primary"onClick={() => { this.submit(onLogChange);}}>Log in</Button>
        <Link to={`/user/register`} >GO to register</Link> 
        <Button onClick={()=>{this.loginwithgoogle(onLogChange)}}>Click me</Button>
        </>
        }
        </>
            )}
        </Appcontext.Consumer>
        </>
    );
    
  }
}

export default withRouter(LogIn);
