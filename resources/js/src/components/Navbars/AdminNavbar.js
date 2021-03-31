import React, { useState, useRef, Component } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import swal from "sweetalert";
import Cookies from "js-cookie";

import routes from "../../routes.js";

function Header() {
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState("");

    const history = useHistory();
    const location = useLocation();

    //////////////////////////////////////////
    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        var node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Dashboard";
    };
    //////////////////////////////////////////

    /////////LOGOUT//////////////
    const Logout = (e) => {
        e.preventDefault();
        swal("Logout?").then((l) => {
            if (l) {
                Cookies.remove("AUTH_TOKEN");
                window.location.reload();
            }
        });
    };
    /////////////////////////////

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    <Button
                        variant="dark"
                        className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        onClick={mobileSidebarToggle}
                    >
                        <i className="fas fa-ellipsis-v"></i>
                    </Button>
                    <Navbar.Brand
                        href="#home"
                        onClick={(e) => e.preventDefault()}
                        className="mr-2"
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="mr-2"
                >
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav mr-auto" navbar>
                        <Nav.Item>
                            <Nav.Link
                                data-toggle="dropdown"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                className="m-0"
                            >
                                <span className="d-lg-none ml-1">
                                    Dashboard
                                </span>
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                onClick={() => setSearching(true)}
                            >
                                {searching ? (
                                    <form onSubmit={(e)=>{
                                        e.preventDefault()
                                        history.push(`/media/all?q=${query}`)
                                    }}>
                                        <input
                                            type="text"
                                            value={query}
                                            className="form-control"
                                            ref={(input) => input && input.focus()}
                                            placeholder="Enter search keyword"
                                            onBlur={() => setSearching(false)}
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                        />
                                    </form>
                                ) : (
                                    <>
                                        <i className="nc-icon nc-zoom-split"></i>
                                        <span className="d-lg-block">
                                             Search
                                        </span>
                                    </>
                                )}
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Nav className="ml-auto" navbar>
                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                href="#pablo"
                                onClick={Logout}
                            >
                                <span className="no-icon">Log out</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
