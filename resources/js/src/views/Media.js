import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

import multimedia_icon from "../assets/img/multimedia.svg";
import pdf_icon from "../assets/img/pdf.svg";
import file_icon from "../assets/img/file-empty.js";


const useQuery = ()=>{
    return new URLSearchParams(useLocation().search);
}

function TableList() {
    const [showModal, setModal] = useState(false);

    const query = useQuery().get('q');

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
    if (error || !data) data = [];

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

        // apply filter if search query present
        if (query) {
            data = data.filter(v => v.name.match(new RegExp(query, "i")));
        }

        // get total length of data
        total_data_length = data.length;

        // slice data (page)
        data = data.slice(begin, end);
    }


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
                                <Card.Title as="h4">
                                    Media files <p className='card-category'> {query ? `Search results for '${query}'` : ""} </p>
                                </Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Row className="mx-1">
                                    {
                                        isLoading
                                        ? <div className="m-auto"> <Spinner type='list' /> </div>
                                        : (
                                            !total_data_length
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
                                                                <LazyLoadImage
                                                                    className="img-fluid"
                                                                    src={ media.type=='pdf' ? pdf_icon : multimedia_icon }
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

export default TableList;
