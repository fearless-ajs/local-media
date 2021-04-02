import React, {useState, useRef} from "react";
import {Modal, Button, Row, Col} from 'react-bootstrap';
  
import useSWR from 'swr';

import swal from "sweetalert";

import {fetcher} from '../helpers/fetcher';
import Spinner from '../components/Spinner.js';

import "../assets/scss/views/GenerateLinkModal.scss";

function GenerateLinkModal({show, media_id, onClose}) {
    let {data: users, error} = useSWR('/api/users', fetcher);
    const isLoading = !error && !users;
    // 
    const [filter, setFilter] = useState("");

    if (users) users = users.data;
    if (error || !users) users = []

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Distributors special links</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="border-bottom mb-3">
                <input
                    type="search"
                    value={filter}
                    className="form-control mt-0"
                    placeholder="Search..."
                    onChange={e=>setFilter(e.target.value)}
                />
            </div>

            {isLoading
                ? <Spinner type='page' />
                : <Users filter={filter} media_id={media_id} data={users || []} />
            }
        </Modal.Body>
        <Modal.Footer style={{width: '100%'}}>
        </Modal.Footer>
      </Modal>
    );
}

function Users({data, filter, media_id}) {

    if (filter.length) {
        data = data.filter(({name}) => {
            return name.match(new RegExp(filter, "i"));
        })
    }

    if (!data.length) {
        return <p> No distributors found </p>
    }

    return data.map(u => (
        <Row className="mb-3" key={u.id}>
            <Col md="4"><p> {u.name} </p></Col>
            <Col>
                <span className="btn btn-link border border-info p-1 rounded d-block">
                    <a target="_blank" href={getUserMediaURL(media_id, u.id)} className="text-success d-block">
                        {getUserMediaURL(media_id, u.id)}
                    </a>
                </span>
            </Col>
        </Row>
    ))
}


/**
 * Given a media_id and user_id, return the unique
 * url for that media
 *
 * @param   {number}  media_id  [media id]
 * @param   {number}  user_id   [user id]
 *
 * @return  {string}            media URL
 */
function getUserMediaURL(media_id, user_id) {
    const scheme = location.protocol,
        {host} = location,
        subdir = "media-distributor/public",
        path = `${subdir}/media/${media_id}/${user_id}`;

    return `${scheme}//${host}/${path}`;
}


export default GenerateLinkModal;
