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


function UploadPage() {
  const db = getDatabase();

  const [files, setFiles] = useState([]);
  const [dataDB, setdataDB] = useState([]);
  const [storeFolderName, setstoreFolderName] = useState([]);
  const [filesView, setFilesView] = useState('');
  const [percent, setpercent] = useState('');
  const [saveFolder, setsaveFolder] = useState(localStorage.getItem('alabum_name') || 'default');
  const [completeAct, setcompleteAct] = useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false); // State for tooltip visibility
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);

  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/mydbdrive/image/upload';
  const uploadPreset = 'data_upload';

  const dbFolder = ref(db, `/Photo/`);
  useEffect(() => {
    onValue(dbFolder, (data) => {
      const dataSet = data.val()
      setdataDB(dataSet || []); // Convert object to array
      // setdataDB(dataSet ? Object.values(dataSet) : []); // Convert object to array
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('alabum_name', saveFolder);
    setsaveFolder(localStorage.getItem('alabum_name') || 'default')
  }, [saveFolder]);

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
      localStorage.setItem('alabum_name', data)
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

  const UploadComponent = () => {

    const handleDrop = acceptedFiles => {
      setFiles(acceptedFiles);
      acceptedFiles.map((file) => {
        const reader = new FileReader();
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        reader.onload = (e) => {
          setFilesView((prevImages) => [...prevImages, { name: file.name, url: e.target.result, exten: fileExtension }]);
        };
        reader.readAsDataURL(file);

        return file;
      })
    };
    const handleUpload = async () => {
      if (files.length === 0) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2500);
        return; // Exit early if no files to upload
      }

      try {
        const uploadPromises = [];
        const uploadedImageUrls = []; // Array to store secure_urls

        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', uploadPreset);

          formData.append('folder',
            saveFolder);

          const onUploadProgress = (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Uploading ${file.name}: ${percentCompleted}%`);
            setpercent(percentCompleted);
          };

          uploadPromises.push(
            axios.post(cloudinaryUrl, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress,
            })
          );
        }

        const uploadResults = await Promise.all(uploadPromises);

        // Extract secure_urls from uploadResults
        uploadResults.map((d, index) => {
          let id = d.data.original_filename
          let name = d.data.original_filename
          let folder = d.data.asset_folder
          let format = d.data.format
          let url = d.data.secure_url
          let arr = {}
          arr[`id`] = id
          arr[`name`] = name
          arr[`folder`] = folder
          arr[`format`] = format
          arr[`url`] = url
          if (id) {
            update(ref(db, `Photo/` + `${saveFolder}/` + id), ({
              id: id,
              name: name,
              folder: folder,
              format: format,
              url: url
            }));
          }
          uploadResults.map((d, index) => {
            setcompleteAct(true)
            setFiles('')
            setFilesView('')
            setTimeout(() => {
              setpercent('')
              setcompleteAct(false)
            }, 1500);
          })

        })

      } catch (error) {
        console.error('Error uploading files:', error);
      }
    };
    const handleUpload2 = async () => {
      if (files.length === 0) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 2500);
      } else {
        try {
          const uploadPromises = [];
          for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);
            formData.append('folder', saveFolder);

            const onUploadProgress = (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log(`Uploading ${file.name}: ${percentCompleted}%`);
              setpercent(percentCompleted);
            };

            uploadPromises.push(axios.post(cloudinaryUrl, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress,
            }));

          }

          const uploadedImageUrls = await Promise.all(uploadPromises)

          uploadedImageUrls.map((d, index) => {
            setcompleteAct(true)
            setFiles('')
            setFilesView('')
            setTimeout(() => {
              setpercent('')
              setcompleteAct(false)
            }, 1500);
          })

        } catch (error) {
          console.error('Error uploading files:', error);
        }

      }
    };
    function AlabumName() {
      const [inputValue, setInputValue] = useState('');

      const handleChange = (event) => {
        let data = event.target.value
        localStorage.setItem('alabum_name', data)
      };
      const Submit = () => {
        window.location.reload()
      }

      return (
        <div>
          <div className="input-group mb-3">
            <button onClick={Submit} className="input-group-text btn-info btn" id="basic-addon1">Set</button>
            <input
              onChange={handleChange}
              type="text" className="form-control" placeholder="Alabum Name" aria-label="Alabum Name" aria-describedby="basic-addon1" />
          </div>

        </div>
      );
    }

    return (
      <div className="text-center">
        <Container>
          <Row>
            <Col>
              <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    <input {...getInputProps()} />
                    {/* <h1 className="fw-bold mt-3 mb-5">Upload Images</h1> */}
                    <Button className="btn btn-primary btn-sm mb-4 me-3">Select Images</Button>

                  </div>
                )}
              </Dropzone>
            </Col>
          </Row>
          <Col>
            <AlabumName />
            <LoadFolderName />

            <p>Your files will save to ({saveFolder})</p>
          </Col>
          <Button className="btn btn-warning btn-sm text-center mb-4" onClick={handleUpload}>Upload (<span className="fw-bold">{filesView.length} images</span>)</Button>
          {percent ? <ProgressBar variant="success" className="mb-3" now={percent} /> : ''}
          {completeAct && <p>Completed Uploaded!</p>}
          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              <Alert.Heading>Please, select images first!</Alert.Heading>
            </Alert>
          )}

        </Container>
        <Container>
          {filesView ? (
            <>
              <Row>
                {filesView.map((d, index) => {
                  return (
                    <>
                      <Col key={index}>
                        <Card style={{ textAlign: 'center' }}>
                          <Card.Img key={index} variant="top" src={d.url} width={'100rem'} />
                          <Card.Body>
                            <Card.Title><Button
                              variant="warning"
                              size="sm"
                            >
                              {index + 1}
                            </Button> {d.name}</Card.Title>
                          </Card.Body>
                          <div className="card-corner-button-container text-end">
                            <Button
                              variant="success"
                              size="sm"
                            >
                              {d.exten}
                            </Button>
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
              <h4>Please, select new images!</h4>
            </>
          )}
        </Container>
      </div>
    );
  };


  return (
    <>
      <UploadComponent />

    </>
  )
}

export default UploadPage;
