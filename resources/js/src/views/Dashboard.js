import React from "react";

import ChartistGraph from "react-chartist";
import useSWR from 'swr';
import { toHumanString } from "human-readable-numbers";

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
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

import Spinner from '../components/Spinner';
import {fetcher} from '../helpers/fetcher';

import "../assets/scss/views/Dashboard.scss";



// likes, shares, comments, views
//
function TotalStats(argument) {
    let {data, error, mutate} = useSWR('/api/analytics/stats', fetcher);
    let isLoading = !data & !error;

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
                                        <p className="card-category">Total {v[0]}</p>
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
                        <Card.Footer>
                            <hr></hr>
                            <div className="stats" onClick={()=>mutate()}>
                                <i className="fas fa-redo mr-1"></i>
                                Update Now
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}


// open, bunce, engage pie chart
//
function UserBehaviour() {
    let {data, error, mutate} = useSWR('/api/analytics/behaviours', fetcher);
    let isLoading = !data & !error;

    if (data) {
        data = data.data;
        if (data) {
            const sum = (+data.user_open) + (+data.user_bounce) + (+data.user_engage);
            if (sum) {
                data.user_open = (+data.user_open / sum) * 100;
                data.user_bounce = (+data.user_bounce / sum) * 100;
                data.user_engage = (+data.user_engage / sum) * 100;
            }
        }
    }
    if (error || !data) {
        data = {user_bounce: 0, user_engage: 0, user_open: 0};
    }

    return (
        <Col md="4">
            <Card className="shadow cursor-pointer" onClick={()=>mutate()}>
                <Card.Header>
                    <Card.Title as="h4">Users Behaviour</Card.Title>
                    <p className="card-category mb-0">
                        Last Media Performance
                    </p>
                </Card.Header>
                <Card.Body>
                    <div
                        className="ct-chart ct-perfect-fourth"
                        id="chartPreferences"
                    >
                        {isLoading
                            ? <Spinner type='list' />
                            : (
                                <ChartistGraph
                                    data={{
                                        labels: [`${data.user_open}%`, `${data.user_bounce}%`, `${data.user_engage}%`],
                                        series: [data.user_open, data.user_bounce, data.user_engage],
                                    }}
                                    type="Pie"
                                />
                            )
                        }
                    </div>
                    <div className="legend">
                        <span title="Users that open the media">
                            <i className="fas fa-circle text-info"></i> Open
                        </span>
                        <i className="fas fa-circle text-danger"></i> Bounce
                        <i className="fas fa-circle text-warning"></i> Engage
                    </div>
                </Card.Body>
            </Card>
        </Col>

    );
}



// last media performance
//
function Performance(argument) {
    let {data, error, mutate} = useSWR('/api/analytics/performance', fetcher);
    let isLoading = !data & !error;

    if (data) {
        data = data.data;
    }
    if (error || !data) {
        data = {"12AM-3AM": 0,"3AM-6AM": 0,"6AM-9AM": 0,"9AM-12PM": 0,"12PM-3PM": 0,"3PM-6PM": 0,"6PM-9PM": 0,"9PM-12AM": 0}
    }

    return (
        <Col md="8">
            <Card className="shadow cursor-pointer" onClick={()=>mutate()}>
                <Card.Header>
                    <Card.Title as="h4"> Performance </Card.Title>
                    <p className="card-category"> (Last Media) </p>
                </Card.Header>
                <Card.Body>
                    <div className="ct-chart" id="chartHours">
                        {isLoading
                            ? <Spinner type='list' />
                            : (
                                <ChartistGraph
                                    data={{
                                        labels: Object.keys(data),
                                        series: [Object.values(data)],
                                    }}
                                    type="Line"
                                    options={{
                                        low: 0,
                                        high: Math.max(Object.values(data)) * 2,
                                        height: "245px",
                                        chartPadding: {
                                            right: 50,
                                        },
                                    }}
                                    responsiveOptions={[
                                        [
                                            "screen and (max-width: 640px)",
                                            {
                                                axisX: { labelInterpolationFnc: value => value[0], },
                                            },
                                        ],
                                    ]}
                                />
                            )
                        }
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}


// top 10 Distribuitors
//
function TopDistributors(argument) {
    let {data, error, mutate} = useSWR('/api/analytics/distributors', fetcher);
    let isLoading = !data & !error;

    if (data) {
        data = data.data;
    }
    if (error || !data) data = {}

    return (
        <Col md="8">
            <Card className="shadow cursor-pointer" onClick={()=>mutate()}>
                <Card.Header>
                    <Card.Title as="h4">
                        Top 10 Distribuitors
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="ct-chart" id="chartActivity">
                        {isLoading
                            ? <Spinner type='list' />
                            : (
                                <ChartistGraph
                                    data={{
                                        labels: Object.keys(data),
                                        series: [Object.values(data)],
                                    }}
                                    type="Bar"
                                    options={{
                                        stackBars: true,
                                        seriesBarDistance: 30,
                                        axisX: {showGrid: false, },
                                        height: "245px",
                                    }}
                                    responsiveOptions={[
                                        [
                                            "screen and (max-width: 640px)",
                                            {
                                                seriesBarDistance: 5,
                                                axisX: { labelInterpolationFnc: value => value[0] },
                                            },
                                        ],
                                    ]}
                                />
                            )
                        }
                    </div>
                </Card.Body>
            </Card>
        </Col>

    );
}


function Dashboard() {

    return (
        <>
            <Container fluid>
                <TotalStats />

                <Row>
                    <Performance />
                    <UserBehaviour />
                </Row>

                <Row>
                    <TopDistributors />
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
