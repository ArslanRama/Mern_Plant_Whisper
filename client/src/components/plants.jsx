import React from 'react';
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export const Plants = (props) => {
    const [name, setName] = useState('');
    const [picture, setPicture] = useState();
    const [successMsg, setSuccessMsg] = useState();
    const getName = (event) => {
        setName(event.target.value)
    }
    // add plant data to backend
    const add = (event) => {
        event.preventDefault();
        console.log(picture)
        // collect all data from form
        const formData = new FormData();
        formData.append('name', name)
        formData.append('plantPic', picture);
        // configuaration for file type input
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
        // todo: how to make below absolute path to relative path
        axios.post('http://localhost:8000/plant/add', formData, config)
            .then(response => {
                const successMsg = response.data
                console.log(successMsg)
                setSuccessMsg(response.data)
            })
    }
    // this function will update picture data
    const selectPic = (event) => {
        setPicture(event.target.files[0]);
    }

    return (
        <Row>
            <Col>
                <div id='plants' className='text-center'>
                    <div className='container'>
                        <div className='section-title'>
                            <h2>Add a plant to database</h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
                                dapibus leonec.</p>
                            {
                                successMsg != null &&
                                <Alert variant="success">
                                    {successMsg}
                                </Alert>
                            }
                        </div>
                        <Form onSubmit={add}>
                        <Form.Group controlId="plantName">
                    <Form.Control type="text" placeholder="Type a plant name" onChange={getName} name="name"/>
                </Form.Group>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Upload a Picture" onChange={selectPic} name="plantPic"/>
                </Form.Group>
                        <Button variant="primary"
                            type="submit"
                            onClick={add}>
                            Add to Plant Wisper
                           </Button>
                           </Form>

                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default Plants
