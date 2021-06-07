import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Sign_in() {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    // get form value inside user state
    const getValue = (e)=>{
        setUser({
            ...user, // all previous values
            [e.target.name]: e.target.value // new key:value
        })
    }
    // Send signup data to backend and redirect to frontend
    const signIn = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8000/user/login', user)
        .then(res=>{  
            // saving data to clients computer
            localStorage.setItem('currentUser', JSON.stringify(res.data))      
            window.location.href = '/gallery';
        })
    }
    return(
        <div>
            <Col>
                <Form onSubmit={signIn}>
                <Form.Group controlId="email">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text"  onChange={getValue} name="username"/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={getValue} name="password"/>
                </Form.Group>
                <Button variant="success" type="submit">
                    Sign In
                </Button>
                </Form>
            </Col>
        </div>
    )
}

export default Sign_in;
