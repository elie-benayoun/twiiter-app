import React from 'react';
import MainPage from "./components/mainPage"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Username from "./components/profile";
import './App.css';
import AppContext from './lib/AppContext';
import Login from "./components/Log-in"

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
          {!this.state.logged &&<div>Hello If you want to use this app you first have to log-in</div>}
          <Router>
          <div className="navbar">
            {this.state.logged && 
            <>
            <Link to="/home" className="item-navbar">Home</Link>
            <Link to="/profile" className="item-navbar">Profile</Link>
            </>
            }
            <Link to="/user/login" className="item-navbar">Login</Link>
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
