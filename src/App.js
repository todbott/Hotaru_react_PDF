import React, { useRef, useState, useEffect } from 'react';
import WebViewer from '@pdftron/pdfjs-express';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import './App.css';

import SettingsModal from './modals/SettingsModal';
import Translate from './services/Translator';



const App = () => {
  const viewer = useRef(document.getElementById("viewer"));
  const viewert = useRef(document.getElementById("viewert"));
  const second_viewer = useRef(null);
  const inputFile = useRef(document.getElementById("file"));
  const comparisonFile = useRef(document.getElementById("comparisonFile"));

  // Get from the SettingsModal
  const [apiKey, setApiKey] = useState("");
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("en");
  const [display, setDisplay] = useState("ja");

  // Get from App.js
  const [oneString, setOneString] = useState("");
  const [twoString, setTwoString] = useState("");

  const [showResultsModal, setShowResultsModal] = useState(false);

  // Send to ResultsModal
  const [oneResult, setOneResult] = useState("");
  const [twoResult, setTwoResult] = useState("");


  const onChangeValueHandler = (val) => {
    
    let whichVal = val.split(":")[0];
    let valToSet = val.split(":")[1];

    if (whichVal === "apiKey") {
      setApiKey(valToSet);
    }
    if (whichVal === "sourceCode") {
      setSource(valToSet);
    }
    if (whichVal === "targetCode") {
      setTarget(valToSet);
    }
    if (whichVal === "displayCode") {
      setDisplay(valToSet);
    }
  }

function handleCloseResultsModal() {
  setShowResultsModal(false);
}

async function performTranslation() {
  let returned = await Translate(source, target, display, apiKey, oneString, twoString);
  console.log(returned);
  setOneResult(returned[0]);
  setTwoResult(returned[1]);
  setShowResultsModal(true);
}



  async function startWebViewer(f, e) {
    e.preventDefault();

    console.log("starting");
    try {
    let instance = await WebViewer(
      {
        path: '/webviewer/lib',
        disableFlattenedAnnotations: true,
        licenseKey: 'deDbF45aXA0hfSdH3pju'
      },
      viewer.current);
      console.log(instance);
    
      instance.loadDocument(f, { filename: f.name });
      const { docViewer } = instance;
      docViewer.on('documentLoaded', () => {
        console.log("doc was loaded");
        docViewer.on('textSelected', (q, selectedText, a) => {
          // quads will be an array of 'Quad' objects
          // text is the selected text as a string
          if (selectedText.length > 0) {
            setOneString(selectedText);
          }
        });
      });
    } catch (e) {
      console.log(e)
    }


    }
  

  async function startSecondWebViewer(f) {
    WebViewer(
      {
        path: '/webviewer/lib',
        disableFlattenedAnnotations: true,
        licenseKey: 'deDbF45aXA0hfSdH3pju'
      },
      second_viewer.current
    ).then((instance) => {
      instance.loadDocument(f, { filename: f.name });
      const { docViewer } = instance;
      docViewer.on('textSelected', (q, selectedText, a) => {
        // quads will be an array of 'Quad' objects
        // text is the selected text as a string
        if (selectedText.length > 0) {
          setTwoString(selectedText);
        }
      });
    });
  }
    

  return (

    
    <div className="App">

      
    <SettingsModal onChangeValue={onChangeValueHandler}></SettingsModal>
    <Modal show={showResultsModal} onClose={handleCloseResultsModal}>
            <Modal.Header closeButton onClick={handleCloseResultsModal}>
                <Modal.Title>??????</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row style={{ marginBottom: 5, fontWeight: 'bold'}}>
                <Col className="d-grid gap-2">    
                  PDF 1
                </Col>
                <Col className="d-grid gap-2">    
                  PDF 2
                </Col>
              </Row>
              <Row style={{ marginBottom: 25}}>
                <Col className="d-grid gap-2" style={{ borderColor: 'grey', borderWidth: 1}}>    
                  {oneResult}
                </Col>
                <Col className="d-grid gap-2" style={{ borderColor: 'grey', borderWidth: 1}}>  
                  {twoResult}
                </Col>
              </Row>
              </Modal.Body>
            <Modal.Footer>
        <Button variant="success" onClick={handleCloseResultsModal}>
            ?????????
        </Button>
        </Modal.Footer>
        </Modal>
       

    <Container>
      <Row>
      <Col style={{justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <Form.Label>PDF 1</Form.Label>
        <br />
        <Form.Control 
          type="file" 
          id="file" 
          ref={inputFile}
          accept=".pdf" 
          onChange={(e)=>{
            console.log('---');
            console.log(inputFile.current.files[0].name);
            startWebViewer(inputFile.current.files[0], e);
          }}
        />
        </Col>
        <Col style={{justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <Form.Label>PDF 2</Form.Label>
        <br />
        <Form.Control
          type="file" 
          id="comparisonFile" 
          ref={comparisonFile}
          accept=".pdf" 
          onChange={(e)=>{
            console.log('---');
            console.log(comparisonFile.current.files[0].name);
            startSecondWebViewer(comparisonFile.current.files[0]);
          }}
        />
        </Col>
      </Row>
      <Row>
        <Col style={{height: '100%'}}>
          <div className="webviewer" id="viewer" style={{height: '500px'}} ref={viewer}></div>
        </Col>
        <Col style={{height: '100%'}}>
          <div className="webviewer" id="second_viewer" style={{height: '500px'}} ref={second_viewer}></div>
        </Col>
      </Row>
      <Row>
        <Col style={{justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <Button variant="success" size="lg" onClick={performTranslation}>????????????</Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};


export default App;
