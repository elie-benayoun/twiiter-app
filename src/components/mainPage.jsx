import React from "react";
import { getMessages } from "../lib/MessageList";
import { addMessages } from "../lib/MessageList";
import Makelist from "./makelist";
import TweetContext from "../lib/TweetContext";
import BlockTweet from "./BlockTweet";
import firebase from "../lib/firebase";
import {getUsernameById} from "../lib/MessageList"

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: "",
      error: false,
      button: false,
      data: [],
      loading: false,
      errormessage: "The tweet can't contain more then 140 chars.",
      names:[]
    };
  }
  submit(name) {
if(this.state.tweet.length>0){
    this.setState({ button: true });
    let userId=firebase.auth().currentUser.providerData[0].uid;
    let object = {
      content: this.state.tweet,
      userName: userId,
      date: new Date().toISOString(),
    };
    addMessages(object)
      .then((data) => {
        this.setState({ data: [object, ...this.state.data], button: false ,tweet:""});
        this.loadData()
      })
      .catch((er) => {
        this.setState({
          errormessage: "There was an eror while posting your tweet sorry",
          error: true,
        });
      });
    }
  else{
    this.setState({
      error: true,
      button: true,
      errormessage: "The length of the tweet is not valid",
    });
  }
  }

  handlechange(value) {
    if (value.length < 140 && value.length!=0) {
      this.setState({ tweet: value, error: false, button:false });
    } else {
      this.setState({
        tweet: value,
        error: true,
        button: true,
        errormessage: "The length of the tweet is not valid",
      });
    }
  }

  loadData() {
    this.setState({loading:true})
    getMessages().then((data) => {
      let newList = data.docs.map((e) => {
        return e.data();
      });
      this.setState({ data: newList, loading: false, button: false });
    });
  }

  componentDidMount() {
    this.setState({ loading: true});
    this.loadNames()
    this.loadData()
    // this.state.interval = setInterval(() => {
    //   this.loadData();
    // }, 5000);
  }

  componentWillUnmount() {
    // this.setState({ interval: clearInterval });
  }

  loadNames(){
    getUsernameById().then(res=>{
      let newlist=res.docs.map((e)=>{return e.data()})
      this.setState({names:newlist})
    })
  }

  render() {
    return (
      <>
        <TweetContext.Provider
          value={{
            error: this.state.error,
            errorMessage: this.state.errormessage,
            handlechange: (value) => {
              this.handlechange(value);
            },
            submit: (name) => {
              this.submit(name);
            },
            button: this.state.button,
            data: this.state.data,
            tweet:this.state.tweet,
            loadNames:this.loadNames,
            names:this.state.names
          }}
        >
          <>
          {firebase.auth().currentUser && 
          <>
            <BlockTweet />
            <div className="main-tweets">
              {this.state.loading && <div>Loading ...</div>}
              <Makelist/>
            </div>
          </>
          }
          {!firebase.auth().currentUser && <div>You have to be signed in to use this functionality</div>}
          </>
        </TweetContext.Provider>
      </>
    );
  }
}

export default MainPage;
