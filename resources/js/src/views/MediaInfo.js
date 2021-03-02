import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";

import Skeleton from 'react-loading-skeleton';

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
} from "react-bootstrap";

import "../assets/scss/views/Media.scss";
import Media from '../components/Media/Media';
import Comments from '../components/Media/Comments';

import Spinner from "../components/Spinner.js";


function TableList() {
  const [show, setModal] = useState(false);
  const params = useParams();

  const handleClose = ()=>{setModal(false);}

  return (
    <>
      <Container fluid className="media-info">

        <Row>

          <Col md="12">
            <Card className="shadow strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4"> <Skeleton width={180}  /> </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0 position-relative pb-3">

              <Row className="m-auto">
                <Col xs="12" sm="6" className="vid-col p-0 mr-5">
                  <div className="shadow mb-3 media-item" style={{height: '200px'}}>
                    {isLoading
                      ? <Skeleton height={200} />
                      : <Media media={media} />
                    }
                  </div>

                  <div className="action-btns">
                    <Button size="sm"> <i className="fa fa-plus"> </i> Generate Link </Button>
                    <Button variant="danger" size="sm"> <i className="fa fa-trash"> </i> Delete </Button>                    
                  </div>
                </Col>

                <Col xs="12" sm="5" className="info-col p-0">
                  {/* <p className="text-secondary"> Comments </p> */}
                  <div className="comments">
                    <Comments id={media?.id} />
                  </div>
                </Col>
              </Row>

              </Card.Body>
            </Card>
          </Col>
 
        </Row>
      </Container>
    </>
  );
}

export default TableList;
