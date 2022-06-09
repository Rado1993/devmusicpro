import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavMenu from './NavMenu';
import SideNavigation from './SideNavigation/SideNavigation';
import '../custom.css'

let pathName = window.location.pathname;
export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        {pathName != "/" ?
        <Container fluid>
        <Row xs="12" className="row-fluid">
                <Col className={"navmenumargen"}>
                    <NavMenu />
                </Col>
            </Row>
            <Row>
                <Col xs="1" sm="1">
                    <SideNavigation />
                </Col>
                <Col xs="10" sm="10" className="margenTop">
                    {props.children}
                </Col>
            </Row>
        </Container>
        :
        <React.Fragment>
        {/* <NavMenu/> */}
        <Container>
            {props.children}
        </Container>
        </React.Fragment>
        }
    </React.Fragment>
);
