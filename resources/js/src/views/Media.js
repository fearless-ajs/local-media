import React, {useState} from "react";
import { Link } from "react-router-dom";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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

import UploadModal from '../modals/UploadMedia';
import "../assets/scss/views/Media.scss";

// 
import img4 from "../assets/img/sidebar-4.jpg";
import img5 from "../assets/img/sidebar-5.jpg";
import img3 from "../assets/img/sidebar-3.jpg";
import img1 from "../assets/img/sidebar-1.jpg";
import img2 from "../assets/img/sidebar-2.jpg";

import file_icon from '../assets/img/file-empty.js';

function TableList() {
  const [showModal, setModal] = useState(false);

  const [activePage, setActivePage] = useState(0);
  const data = Array.from({length: 16}, (_,i)=>i);

  return (
    <>
      <Container fluid>
        <div className="text-right">
          <Button onClick={()=>setModal(true)} size="sm" variant="success" className="rounded mb-2"> <i className="fas fa-plus"></i>  Upload </Button>
        </div>

        <UploadModal show={showModal} onClose={()=>setModal(false)} />

        <Row>
          <Col md="12">
            <Card className="shadow strpied-tabled-with-hover ">
              <Card.Header>
                <Card.Title as="h4">Media files </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">

               <Row className="mx-1">
                  {data.map(id=>(
                  <Col lg="3" sm="6" key={id}>

                    <Link to={`/admin/media/${id}`}>
                      <Card className="shadow card-stats position-relative">
                        <Card.Body className="p-1 m-0 position-relative">
                          <div className="media-view-count">  <i className="fa fa-eye"></i> {_.random(1,78)} </div>
                          <LazyLoadImage
                            className="img-fluid"
                            src={_.sample([img1,img2,img3,img4,img5, ""])}
                            onError={(ev)=>{
                              ev.target.src = file_icon;
                            }}
                          />
                        </Card.Body>

                        <Card.Footer className="p-1">
                          <hr className="m-0"></hr>
                          <div className="media-info">
                            <span className="media-name">
                              FIle name
                            </span>
                          </div>
                        </Card.Footer>
                      </Card>
                    </Link>
                  </Col>
                  ))}
               </Row>

               <div className="ml-3">
                 <Pagination>
                   {Array.from({length: data.length/4}, (_,i)=>i).map((id, i)=>(
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

export default TableList;
