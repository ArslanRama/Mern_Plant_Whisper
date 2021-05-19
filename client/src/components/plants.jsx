import React from 'react';
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export const Plants = (props) => {
    const [name, setName] = useState('');
    const [picture, setPicture] = useState();
    const [successMsg, setSuccessMsg] = useState();

    // this function will update plants 
    const getName = (event) => {
        setName(event.target.value)
    }

     // this function will update picture data
     const selectPlantPic = (event) => {
        setPicture(event.target.files[0]);
    }
    
    // add plant data to server
    const addPlant = (event) => {
        event.preventDefault();
        console.log(picture)
        // collect all data from form
        const formData = new FormData();
        formData.append('name', name) // add plant name to formData obj
        formData.append('plantPic', picture); // add plant picture to formData obj
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
            .catch((err) => console.log(err));
    }
   
    return (
        <Row>
            <Col>
                <div id='plants' className='text-center'>
                    <div className='container'>
                        <div className='section-title'>
                            <h2>Like to add your favourite plant to our gallery?</h2>
                            <h1> To be human is to experience biophilia.</h1>
                            {
                                successMsg != null &&
                                <Alert variant="success">
                                    {successMsg}
                                </Alert>

                            }
                        
                        </div>

                        <Form onSubmit={addPlant}>
                        
                            <Form.Group controlId="plantName">
                                <Form.Control
                                    type="text"
                                    placeholder="Type a plant name"
                                    onChange={getName}
                                    name="name" />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    id="exampleFormControlFile1"
                                    label="Upload a Picture"
                                    onChange={selectPlantPic}
                                    name="plantPic" />
                            </Form.Group>
                            <Button variant="primary"
                                type="submit"
                                onClick={addPlant}>
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
