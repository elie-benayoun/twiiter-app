import React from 'react';
import MainPage from "./components/mainPage"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Username from "./components/profile";
import './App.css';
import AppContext from './lib/AppContext';
import Login from "./components/Log-in";
import firebase from"./lib/firebase"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      name:JSON.parse(localStorage.getItem("name")),
      logged:false
    }


  }



  render(){

  return (
    <div className="App">
      <AppContext.Provider value={{
          name:this.state.name,
          onNameChange:()=>{this.setState({name:JSON.parse(localStorage.getItem("name"))})},
          islogged:this.state.logged,
          onLogChange:(bool)=>{this.setState({logged:bool})}
      }}>
        <header className="App-header">
          <Router>
          <div className="navbar">
        
            <>
            <Link to="/home" className="item-navbar">Home</Link>
            <Link to="/profile" className="item-navbar">Profile</Link>
            </>
            
            <Link to="/user/login" className="item-navbar">Login</Link>
            <Link to="/user/register" className="item-navbar">Sign-up</Link>
          </div>
            <Switch>
              <Route path="/home">
              <MainPage></MainPage>
              </Route>
              <Route path="/profile">
                <Username></Username>
              </Route>
              <Route path="/user/:info">
                <Login></Login>
              </Route>
            </Switch>
          </Router>
        </header>
      </AppContext.Provider>
    </div>
  );
  }
}

export default App;
