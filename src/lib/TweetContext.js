import React from 'react';

const TweetContext = React.createContext({
 
  handlechange:()=>{},
  error:false,
  errorMessage:"",
  submit:()=>{},
  data:[],
  tweet:"",
  tweetContainer:"",
});

export default TweetContext;