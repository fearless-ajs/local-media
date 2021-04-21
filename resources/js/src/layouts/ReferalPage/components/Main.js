import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import { getMediaObject, postComment, recordMediaStat, getComments, getLatestPdf, addUserToDB } from '../helpers/Helper';
import Comments from './Comments';
import swal from '@sweetalert/with-react';
import { toHumanString } from 'human-readable-numbers'
import { formatDistanceToNow } from 'date-fns'
import { Carousel } from 'react-responsive-carousel';
import Share from './Share';
import Modals from './Modals';


const pdf_icon = "https://loveworldbooks.com/media-distributor/public/images/pdf.svg";


const MediaComponent = ({data, recordPlay})=> {
    if (data?.type == "pdf") {
        return <img src={pdf_icon} height="250px" className="ml-auto" />
    }

    return <ReactPlayer
        className='justify-content-md-center'
        onPlay={recordPlay}
        width='100%'
        height='50vh'
        controls={true}
        url={`https://loveworldbooks.com/media-distributor/public/storage/${data?.path}`}
    />
}


const Main = ({ match, }) => {
    const [like, setLike] = useState(false)
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [data, setData] = useState({})
    const [played, setPlayed] = useState(false)
    const [share, setShare] = useState(false)
    const [pdf, setPdf] = useState({})
    // 
    const [likesCount, setLikesCount] = useState(0)

    const { media_id, user_id } = match.params

    const userDetails = JSON.parse(localStorage.getItem('userDetails') || "{}")
    const nameFromState = userDetails.name
    const emailFromState = userDetails.email

    useEffect(() => {
        if (!nameFromState || !emailFromState) {
            setShow(true)
        }

        setName(nameFromState)
        setEmail(emailFromState)

        const liked = localStorage.getItem(`likes:${media_id}`) === 'true';
        if (liked) {
            setLike(true);
        }

        getMediaObject(media_id, user_id)
            .then((d) => {
                const media_title = d?.name || document.title;
                setData(d)
                setLikesCount(d.likes)
                document.title = media_title;
            })
            .catch(({ message }) => swal("Error", message, 'error'));

        getComments(media_id)
            .then((comments) => setComments(comments))
            .catch((error) => console.error(error));

        getLatestPdf()
            .then((pdf) => setPdf(pdf))
            .catch((error) => console.error(error))

        window.addEventListener('unload', onUserLeave)
        return () => {
            window.removeEventListener('unload', onUserLeave)
        }
    }, [media_id, nameFromState, user_id])


    const onUserLeave = () => {
        !played && recordMediaStat(media_id, 'bounce')
    }

    const handleIcon = () => {
        const liked = localStorage.getItem(`likes:${media_id}`) === 'true';
        if (liked) return;
        setLike(true);
        setLikesCount(likesCount + 1);
        localStorage.setItem(`likes:${media_id}`, 'true');
        recordMediaStat(media_id, 'like')
    }

    const handleClose = (e) => {
        e.preventDefault()
        localStorage.setItem('userDetails', JSON.stringify({ name, email }))
        addUserToDB(name, email);
        setShow(false)
    }

    const submitComment = (e) => {
        e.preventDefault()
        postComment(media_id, {
            name,
            email,
            comment,
        })
        setComments([{ name, message: comment, created_at: new Date() }, ...comments])
        setComment('')
    }

    const handleDownload = () => {
        if (!data?.id) return swal("Media not loaded");
        // window.location.href = `/storage/${data?.path}`
        // window.location.href = `https://loveworldbooks.com/media-distributor/public/storage/${data?.path}`
        window.location.href = `https://loveworldbooks.com/media-distributor/public/api/send_link?path=${data?.path}&email=${email}&media_name=${data.name}`;
    }

    const recordPlay = () => {
        recordMediaStat(media_id, 'open')
        setPlayed(true)
    }

    return (
        <Container fluid className='main'>
            <Modals
                show={show}
                handleClose={handleClose}
                name={name} email={email}
                setEmail={setEmail}
                setName={setName}
            />

            <Share setShare={setShare} share={share} />

            <div className="row justify-content-md-center">
                <div className="divv col-12 col-md-8 col-lg-8 col-xl-6 col-sm-12 m-auto px-3">
                    <Row>
                        <Col md={12} className='video text-center'>
                            <MediaComponent data={data} recordPlay={recordPlay} />
                            {/*<ReactPlayer
                                className='justify-content-md-center'
                                onPlay={recordPlay}
                                width='100%'
                                height='50vh'
                                controls={true}
                                url={`https://loveworldbooks.com/media-distributor/public/storage/${data?.path}`}
                            />*/}
                        </Col>
                    </Row>

                    <Row className='my-2'>
                        <Col>
                            <h2>{data?.name}</h2>

                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}><p className='text-muted two my-2 text-sm'>{formatDistanceToNow(new Date())}</p></Col>
                        <Col className='icons my-2' md={7}>
                            <div className='icon'>
                                <VisibilityIcon style={{ "cursor": "pointer", }} /> <span>{toHumanString(data?.views|0)}</span>
                            </div>
                            <div className='icon'>
                                <span onClick={handleIcon}>
                                    <ThumbUpAltIcon style={{ "cursor": "pointer", color: like ? "blue" : '' }} /> <span>{toHumanString(likesCount)}</span>
                                </span>
                            </div>
                            <div className='icon'>
                                <span onClick={() => setShare(true)}>
                                    <ShareIcon style={{ "cursor": "pointer" }} /> <span>Share</span>
                                </span>
                            </div>
                            <div className='icon'>
                                <span onClick={handleDownload}>
                                    <GetAppIcon style={{ "cursor": "pointer" }} /> <span>Download</span>
                                </span>
                            </div>
                        </Col>
                    </Row>

                    <hr />

                    <Row className='my-4'>
                        <h4>Comments & Testimonies</h4>
                        <Col className='comment-field'>
                            <Col className='comments'>
                                <Form onSubmit={submitComment}>
                                    <Form.Group controlId='comment' className='input mr-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder='Post a comment'
                                            value={comment}
                                            className="p-2"
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="danger" className='button mt-1 p-1 text-light' type='submit'>
                                        Post
                                    </Button>
                                </Form>
                            </Col>
                            <div style={{ clear: "both" }}></div>
                            {/* <hr /> */}
                            <Col>
                                <Comments
                                    comments={comments}
                                />
                            </Col>
                        </Col>
                    </Row>

                    <hr />

                    <Row>

                        <Col md={12}>
                            <Card style={{width: "100%"}} className=' mx-auto my-3'>
                            <Carousel style={{width: "100%"}} showStatus={false} showThumbs={false}>
                                <div>
                                    <img src="https://loveworldbooks.com/media-distributor/public/images/1.jpeg" />
                                </div>
                                <div>
                                    <img src="https://loveworldbooks.com/media-distributor/public/images/2.jpeg" />
                                </div>
                                <div>
                                    <img src="https://loveworldbooks.com/media-distributor/public/images/3.jpeg" />
                                </div>
                                <div>
                                    <img src="https://loveworldbooks.com/media-distributor/public/images/4.jpeg" />
                                </div>
                                <div>
                                    <img src="https://loveworldbooks.com/media-distributor/public/images/5.jpeg" />
                                </div>
                            </Carousel>
                            {/*<Card.Footer className="pb-4">
                            </Card.Footer>*/}
                            </Card>
                        </Col>
                    </Row>

                    <hr />
                </div>
            </div>
        </Container>
    )
}

export default Main
