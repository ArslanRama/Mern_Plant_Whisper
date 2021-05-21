import React from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export const Plants = (props) => {
    // const [plantState, setPlantState]= useState({
    //     name:"",
    //     plantOrigin:"",
    //     plantPic:""
    // })
    const [name, setName] = useState('');
    const [picture, setPicture] = useState();
    const [origin, setOrigin] = useState('');
    const [successMsg, setSuccessMsg] = useState();

    // this function will update plants 
    const getName = (event) => {
        setName(event.target.value)
    }

    // this function will update picture data
    const selectPlantPic = (event) => {
        setPicture(event.target.files[0]);
    }

    const plantOrigin = (event) => {
        setOrigin(event.target.value)
    }

    // add plant data to server
    const addPlant = (e) => {
        e.preventDefault();
        console.log(picture)
        // collect all data from form
        const plantData = new FormData();
        plantData.append('name', name) // add plant name to formData obj
        plantData.append('plantPic', picture); 
        plantData.append('plantOrigin', origin)// add plant picture to formData obj
        // configuaration for file type input
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
        // todo: how to make below absolute path to relative path
        axios.post('http://localhost:8000/plant/add', plantData, config)
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
                        </div>

                        <Form inline onSubmit={addPlant}>

                            <Form.Group controlId="plantName">
                                <Form.Control
                                    type="text"
                                    placeholder="Type a plant name"
                                    onChange={getName}
                                    name="name" />
                                <Form.Control
                                as="select"                  
                                className="my-1 mr-sm-2"
                                onChange={plantOrigin}
                                name="plantOrigin"
                                custom
                            >
                                <option value="0">Plant Origin</option>
                                <option value="Africa">Africa</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Australia">Oceania</option>
                                <option value="South America">South America</option>
                                <option value="North America">North America</option>
                            </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    onChange={selectPlantPic}
                                    name="plantPic" />
                            </Form.Group>                     
                            {successMsg != null &&
                                <h4 variant="success">{successMsg}</h4>
                            }
                            <Button variant="primary"
                                type="submit">
                                Upload to Plant Wisper
                           </Button>
                        </Form>

                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default Plants
