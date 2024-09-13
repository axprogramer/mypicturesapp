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
import Swal from 'sweetalert2';

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
import CIcon from "@coreui/icons-react";
import { cilDelete, cilTrash } from "@coreui/icons";


function GallaryPage() {
  const db = getDatabase();

  const [dataDB, setdataDB] = useState([]);
  const [checkData, setcheckData] = useState([])
  const btnClick = useRef(null)
  const [filesView, setFilesView] = useState('');
  const [saveFolder, setsaveFolder] = useState(localStorage.getItem('alabum_name_show') || 'default');

  const dbFolder = ref(db, `/Photo/`);
  const dbPhoto = ref(db, `/Photo/` + saveFolder);
  useEffect(() => {
    onValue(dbFolder, (data) => {
      const dataSet = data.val()
      setdataDB(dataSet || []); // Convert object to array
      // setdataDB(dataSet ? Object.values(dataSet) : []); // Convert object to array
    })
    onValue(dbPhoto, (data) => {
      const dataSet = data.val()
      setFilesView(dataSet ? Object.values(dataSet) : []); // Convert object to array

    })
  }, [])

  useEffect(() => {
    localStorage.setItem('alabum_name_show', saveFolder);
    setsaveFolder(localStorage.getItem('alabum_name_show') || 'default')
  }, [saveFolder]);

  // const handleCheckboxChange = (itemId, e) => {
  //   setSelectedItems(prevItems =>
  //     prevItems.includes(itemId)
  //       ? prevItems.filter(item => item !== itemId)
  //       : [...prevItems, itemId]
  //   );
  // };


  const LoadFolderName = () => {
    function getTopLevelCategories(dataDB) {
      const categories = [];
      for (const category in dataDB) {
        if (dataDB.hasOwnProperty(category)) {
          categories.push(category);
        }
      }
      return categories;
    }

    // Get the top-level categories
    const topLevelCategories = getTopLevelCategories(dataDB);
    const handleChange = (event) => {
      let data = event.target.value
      localStorage.setItem('alabum_name_show', data)
      window.location.reload()
    };

    return (
      <>
        <div className="input-group mb-3">
          <span className="input-group-text btn-success btn" id="basic-addon1">Your Folder</span>
          <select className="form-select text-center"
            onChange={handleChange}
            value={saveFolder}
          >
            {topLevelCategories.map((d, index) => {
              return (
                <>
                  <option key={index} value={d}>{d}</option>
                </>
              )
            })}
          </select>

        </div>
      </>
    )
  }
  const DeletePic = (e) => {
    const id = e.target.dataset.id
    const name = e.target.dataset.name
    const url = e.target.dataset.url
    const format = e.target.dataset.format
    const folder = e.target.dataset.folder
    try {
      Swal.fire({
        title: `Do you want to delete "${id}"?`,
        showCancelButton: true,
        confirmButtonText: "YES",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text: "Delete Successfull!",
            icon: "success",
            showConfirmButton: false,
            timer: 2200,
          });
          if (id) {
            remove(ref(db, `Photo/` + `${saveFolder}/` + id));
          }

        }
      });

    } catch (error) {
      console.log(error);

    }
  }

  // const HandleCheck = () => {
  //   const usersObject = selectedItems.reduce((acc, user) => {
  //     acc[user.id] = {
  //       id: user.id,
  //       name: user.name,
  //       url: user.url,
  //       folder: user.folder,
  //       format: user.format

  //     };
  //     return acc;
  //   }, {});
  //   if (usersObject) {
  //     remove(ref(db, `Photo/${saveFolder}/${usersObject}`));
  //   }

  //   // try {
  //   //   Swal.fire({
  //   //     title: `Do you want to delete All?`,
  //   //     showCancelButton: true,
  //   //     confirmButtonText: "YES",
  //   //   }).then((result) => {
  //   //     if (result.isConfirmed) {
  //   //       Swal.fire({
  //   //         text: "Delete Successfull!",
  //   //         icon: "success",
  //   //         showConfirmButton: false,
  //   //         timer: 2200,
  //   //       });


  //   //     }
  //   //   });

  //   // } catch (error) {
  //   //   console.log(error);

  //   // }

  // };

  const ShowComponent = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (itemId, e) => {
      e.stopPropagation(); // Prevent modal dismissal
      setSelectedItems(prevItems =>
        prevItems.includes(itemId)
          ? prevItems.filter(item => item !== itemId)
          : [...prevItems, itemId]
      );
    };
    const usersObject = selectedItems.reduce((acc, user) => {
      acc[user.id] = {
        id: user.id,
        name: user.name,
        url: user.url,
        folder: user.folder,
        format: user.format

      };
      console.log(acc);
      
      return acc;
    }, {});
    const submit = () => {
      // if (usersObject) {
      //   remove(ref(db, `Photo/${saveFolder}/${usersObject}`));
      // }
      
    }
    console.log(usersObject);
    
    return (
      <div className="text-center mb-3">
        <Container>
          <Row>
            <Col>
              <LoadFolderName />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <DeleteAll /> */}
              <button
                onClick={submit}
                className="btn btn-danger btn-sm fw-bold">Delete Selected</button>

            </Col>
          </Row>
        </Container>
        <Container className="text-center mt-3">
          {filesView ? (
            <>
              <Row>
                {filesView.map((d, index) => {
                  return (
                    <>
                      <Col key={index}>
                        <Card style={{ textAlign: 'center' }}>
                          <div className="card-corner-top-container text-end">
                            <button
                              data-id={d.id}
                              data-name={d.name}
                              data-url={d.url}
                              data-format={d.format}
                              data-folder={d.folder}
                              onClick={DeletePic}
                              style={{ color: "white", height: "1rem", fontSize: "0.5rem" }}
                              className="btn btn-sm btn-danger"
                            >X</button>
                          </div>

                          <Card.Img key={index} variant="top" src={d.url} width={'100rem'} />
                          <Card.Body>
                            <Card.Title><Button
                              variant="warning"
                              size="sm"
                            >
                              {index + 1}
                            </Button> {d.name}</Card.Title>
                          </Card.Body>
                          <div className="card-corner-button-container">
                            <Row>
                              {/* <Col className="text-start">
                                <div className="form-check ms-2">
                                  <input
                                    data-id={d.id}
                                    data-name={d.name}
                                    data-url={d.url}
                                    data-format={d.format}
                                    data-folder={d.folder}
                                    onClick={(e) => handleCheckboxChange(d, e)}
                                    className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                </div>
                              </Col> */}
                              <Col>
                                <a
                                  target="_blank"
                                  className="btn btn-sm btn-outline-danger"
                                  href={d.url}>Link</a>
                              </Col>
                              <Col className="text-end">
                                <button
                                  className="btn btn-success btn-sm"
                                >
                                  {d.format}
                                </button>
                              </Col>
                            </Row>
                          </div>
                        </Card>

                      </Col>
                    </>
                  )
                })}
              </Row>

            </>
          ) : (
            <>
              <h5>Please, select your folder name to load the pictures!</h5>
            </>
          )}
        </Container>

      </div>
    );
  };


  return (
    <>
      <ShowComponent />

    </>
  )
}

export default GallaryPage;
