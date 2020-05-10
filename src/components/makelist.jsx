import React, { useState } from "react";
import TweetContext from "../lib/TweetContext";
import {getUsernameById} from "../lib/MessageList";
import firebase from "../lib/firebase"
import { render } from "@testing-library/react";
const db = firebase.firestore();
class makelist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:""
        }

    }


    render(){
        return(
        <TweetContext.Consumer>
            
            {({data,names})=>(
                <>
                    {data &&
                    data.sort((a, b) => new Date(b.date) - new Date(a.date)).map(message=>{
                        console.log(names)
                                return(
                                    <div className="tweet-container">
                                                <div className="info-container">
                                                    <div>{names.find((name)=>{return name.uid==message.userName}).name}</div> 
                                                    <div>{message.date}</div>
                                                </div>
                                                <div className="message-container">{message.content}</div>
                                    </div>
                        )
                        
                    })}
                </>
            )}
        </TweetContext.Consumer>
        );

    }
    }




export default makelist