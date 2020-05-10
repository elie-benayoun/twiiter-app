import React from "react";
import TweetContext from "../lib/TweetContext";
import {getUsernameById} from "../lib/MessageList"

function makelist(props){
    return(
    <>
    <TweetContext.Consumer>
        
        {({data})=>(
            <>
                {data &&
                data.sort((a, b) => new Date(b.date) - new Date(a.date)).map(message=>{
                    getUsernameById(message.userName).then(
                        res=>{

                        }
                    )
                            return(
                                <div className="tweet-container">
                                            <div className="info-container">
                                                <div>{message.userName}</div> 
                                                <div>{message.date}</div>
                                            </div>
                                            <div className="message-container">{message.content}</div>
                                </div>
                    )
                    
                })}
            </>
        )}
    </TweetContext.Consumer>
    </>
    );
}



export default makelist