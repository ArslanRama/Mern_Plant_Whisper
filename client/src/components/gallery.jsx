import axios from "axios";
import { useEffect, useState } from "react";
import {Image, Alert, Button, Modal, Form } from "react-bootstrap";
export const Gallery = () => {
  const [plants, setPlants] = useState([])
  const [updated, setUpdated] = useState(false);

  //! Update Plant Function
  const [show, setShow] = useState(false);
  const [plantData, setPlantData] = useState({
    name: '',
    plantPic: '',
    plantOrigin: ''
  });
  const [updateMsg, setUpdateMsg] = useState()

  const detailPlant = (id) => {
    axios.get('http://localhost:8000/plant/detail' + id)
      .then(response => {
        setPlantData(response.data)
        setShow(true)
      })
  }
  const modalClose = () => {
    setShow(false);
  }
  const updatePlant = (event) => {
    event.preventDefault();
    // update data to backend
    console.log(event.target.name.value)
    axios.post('http://localhost:8000/plant/update', {
      id: event.target.id.value,
      name: event.target.name.value
    })
      .then(response => {
        setUpdateMsg(response.data)
      })
  }

  //! Delete Function
  const deletePlant = (id) => {
    // id.preventDefault();
    setUpdated(!updated);
    const removePlantId = id;
    axios
      .post(`http://localhost:8000/plant/delete/${removePlantId}`, {
        removePlantId,
      })
      .then((response) => console.log(response.data));
  };


  useEffect(() => {
    //! it will return the new value at /gallery
    axios.get('http://localhost:8000/plant/all')
      .then(response => {
        console.log(response.data)
        setPlants(response.data)
        console.log(plants);
      })
  }, [plants, updateMsg])
  return (
    <div id='gallery' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Gallery</h2>
          <p>
            We don’t settle for boring plants. From the tropical jungles of Colombia to the Danish greenhouses right through to the hot Thai wilderness, we will go to the end of the Earth to find the rarest and most interesting plants for your home.
          </p>
        </div>

        <div className='row'>
          <div className='portfolio-items'>

            {
              plants.map((item, index) => {
                return (
                  <div key={item._id} className='col-sm-6 col-md-4 col-lg-4'>
                    <h4><img
                      src={`http://localhost:8000/${item.plantPic}`}
                      width="200"
                      height="150"
                      alt='Project Title' >
                    </img>
                      <p>{item.name}</p>
                      <p>Added by: {item.added_by.username}</p>
                      <p>Origin: {item.plantOrigin}</p>
                    </h4>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePlant(item._id)}
                    >Delete</button>
                    <button 
                    type="button" 
                    onClick={() => detailPlant(item._id)}>
                      Update </button>
                  </div>
                )
              })
            }

            <Modal show={show} onHide={modalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Plant Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                 updateMsg != null &&
                    <Alert variant="success">
                       {updateMsg}
                    </Alert>
                }
                <Form onSubmit={updatePlant}>
                    <input type="hidden" name="id" value={plantData._id}/>
                    <Form.Group controlId="plantName">
                        <Form.Label>Plant Name</Form.Label>
                        <Form.Control type="text" name="name" defaultValue={plantData.name}/>
                    </Form.Group>
                    <Form.Group controlId="plantOrigin">
                        <Form.Label>Plant Origin</Form.Label>
                        <Image src={plantData.plantOrigin} thumbnail/>
                    </Form.Group>
                    <Form.Group controlId="plantPic">
                        <Form.Label>Plant Picture</Form.Label>
                        <Image src={plantData.plantPic} thumbnail/>
                    </Form.Group>
                    <Button variant="danger" type="submit">
                        Update changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/01-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Lorem Ipsum</h4>
                    </div>
                    <img
                      src='img/portfolio/01-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/02-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Adipiscing Elit</h4>
                    </div>
                    <img
                      src='img/portfolio/02-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/03-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Lorem Ipsum</h4>
                    </div>
                    <img
                      src='img/portfolio/03-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/04-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Lorem Ipsum</h4>
                    </div>
                    <img
                      src='img/portfolio/04-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/05-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Adipiscing Elit</h4>
                    </div>
                    <img
                      src='img/portfolio/05-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/06-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Dolor Sit</h4>
                    </div>
                    <img
                      src='img/portfolio/06-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/07-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Dolor Sit</h4>
                    </div>
                    <img
                      src='img/portfolio/07-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/08-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Lorem Ipsum</h4>
                    </div>
                    <img
                      src='img/portfolio/08-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-4'>
              <div className='portfolio-item'>
                <div className='hover-bg'>
                  {' '}
                  <a
                    href='img/portfolio/09-large.jpg'
                    title='Project Title'
                    data-lightbox-gallery='gallery1'
                  >
                    <div className='hover-text'>
                      <h4>Adipiscing Elit</h4>
                    </div>
                    <img
                      src='img/portfolio/09-small.jpg'
                      className='img-responsive'
                      alt='Project Title'
                    />{' '}
                  </a>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
