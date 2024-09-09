import React, { useEffect, useState, useRef } from "react";
import firebase from "./component/firebaseConfig";
import { getDatabase, ref, set, update, remove, push, onValue } from "firebase/database";
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import Dropzone from 'react-dropzone';
import debounce from 'lodash/debounce'
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


function HomePage() {


  return (
    <>
      <div className="card">
        <img src="https://media1.tenor.com/m/PbKIy92OvjYAAAAC/imagelol.gif" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Welcome</h5>
          <p className="card-text">You can select multiple pictures/pdfs/vdeos</p>
          <p className="card-text">Enjoy you upload!</p>
          </div>
      </div>
    </>
  )
}

export default HomePage;
