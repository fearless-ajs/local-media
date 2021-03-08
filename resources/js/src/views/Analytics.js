import React, {useState, useEffect} from "react";
import ChartistGraph from "react-chartist";
import { toHumanString as _toHumanString } from "human-readable-numbers";
import swal from "sweetalert";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
} from "react-bootstrap";

import useSWR, {mutate} from 'swr';

import Spinner from '../components/Spinner';
import {fetcher} from '../helpers/fetcher';

// 
import MediaDropdown from '../components/MediaDropdown/MediaDropdown.js';

// handle null values
window.toHumanString = (v)=> !v ? "0" :_toHumanString(v)


// views, likes, shares, comments
// 
function TotalStats({id}) {
    let {data, error} = useSWR(`/api/media/${id}`, fetcher);
    let isLoading = !data && !error;

    if (data) {
        data = data.data;
    }
    if (error || !data) {
        data = {views: "0", shares: "0", comments: "0", likes: "0"};
    }

    const metrics = [
        ['Views', 'fas fa-eye text-warning'],
        ['Shares', 'fas fa-share text-success'],
        ['Comments', 'fas fa-comments text-info'],
        ['Likes', 'fas fa-heart text-danger'],
    ];
    return (
        <Row>
            {metrics.map(v => (
                <Col lg="3" sm="6" key={v[0]}>
                    <Card className="shadow card-stats">
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className={v[1]}></i>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">{v[0]}</p>
                                        <Card.Title as="h4">
                                            {isLoading
                                                ? <Spinner type='list'/>
                                                : (data && toHumanString(data[v[0].toLowerCase()]))
                                            }
                                        </Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}


// distributors
function Distributors({id}) {
    let {data, error} = useSWR(`/api/media/${id}/distributors`, fetcher);
    let isLoading = !data && !error;

    if (data) {
        data = data.data;
    }
    if (error || !data) data = {}

    return (
        <>
            <p className="h4"> Distributors (Views count) </p>
            <div className="ct-chart" id="chartActivity">
                <ChartistGraph
                    data={{
                        labels: Object.keys(data),
                        series: [Object.values(data)],
                    }}
                    type="Bar"
                    options={{
                        stackBars: true,
                        seriesBarDistance: 30,
                        axisX: {
                            showGrid: false,
                        },
                        height: "245px",
                    }}
                    responsiveOptions={[
                        [
                            "screen and (max-width: 640px)",
                            {
                                seriesBarDistance: 5,
                                axisX: {
                                    labelInterpolationFnc: function (
                                        value
                                    ) {
                                        return value[0];
                                    },
                                },
                            },
                        ],
                    ]}
                />
            </div>
        </>
    );
}


function Analytics() {
    const [videoID, setVideoID] = useState(-1);
    const [isUpdatingStat, setUpdatingStat] = useState(false);

    // get latest media id, 
    useEffect(() => {
        axios.get('/api/media/all')
        .then(r => {
            const {data} = r.data;
            if (data instanceof Array && data.length) {
                setVideoID(data[0].id);
            }
        })
    }, [1])

    const onExport = () => {
        swal("Export Data as CSV").then((l) => {
            if (l) {
                window.location = `/api/media/${videoID}/export`;
            }
        });
    };

    const updateStats = (id)=>{
        setUpdatingStat(true);

        // update data asynchronously
        Promise
        .all([mutate(`/api/media/${id}/distributors`), mutate(`/api/media/${id}`)])
        .then(() => {
            setUpdatingStat(false);
        })
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4"> Analytics </Card.Title>
                            </Card.Header>

                            <Card.Body>
                                <Row>
                                    <Col>
                                        <div className="media-select">
                                            <p className="text-secondary mb-0">
                                                Select Media to load Analytics
                                            </p>
                                            <MediaDropdown
                                                videoID={videoID}
                                                onChange={(id) => {
                                                    setVideoID(id)
                                                }}
                                            />
                                        </div>
                                        <hr />

                                        <div className="stats">
                                            <div className="mb-3">
                                                <TotalStats id={videoID} />
                                            </div>
                                            <div className="">
                                                <Distributors id={videoID} />
                                            </div>
                                            <button className="btn btn-info" onClick={() => updateStats(videoID)}>
                                                <i className={`fas fa-redo ${isUpdatingStat && 'fa-spin'} mr-1`}></i>
                                                Update stats
                                            </button>
                                            <button onClick={onExport} className="btn btn-primary float-right">
                                                <i className='fas fa-file-export mr-1'></i>
                                                Export
                                            </button>
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

export default Analytics;
