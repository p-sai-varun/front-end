import React, {useState} from 'react'
import { Modal, Form, Button, Toast } from 'react-bootstrap'
import axios from 'axios';


export default function AddUser(props) {
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);
    const [show, setShow] = useState(false);
    const [name, setName] = useState()
    const [skills, setSkills] = useState()
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [description, setDescription] = useState()
    const [qualification, setQualification] = useState()
    const [date, setDate] = useState()


    const handleOnChangeName = (e) =>{
        e.preventDefault();
        setName(e.target.value)
    }
    const handleOnChangeSkills = (e) =>{
        e.preventDefault();
        setSkills(e.target.value)
    }
    const handleOnChangeMin = (e) =>{
        e.preventDefault();
        setMin(e.target.value)
    }
    const handleOnChangeMax = (e) =>{
        e.preventDefault();
        setMax(e.target.value)
    }
    const handleOnChangeDescription = (e) =>{
        e.preventDefault();
        setDescription(e.target.value)
    }
    const handleOnChangeQualification = (e) =>{
        e.preventDefault();
        setQualification(e.target.value)
    }
    const handleOnChangeDate = (e) =>{
        e.preventDefault();
        setDate(e.target.value)
    }

    const addUser = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/sqlartifact/create?name=${name}&skills=${skills}&min=${min}&max=${max}&description=${description}&qualification=${qualification}&date=${encodeURIComponent(date)}`)
        .then(res =>
            {
            setShow(true)
            console.log(res.data)})
        .catch(err =>
             console.log(err)
                     
             )
        handleClose()
    }
    return (
        <div>
            <Toast bg="success" onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
            <small>1 sec ago</small>
          </Toast.Header>
          <Toast.Body className="success">Data inserted successfully</Toast.Body>
        </Toast>
            { props.show &&
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>

                    <Form>
                <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={handleOnChangeName} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="skills">
                            <Form.Label>Required skills</Form.Label>
                            <Form.Control type="text" value={skills} onChange={handleOnChangeSkills} placeholder="Enter Marks" />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="min">
                            <Form.Label>Min</Form.Label>
                            <Form.Control type="text" placeholder="Enter Marks" value={min} onChange={handleOnChangeMin} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="max">
                            <Form.Label>Max</Form.Label>
                            <Form.Control type="text" placeholder="Enter Marks" value={max} onChange={handleOnChangeMax} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descripton">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" value={description} onChange={handleOnChangeDescription} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="qualification">
                            <Form.Label>Education qualification</Form.Label>
                            <Form.Control type="text" placeholder="Enter Ed quali" value={qualification} onChange={handleOnChangeQualification} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter" value={date} onChange={handleOnChangeDate} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type="submit" onClick={addUser}>
                            Submit
                        </Button>
                </Modal.Footer>
                    </Form>
            </Modal>
}
        </div>
    )
}
