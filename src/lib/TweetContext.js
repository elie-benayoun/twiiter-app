import React from 'react';

const TweetContext = React.createContext({
 
  handlechange:()=>{},
  error:false,
  errorMessage:"",
  submit:()=>{},
  data:[]
});

export default TweetContext;