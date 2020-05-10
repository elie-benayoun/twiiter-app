import React from 'react';

const AppContext = React.createContext({
    name: '',
    onNameChange: (newname) => { },
    islogged:false,
    onLogChange:(bool)=>{},
    userId:"",
    setUserId:()=>{}
});

export default AppContext;