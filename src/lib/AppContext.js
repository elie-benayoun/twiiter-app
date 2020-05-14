import React from 'react';

const AppContext = React.createContext({
    name: '',
    onNameChange: (newname) => { },
    islogged:false,
    onLogChange:(bool)=>{},
    userId:"",
    setUserId:()=>{},
    filterby:"",
    onfilterchange:(filter)=>{},
    type:true,
    onTypeChange:(newType)=>{}
});

export default AppContext;