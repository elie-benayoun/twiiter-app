import React from "react";
import { getMessages } from "../lib/MessageList";
import { addMessages } from "../lib/MessageList";
import Makelist from "./makelist";
import TweetContext from "../lib/TweetContext";
import BlockTweet from "./BlockTweet";
import firebase from "../lib/firebase"

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
    };
  }
//importer appcontext avec id de l'utilisateur
  submit(name) {
    this.setState({ button: true });
    let userId=firebase.auth().currentUser.providerData[0].uid;
    let object = {
      content: this.state.tweet,
      userName: userId,//ajouter userId a la place de name
      date: new Date().toISOString(),
    };
    addMessages(object)
      .then((data) => {
        this.setState({ data: [object, ...this.state.data], button: false });
      })
      .catch((er) => {
        this.setState({
          errormessage: "There was an eror while posting your tweet sorry",
          error: true,
        });
      });
  }

  handlechange(value) {
    if (value.length < 140) {
      this.setState({ tweet: value, error: false, button: false });
    } else {
      this.setState({
        tweet: value,
        error: true,
        button: true,
        errormessage: "The tweet can't contain more then 140 chars.",
      });
    }
  }

  loadData() {
    getMessages().then((data) => {
      let newList = data.docs.map((e) => {
        return e.data();
      });
      this.setState({ data: newList, loading: false, button: false });
    });
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadData()
    // this.state.interval = setInterval(() => {
    //   this.loadData();
    // }, 5000);
  }

  componentWillUnmount() {
    // this.setState({ interval: clearInterval });
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
          }}
        >
          <>
          {firebase.auth().currentUser && 
          <>
            <BlockTweet />
            <div className="main-tweets">
              {this.state.loading && <div>Loading ...</div>}
              <Makelist></Makelist>
            </div>
          </>
          }
          </>
        </TweetContext.Provider>
      </>
    );
  }
}

export default MainPage;
