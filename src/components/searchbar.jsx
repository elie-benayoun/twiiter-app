import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import AppContext from "../lib/AppContext"

export default function Search(){
    const [type,setType]=useState(true)
    const [text,setText]=useState("")
    return(
        <AppContext.Consumer>
            {({onfilterchange,onTypeChange})=>(
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>{
                    setText(e.target.value);
                    if(e.target.value.length==0){
                        onfilterchange("")
                    }
                }
                    } />
                <Button variant="outline-success" onClick={
                    ()=>{
                       onfilterchange(text);
                       onTypeChange(type)
                    }
                }>Search</Button>
                <Form inline>
                    <Form.Check name="search" inline label="User" type={"radio"} id={`inline-radio-1`} onClick={()=>{setType(false)}}/>
                    <Form.Check name="search" inline label="tweets" type={"radio"} id={`inline-radio-1`} onClick={()=>{setType(true)}}/>
                </Form>
            </Form>

            )}
        </AppContext.Consumer>

    )
}