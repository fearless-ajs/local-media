import React, { useState } from "react";
import useSWR from 'swr';


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
import swal from "sweetalert";

import NewUser from "../modals/NewUser.js";
import {fetcher} from '../helpers/fetcher';

import Spinner from '../components/Spinner';


const avatar = "https://loveworldbooks.com/media-distributor/public/images/avatar.png";


function User() {
    const [activePage, setActivePage] = useState(0);
    //
    const [showNewUserModal, setNewUserModal] = useState(false);
    const [showUserModal, setUserModal] = useState(false);

    // fetch from backend
    let { data, error, mutate } = useSWR("/api/users", fetcher);
    let isLoading = !data && !error;

    if (data) {
        if (!data.success) {
            swal(data.message || "Error, Couldnt fetch users list");
            data = [];
        }
        else {
            data = data.data;
        }
    }
    if (error) data = [];


    const deleteUser = (id) => {
        swal("Delete user ?", {
            buttons: ["No", "Yes"],
        })
        .then(r => {
            if (r) {
                axios.delete(`/api/user/${id}`)
                .then(r => {
                    if (r.data.success) {
                        swal("User deleted!", "Updating user list...", "success");
                        mutate(); // update user list
                    }
                });
            }
        })
    };

    return (
        <>
            <Container fluid>
                <div className="text-right">
                    <Button
                        size="sm"
                        variant="success"
                        className="rounded mb-2"
                        onClick={() => setNewUserModal(true)}
                    >
                        <i className="fa fa-plus"></i> Add new user
                    </Button>
                </div>

                <NewUser
                    show={showNewUserModal}
                    onClose={() => setNewUserModal(false)}
                    onMutate={() => {
                        swal("User created!", "Updating user list...", "success");
                        mutate(); // update user list
                    }}
                />

                <Row>
                    <Col md="12">
                        <Card className="shadow">
                            <Card.Header>
                                <Card.Title as="h4">Users</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    {
                                        isLoading
                                        ? <div className="m-auto"> <Spinner type='list' /> </div>
                                        : (
                                            !data.length 
                                            ? <div className="m-auto"> Nothing here </div>
                                            : data.map((user) =>(
                                                <div className="col-xl-4 col-md-6 mb-3 col-margin" key={user.id}>
                                                    <div className="card border-left-primary shadow h-90 py-0">
                                                        <div className="card-body pb-0">
                                                            <div className="card-image-top m-auto">
                                                                <img src={avatar} className="rounded-circle border m-auto d-block" width="140" height="140" />
                                                            </div>
                                                        </div>
                                                        <div className="card-footer bg-white pb-0">
                                                            <div className="lead-details">
                                                                <div>
                                                                    <p id="user-name" className="mb-0"> {user.name} </p>
                                                                    <p id="user-email" className="text-small text-secondary"> 
                                                                        <em> {user.email} </em>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="settings float-right">
                                                                <button
                                                                    onClick={ ()=>deleteUser(user.id) } className="btn btn-sm border-danger ml-3">
                                                                    <i className="fa fa-trash text-danger"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    )}
                                </Row>

                                <div className="ml-3"></div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default User;
