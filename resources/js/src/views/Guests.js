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

import {fetcher} from '../helpers/fetcher';

import Spinner from '../components/Spinner';


const avatar = "https://loveworldbooks.com/media-distributor/public/images/avatar.png";


function User() {
    const [showNewUserModal, setNewUserModal] = useState(false);
    const [showUserModal, setUserModal] = useState(false);

    // fetch from backend
    let { data, error, mutate } = useSWR("/api/users", fetcher);
    let isLoading = !data && !error;

    if (data) {
        if (!data.success) {
            swal(data.message || "Error, Couldnt fetch guests list");
            data = [];
        }
        else {
            data = data.data;
        }
    }
    if (error) data = [];

    ////////////////
    // Pagination //
    ////////////////
    const [activePage, setActivePage] = useState(0);
    //
    const media_per_page = 20;
    let total_data_length = 0;
    // 
    // paginate data
    if (data && data.length) {
        const begin = activePage * media_per_page,
            end = begin + media_per_page;

        // get total length of data
        total_data_length = data.length;

        // slice data (page)
        data = data.slice(begin, end);
    }

    return (
        <>
            <Container fluid>

                <Row>
                    <Col md="12">
                        <Card className="shadow">
                            <Card.Header>
                                <Card.Title as="h4">Guest Users</Card.Title>
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
                                                <div className="col-xl-4 col-md-6 mb-1 col-margin" key={user.id}>
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
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    )}
                                </Row>

                                <div className="ml-3">
                                    <Pagination>
                                        {
                                            total_data_length
                                            ? (
                                                Array
                                                .from({length: total_data_length / media_per_page}, (_, i)=>i)
                                                .map((id) => (
                                                    <Pagination.Item
                                                        key={id}
                                                        active={id === activePage}
                                                        onClick={() => setActivePage(id)}
                                                    >
                                                        {id + 1}
                                                    </Pagination.Item>
                                                ))
                                            )
                                            : <></>
                                        }
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
