import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from 'swr';

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Modal,
    Pagination,
} from "react-bootstrap";
import swal from "sweetalert";

import UploadModal from "../modals/UploadMedia";
import "../assets/scss/views/Media.scss";

import {fetcher} from '../helpers/fetcher';
import Spinner from '../components/Spinner';
import file_icon from "../assets/img/file-empty.js";


function TableList() {
    const [showModal, setModal] = useState(false);

    // fetch from backend
    let { data, error, mutate } = useSWR("/api/media/all", fetcher);
    let isLoading = !data & !error;

    if (data) {
        if (!data.success) {
            swal(data.message);
            data = [];
        } else {
            data = data.data;
        }
    }
    if (error) data = [];

    const [activePage, setActivePage] = useState(0);


    return (
        <>
            <Container fluid>
                <div className="text-right">
                    <Button
                        onClick={() => setModal(true)}
                        size="sm"
                        variant="success"
                        className="rounded mb-2"
                    >
                        <i className="fas fa-plus"></i> Upload
                    </Button>
                </div>

                <UploadModal
                    show={showModal}
                    onClose={() => setModal(false)}
                    onMutate={() => {
                        swal("Upload successful!", "Updating media list...", "success");
                        mutate(); // update media list
                    }}
                />

                <Row>
                    <Col md="12">
                        <Card className="shadow strpied-tabled-with-hover ">
                            <Card.Header>
                                <Card.Title as="h4">Media files </Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Row className="mx-1">
                                    {
                                        isLoading
                                        ? <div className="m-auto"> <Spinner type='list' /> </div>
                                        : (
                                            !data.length
                                            ? <div className="m-auto"> Nothing here </div>
                                            : data.map((media) => (
                                                <Col lg="3" sm="6" key={media.id}>
                                                    <Link to={`/admin/media/${media.id}`}>
                                                        <Card className="shadow card-stats position-relative">
                                                            <Card.Body className="p-1 m-0 position-relative">
                                                                <div className="media-view-count">
                                                                    <i className="fa fa-eye"></i>
                                                                    {media.views}
                                                                </div>
                                                                {/* TODO: check if pdf or video, replace with special component */}
                                                                <LazyLoadImage
                                                                    className="img-fluid"
                                                                    src={`storage/${media.path}`}
                                                                    onError={(ev) => { ev.target.src = file_icon; }}
                                                                />
                                                            </Card.Body>

                                                            <Card.Footer className="p-1">
                                                                <hr className="m-0"></hr>
                                                                <div className="media-info">
                                                                    <span className="media-name">
                                                                        {media.name}
                                                                    </span>
                                                                </div>
                                                            </Card.Footer>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            ))
                                        )
                                    }
                                </Row>

                                <div className="ml-3">
                                    <Pagination>
{/*                                        {Array.from(
                                            { length: data.length / 4 },
                                            (_, i) => i
                                        ).map((id, i) => (
                                            <Pagination.Item
                                                key={id}
                                                active={i === activePage}
                                                onClick={() =>
                                                    setActivePage(id)
                                                }
                                            >
                                                {id + 1}
                                            </Pagination.Item>
                                        ))}
*/}                                    </Pagination>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default TableList;
