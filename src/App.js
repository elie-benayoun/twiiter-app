import React from 'react';
import MainPage from "./components/mainPage"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Username from "./components/profile";
import './App.css';
import AppContext from './lib/AppContext';
import Login from "./components/Log-in";
import firebase from"./lib/firebase";
import Searchbar from "./components/searchbar"

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      name:JSON.parse(localStorage.getItem("name")),
      logged:false,
      filterby:"",
      type:true,
      home:false
    }


  }

  componentDidMount(){
  
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setState({logged:true})
      } else {
        this.setState({logged:false})
      }
    });
  }



  render(){

  return (
    <div className="App">
      <AppContext.Provider value={{
          name:this.state.name,
          onNameChange:()=>{this.setState({name:JSON.parse(localStorage.getItem("name"))})},
          islogged:this.state.logged,
          onLogChange:(bool)=>{this.setState({logged:bool})},
          filterby:this.state.filterby,
          onfilterchange:(filter)=>{this.setState({filterby:filter})},
          type:this.state.type,
          onTypeChange:(newType)=>{this.setState({type:newType})},
          home:this.state.home,
          onHomeChange:(newHome)=>{this.setState({home:newHome})}
      }}>
        <header className="App-header">
          <Router>
          <div className="navbar">
          {this.state.logged && 
            <>
            <Link to="/home" className="item-navbar">Home</Link>
            <Link to="/profile" className="item-navbar">Profile</Link>
            <Link to="/user/login"  className="item-navbar">Log-Out</Link>
            {this.state.home &&<Searchbar/>}
            </>
          }

          {!this.state.logged &&
            <>
            <Link to="/user/login" className="item-navbar">Login</Link>
            <Link to="/user/register" className="item-navbar">Sign-up</Link>
            </>
          }
          </div>
            <Switch>
              <Route path="/home">
                <MainPage onHomeChange={(newHome)=>{this.setState({home:newHome})}}></MainPage>
              </Route>
              <Route path="/profile">
                <Username onHomeChange={(newHome)=>{this.setState({home:newHome})}}></Username>
              </Route>
              <Route path="/user/:info">
                <Login onHomeChange={(newHome)=>{this.setState({home:newHome})}}></Login>
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
