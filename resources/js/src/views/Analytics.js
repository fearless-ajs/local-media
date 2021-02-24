import React from "react";
import ChartistGraph from "react-chartist";

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

import swal from 'sweetalert';
import { toHumanString } from "human-readable-numbers";

function Icons() {

  const onExport = ()=>{
    swal("Export Data", {
      buttons: ["Image", "CSV"],
    });
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
                        Select Media to load Analytics{" "}
                      </p>
                      <select name="" id="" className="form-control w-50">
                        <option value="element"> Video 1 </option>
                        <option value="element"> Video 3 </option>
                        <option value="element"> Video 5 </option>
                        <option value="element"> Video 7 </option>
                        <option value="element"> Video 9 </option>
                      </select>
                    </div>
                    <hr />

                    <div className="stats">
                      <div className="mb-3">
                        <Row>
                          <Col lg="3" sm="6">
                            <Card className="shadow card-stats">
                              <Card.Body>
                                <Row>
                                  <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                      <i className="fas fa-eye text-warning"></i>
                                    </div>
                                  </Col>
                                  <Col xs="7">
                                    <div className="numbers">
                                      <p className="card-category">Views</p>
                                      <Card.Title as="h4">
                                        {toHumanString(159181945)}
                                      </Card.Title>
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>

                          <Col lg="3" sm="6">
                            <Card className="shadow card-stats">
                              <Card.Body>
                                <Row>
                                  <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                      <i className="fas fa-share text-success"></i>
                                    </div>
                                  </Col>
                                  <Col xs="7">
                                    <div className="numbers">
                                      <p className="card-category">Shares</p>
                                      <Card.Title as="h4">
                                        {toHumanString(34919)}
                                      </Card.Title>
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>

                          <Col lg="3" sm="6">
                            <Card className="shadow card-stats">
                              <Card.Body>
                                <Row>
                                  <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                      <i className="fas fa-comments text-info"></i>
                                    </div>
                                  </Col>
                                  <Col xs="7">
                                    <div className="numbers">
                                      <p className="card-category">Comments</p>
                                      <Card.Title as="h4">
                                        {toHumanString(159)}
                                      </Card.Title>
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>

                          <Col lg="3" sm="6">
                            <Card className="shadow card-stats">
                              <Card.Body>
                                <Row>
                                  <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                      <i className="fa fa-heart text-danger"></i>
                                    </div>
                                  </Col>
                                  <Col xs="7">
                                    <div className="numbers">
                                      <p className="card-category">Likes</p>
                                      <Card.Title as="h4">
                                        {toHumanString(15918)}
                                      </Card.Title>
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                      <div className="">
                        <p className="h4"> Distributors (Views count) </p>
                        <div className="ct-chart" id="chartActivity">
                          <ChartistGraph
                            data={{
                              labels: [
                                "John1",
                                "John1",
                                "John1",
                                "John1",
                                "John1",
                                "John1",
                                "345 ABC DEF",
                                "John1",
                              ],
                              series: [
                                [542, 443, 320, 780, 553, 453, 326, 434],
                              ],
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
                                    labelInterpolationFnc: function (value) {
                                      return value[0];
                                    },
                                  },
                                },
                              ],
                            ]}
                          />
                        </div>
                      </div>
                      <button className="btn btn-info">
                        <i className="fas fa-redo mr-1"></i> Update stats
                      </button>
                      <button onClick={onExport} className="btn btn-info float-right">
                        <i className="fas fa-file-export mr-1"></i> Export
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

export default Icons;
