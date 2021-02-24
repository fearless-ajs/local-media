import React, {useState} from "react";

import avatar from "../assets/img/avatar.png";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";

import NewUser from '../modals/NewUser.js';
import UserModal from '../modals/UserModal.js';

import swal from 'sweetalert';


function User() {

  const [activePage, setActivePage] = useState(0);
  // 
  const [showNewUserModal, setNewUserModal] = useState(false);
  const [showUserModal, setUserModal] = useState(false);

  // user shown in the modal (an object)
  const [modalUser, setModalUser] = useState(null);

  const deleteUser = ()=>{
    swal("Are you sure you want to do this?", {
      buttons: ["No", "Yes"],
    });
  }

  return (
    <>
      <Container fluid>

        <div className="text-right">
          <Button onClick={()=>setNewUserModal(true)} size="sm" variant="success" className="rounded mb-2"> <i className="fas fa-plus"></i>  Add new user </Button>
        </div>

        <NewUser show={showNewUserModal} onClose={()=>setNewUserModal(false)} />
        <UserModal show={showUserModal} user={modalUser} onClose={()=>setUserModal(false)} />

        <Row>
          <Col md="12">
            <Card className="shadow">
              <Card.Header>
                <Card.Title as="h4">Users</Card.Title>
              </Card.Header>
              <Card.Body>
 
               <Row>
             {Array.from({length: 9}, (_,i)=>i).map((id)=>(
                 <div className="col-xl-4 col-md-6 mb-3 col-margin" key={id}>
                  <div className="card border-left-primary shadow h-90 py-0">
                    <div className="card-body pb-0">
                        <div className="card-image-top m-auto">
                            <img src={avatar} className="rounded-circle border m-auto d-block" width="140" height="140"/>
                        </div>
                    </div>
                    <div className="card-footer bg-white pb-0">
                      <div className="lead-details">
                          <div>
                              <p id="user-name" className="mb-0"> John Doe </p>
                              <p id="user-email" className='text-small text-secondary'> <em>john@doe.email</em> </p>
                          </div>
                      </div>
                      <div className="settings float-right">
                          <button className="btn btn-sm border-secondary" onClick={()=>{
                            setModalUser({name: "John Doe"})
                            setUserModal(true);
                          }}>
                              <i className='fa fa-eye'></i>
                          </button>
                          <button onClick={deleteUser} className="btn btn-sm border-danger ml-3">
                              <i className='fa fa-trash text-danger'></i>
                          </button>
                      </div>
                    </div>

                  </div>
                </div>
             ))}
             </Row>

               <div className="ml-3">
                 <Pagination>
                   {Array.from({length: 4}, (_,i)=>i).map((id, i)=>(
                     <Pagination.Item key={id} active={i === activePage} onClick={()=>setActivePage(id)}>
                      {id+1}
                    </Pagination.Item>
                   ))}
                 </Pagination>
               </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
