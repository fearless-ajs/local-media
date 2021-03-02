import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";

import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

import GenerateLinkModal from '../modals/GenerateLink';

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
import {fetcher} from '../helpers/fetcher';

import Media from '../components/Media/Media';
import Comments from '../components/Media/Comments';

import Spinner from "../components/Spinner.js";


function MediaInfo() {
  const [showLinkModal, setLinkModal] = useState(false);
  const params = useParams();

  let {data: media, error} = useSWR(`/api/media/${params.id}`, fetcher);
  let isLoading = !media & !error;

  if (media) {
    if (!media.success) {
      swal(msg || "Failed to load media", {
        closeOnClickOutside: false,
      });
    }
    media = media.data;
  }
  if (error || !media) {
    media = {};
  }

  const handleClose = ()=>{setLinkModal(false);}

  // delete file
  const onDelete = async ()=>{
    const delete_file = await swal("Delete file?");
    if (!delete_file) return;
    axios.delete(`/api/media/${params.id}`)
    .then(r => {
      swal("Media deleted", "success");
      window.history.back(-1); // go to previous page
    });
  }

  return (
    <>
      <Container fluid className="media-info">

        <GenerateLinkModal
          media_id={media.id}
          show={showLinkModal}
          onClose={()=>setLinkModal(false)}
        />

        <Row>
          <Col md="12">
            <Card className="shadow strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">
                  {isLoading
                    ? <Skeleton width={180} />
                    : media.name
                  }
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0 position-relative pb-3">

              <Row className="m-auto">
                <Col xs="12" sm="6" className="vid-col p-0 mr-4">
                  <div className="shadow mb-3 media-item" style={{height: '270px'}}>
                    {isLoading
                      ? <Skeleton height={200} />
                      : <Media media={media} />
                    }
                  </div>

                  {media.id && (
                    <div className="action-btns">
                      <Button size="sm" className="p-1" onClick={()=>setLinkModal(true)}> <i className="fa fa-plus"> </i> Generate Link </Button>
                      <Button variant="danger" size="sm" className="p-1" onClick={onDelete}> <i className="fa fa-trash"> </i> Delete </Button>
                      <Button variant="info" size="sm" className="p-1 float-right" href={`/storage/${media.path}`}> <i className="fa fa-download"> </i> Download </Button>
                    </div>
                  ) || ""}
                </Col>

                <Col xs="12" sm="5" className="info-col p-0">
                  <div className="comments" style={{overflowY: 'scroll', maxHeight: '400px'}}>
                    <Comments media={media} />
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

export default MediaInfo;
