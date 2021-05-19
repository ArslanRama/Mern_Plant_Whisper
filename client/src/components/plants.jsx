import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export const Plants = (props) => {
    const [name, setName] = useState('');
    const getName = (event) => {
        setName(event.target.value)
    }
    const add = () => {
        axios.post('http://localhost:8000/plant/add', { name })
            .then(response => {
                const successMsg = response.data
                console.log(successMsg)
            })
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
                        </div>
                        <Form.Group>
                            <Form.Control type="text"
                                placeholder="Type a plant name"
                                onChange={getName} />
                        </Form.Group>
                        <Button variant="primary"
                                type="button"
                                onClick={add}>
                                Add to Plant Wisper
                           </Button>

                    </div>
                </div>
            </Col>
        </Row>
    )
}
