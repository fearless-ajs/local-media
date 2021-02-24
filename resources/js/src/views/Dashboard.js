import React from "react";
import ChartistGraph from "react-chartist";
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


import {toHumanString} from 'human-readable-numbers';

function Dashboard() {
  return (
    <>
      <Container fluid>
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
                      <p className="card-category">Total views</p>
                      <Card.Title as="h4">{toHumanString(159181945)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
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
                      <p className="card-category">Total Shares</p>
                      <Card.Title as="h4">{toHumanString(34919)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
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
                      <p className="card-category">Total Comments</p>
                      <Card.Title as="h4">{toHumanString(159)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
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
                      <p className="card-category">Total Likes</p>
                      <Card.Title as="h4">{toHumanString(15918)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col md="8">
            <Card className="shadow">
              <Card.Header>
                <Card.Title as="h4">Performance This Year</Card.Title>
                <p className="card-category"> {new Date().getFullYear()} </p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
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
              </Card.Body>
              <Card.Footer>
{/*                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
*/}              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card className="shadow">
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category mb-0">Last Media Performance</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <span title="Users that open the media"> <i className="fas fa-circle text-info"></i> Open </span>
                  <i className="fas fa-circle text-danger"></i> Bounce
                  <i className="fas fa-circle text-warning"></i> Engage
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="shadow">
              <Card.Header>
                <Card.Title as="h4">Top 10 Distribuitors </Card.Title>
{/*                <p className="card-category">All products including Taxes</p>
*/}              </Card.Header>
              <Card.Body>
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
                        [
                          542,
                          443,
                          320,
                          780,
                          553,
                          453,
                          326,
                          434,
                        ],
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
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
