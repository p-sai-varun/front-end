import React, {useEffect, useState} from 'react'
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { CSVLink } from "react-csv";

export default function DisplayTable(props) {
    const [skills, setSkills] = useState([]);
    const [min, setMin] = useState([]);
    const [max, setMax] = useState([]);
    const [description, setDescription] = useState([]);
    const [qualification, setQualification] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState([]);
    const [date, setDate] = useState([])
    const [updateData, setUpdateData] = useState();
    const [show, setShow] = useState(false);
    const [Data, setData] = useState([]);
    const [updateId, setUpdateId] = useState(); 
    const [NameUpdate, setNameUpdate] = useState();
    const [SkillsUpdate, setSkillsUpdate] = useState();
    const [MinUpdate, setMinUpdate] = useState();
    const [MaxUpdate, setMaxUpdate] = useState();
    const [DateUpdate, setDateUpdate] = useState();
    const [DescriptionUpdate, setDescriptionUpdate] = useState();
    const [QualificationUpdate, setQualificationUpdate] = useState();
    
    //const [csvData, setCSVData] = useState([["Name", "Subject1", "Subject2", "Subject3", "Average"],]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        axios.get('http://localhost:8080/sqlartifact/get')
        .then((response) => {
            console.log(response.data)
            setId(JSON.parse(response.data.id));
            setName(JSON.parse(response.data.name));
            setSkills(JSON.parse(response.data.skills));
            console.log(JSON.parse(response.data.skills))
            setMin(JSON.parse(response.data.min));
            setMax(JSON.parse(response.data.max)); 
            setDescription(JSON.parse(response.data.description));
            setQualification(JSON.parse(response.data.qualification));
            setDate(JSON.parse(response.data.date));
            console.log("length",JSON.parse(response.data.name).length, "testdata", JSON.parse(response.data.name)[0])
            // for(let i = 0; i < JSON.parse(response.data.name).length; i++){
            //     setCSVData(csvData => [csvData, [JSON.parse(response.data.name)[i], JSON.parse(response.data.subject1)[i], JSON.parse(response.data.subject2)[i], JSON.parse(response.data.subject3)[i], JSON.parse(response.data.average)[i]]]);
            // }
            // console.log(csvData);
          })
          .catch((error) => {
            console.log(error);
          });
    },[updateData])

    const deleteById = (e, ID) =>{
        e.preventDefault();
        console.log(ID);
        axios.get("http://localhost:8080/sqlartifact/delete/"+ID)
        .then((response)=>{
            console.log(response.data);
            // window.location.reload();
            setUpdateData(Math.random());
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const upDatebyId = async (e, ID) =>{
        e.preventDefault();
        console.log(ID);
        setUpdateId(ID);
        handleShow();
        const response = await axios.get("http://localhost:8080/sqlartifact/get/"+ID)
        console.log(response.data);
        // setData(response.data);
        setData(response.data);
        setNameUpdate(response.data.name);
        setSkillsUpdate(response.data.skills);
        setMinUpdate(response.data.min);
        setMaxUpdate(response.data.max);
        setDescriptionUpdate(response.data.desccription);
        setDateUpdate(response.data.date);


    }
    const handleOnChangeName = (e) =>{
        e.preventDefault();
        setNameUpdate(e.target.value)
    }
    const handleOnChangeSkills = (e) =>{
        e.preventDefault();
        setSkillsUpdate(e.target.value)
    }
    const handleOnChangeMin = (e) =>{
        e.preventDefault();
        setMinUpdate(e.target.value)
    }
    const handleOnChangeMax = (e) =>{
        e.preventDefault();
        setMaxUpdate(e.target.value)
    }
    const handleOnChangeDescription = (e) =>{
        e.preventDefault();
        setDescriptionUpdate(e.target.value)
    }
    const handleOnChangeQualification = (e) =>{
        e.preventDefault();
        setQualificationUpdate(e.target.value)
    }
    const handleOnChangeDate = (e) =>{
        e.preventDefault();
        setDateUpdate(e.target.value)
    }
    const onClickUpdateBtn = (e) =>{
        e.preventDefault();
        console.log(updateId);
        axios.get(`http://localhost:8080/sqlartifact/update/${updateId}/?name=${NameUpdate}&skills=${SkillsUpdate}&min=${MinUpdate}&max=${MaxUpdate}&description=${DescriptionUpdate}&qualification=${QualificationUpdate}&date=${DateUpdate}`)
        .then((response)=>{
            console.log(response.data);
            // window.location.reload();
            handleClose();
            setUpdateData(Math.random());
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div style={{marginTop: '2%'}}>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Job-id</th>
      <th>company-Name</th>
      <th>skills</th>
      <th>min</th>
      <th>max</th>
      <th>description</th>
      <th>education qualification</th>
      <th>expiry</th>
    </tr>
  </thead>
  <tbody>
      {id && id.map((ID, index)=>(
          <tr key={ID}>
              <td>{index+1}</td>
              <td>{name[index]}</td>
              <td>{skills[index]}</td>
              <td>{min[index]}</td>
              <td>{max[index]}</td>
              <td>{description[index]}</td>
              <td>{qualification[index]}</td>
              <td>{date[index]}</td>
              {/* <td><Alert variant={average[index]>=50?"success":"danger"}>{average[index]>=50?"Pass":"Fail"}</Alert></td> */}
              <td><Button variant="warning" onClick={(e)=>upDatebyId(e,ID)}>Update</Button>&nbsp;&nbsp;<Button variant="danger" onClick={(e)=>deleteById(e,ID)}>Delete</Button></td>
              </tr>

      ))}
  </tbody>
</Table>
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
          <Form>
        <Modal.Body>
        </Modal.Body>
        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={NameUpdate} onChange={handleOnChangeName} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="skills">
                            <Form.Label>Required skills</Form.Label>
                            <Form.Control type="text" value={SkillsUpdate} onChange={handleOnChangeSkills} placeholder="Enter Marks" />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="min">
                            <Form.Label>Minimum experience(in years)</Form.Label>
                            <Form.Control type="text" placeholder="Enter Marks" value={MinUpdate} onChange={handleOnChangeMin} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="max">
                            <Form.Label>Maximum experience(in years)</Form.Label>
                            <Form.Control type="text" placeholder="Enter Marks" value={MaxUpdate} onChange={handleOnChangeMax} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descripton">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" value={DescriptionUpdate} onChange={handleOnChangeDescription} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="qualification">
                            <Form.Label>Education qualification</Form.Label>
                            <Form.Control type="text" placeholder="Enter Ed quali" value={QualificationUpdate} onChange={handleOnChangeQualification} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter" value={DateUpdate} onChange={handleOnChangeDate} />
                            <Form.Text className="text-muted">
                               
                            </Form.Text>
                        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickUpdateBtn}>Update</Button>
        </Modal.Footer>
          </Form>
      </Modal>
     
    {/* <CSVLink style={{marginLeft: '40%', marginTop: '1%', marginBottom: '1%'}} className="btn btn-primary" data={csvData}>Download as CSV</CSVLink> */}
        </div>
    )
}
