import React, { useEffect, useState, useRef } from "react";
import { cilHeart, cilStar, cilEnvelope, cilHome, cilCloudUpload, cilImage, cilSettings } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    Image,
    Button,
    Alert,
    ProgressBar,
    OverlayTrigger,
    Tooltip,
    CloseButton,
    FormCheck
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function HeaderPage() {

    return (
        <>
            <nav className="navbar navbar-warning bg-warning mb-3 justify-content-center">
                <div>
                    <h1 className="fw-bold text-center">Upload Images</h1>
                </div>
            </nav>
            <footer className="footer bg-dark text-light fixed-bottom">
                <Container>
                    <Row>
                        <Col className="btn btn-dark">
                            <CIcon className="me-2"
                                icon={cilHome}
                                style={{ width: '20px' }} /><Link to="/home"
                                style={{ color: 'white' }}    
                                className="text-decoration-none">Home</Link></Col>
                        <Col className="btn btn-dark">
                            <CIcon className="me-2"
                                icon={cilCloudUpload}
                                style={{ width: '20px' }} /><Link to="/upload"
                                style={{ color: 'white' }}
                                className="text-decoration-none">Upload</Link></Col>
                        <Col className="btn btn-dark">
                            <CIcon className="me-2"
                                icon={cilCloudUpload}
                                style={{ width: '20px' }} /><Link to="/gallary"
                                style={{ color: 'white' }}
                                className="text-decoration-none">Gallary</Link></Col>
                        <Col className="btn btn-dark">
                            <CIcon className="me-2"
                                icon={cilSettings}
                                style={{ width: '20px' }} />Setting</Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default HeaderPage;
