import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import Dropzone from 'react-dropzone';
import debounce from 'lodash/debounce'
import { Link } from 'react-router-dom';
// import { Cloudinary } from 'cloudinary-core';
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
import UploadPage from "./UploadPage";
import HeaderPage from "./component/HeaderPage";
import AppContent from "./component/AppContent";
function DefaultPage() {

  return (
    <>
      <HeaderPage />
      <AppContent/>
    </>
  )
}

export default DefaultPage;
