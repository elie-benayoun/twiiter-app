import React from "react"
import AppContext from "../lib/AppContext";
import TweetContent from "../lib/TweetContext";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from "../lib/firebase"
class BlockTweet extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log()
        return(
        <TweetContent.Consumer>
            {({error,errorMessage,handlechange,submit,button,tweet})=>(
        <form className="myform">
        <textarea value={tweet} onChange={(event)=>{handlechange(event.target.value)}} className="myinput" rows="2" cols="25" placeholder="What you have in mind..."></textarea>
        <Container>
        <Row>
        <Col xs md={8} className="error-container">
        {error && <div className="error">{errorMessage}</div>}
        </Col>
        <Col xs md={2}></Col>
        <Col xs md={2}>
            <AppContext.Consumer>
                {({name})=>(
                    <Button onClick={()=>{submit(name)}} className="mybutton" variant="primary" disabled={button}>Tweet</Button>
                )}
            </AppContext.Consumer>
        </Col>
        </Row>
        </Container>
        </form>
            )}

        </TweetContent.Consumer>
        )
    }
}

export default BlockTweet