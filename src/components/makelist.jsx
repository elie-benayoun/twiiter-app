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
            name:"",
        }

    }

    createList(data,names,tweetContainer,filter,type){
        console.log(type)
        if(filter.length>0 && type){
            data=data.filter(tweet=>{return(tweet.content.toUpperCase().indexOf(filter.toUpperCase()) > -1)})
        }

        if(filter.length>0 && type==false){
            data=data.filter(tweet=>{return(names.find((name)=>{return name.uid==tweet.userName}).name==filter)})
        }
        return (data.sort((a, b) => new Date(b.date) - new Date(a.date)).map(message=>{
            console.log(filter)
            return(
                <div className={tweetContainer}>
                            <div className="info-container">
                                <div>{names.find((name)=>{return name.uid==message.userName}).name}</div> 
                                <div>{message.date}</div>
                            </div>
                            <div className="message-container">{message.content}</div>
                </div>
    )
    
}))}
    



    render(){
        return(
        <TweetContext.Consumer>
            
            {({data,names,tweetContainer,filter,type})=>(
                <>
                    {data && this.createList(data,names,tweetContainer,filter,type)}
           
                </>
            )}
        </TweetContext.Consumer>
        );

    }
    }




export default makelist