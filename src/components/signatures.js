import React, { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import SignatureCanvas from 'react-signature-canvas';
import './Components.css';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import squareLogo from '../assets/squareLogo.jpg';

const Signatures = ({ prevStep, SaveAndExit, handleChange, handleSignChange, moreValues }) => {
  const signatures = [];
  const [openModal, setOpenModal] = useState(false);
  const sigCanvas1 = useRef();
  const sigCanvas2 = useRef();
  const sigCanvas3 = useRef();
  const sigCanvas4 = useRef();

  const handleShow = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  const Save = e => {
    e.preventDefault();
    // const URL = sigCanvas1.current.toDataURL('image/png');
    // setImageURL(URL);
    // handleSignChange(imageURL);
    // localStorage.setItem(moreValues.employeeID + "signature" + moreValues.time, JSON.stringify(imageURL));
    // SaveAndExit(imageURL);
    const url1 = sigCanvas1.current.toDataURL();
    const url2 = sigCanvas2.current.toDataURL();
    const url3 = sigCanvas3.current.toDataURL();
    const url4 = sigCanvas4.current.toDataURL();

    signatures.push(url1, url2, url3, url4);
    handleSignChange(signatures);
    SaveAndExit(signatures);
  }

  return (
    <div className='Hazard-form-container'>
      <form className='Hazard-form'>
        <div className='Hazard-form-content'>
          <div className='row Hazard-form-header'>
            <img src={squareLogo} alt='Logo' className='col w-25 Hazard-form-logo-square' />
            <div className='col w-75 pt-3'>
              <div className='row border rounded mt-2 Hazard-form-text-display'>
                Employee ID: {moreValues.employeeID}
              </div>
              <div className='row border rounded mt-2 Hazard-form-text-display'>
                Job ID: {moreValues.jobID}
              </div>
              <div className='row border rounded mt-2 Hazard-form-text-display'>
                Date: {moreValues.date}
              </div>
              <div className='row border rounded mt-2 Hazard-form-text-display'>
                Time: {moreValues.time}
              </div>
            </div>
          </div>
          <h3 className='Hazard-form-title'>Hazard Assesment Form</h3>
          <h5 className='Hazard-form-subtitle'>Muster Point & Signature</h5>
          <div className='mt-3'>
            <label className='form-label' htmlFor='musterPoint'>Enter the Muster Point</label>
            <textarea className='form-control' id='musterPoint' rows='1' value={moreValues.musterPoint} onChange={handleChange('musterPoint')}></textarea>
          </div>
          <div className='my-3 justify-content-center'>
            <Button onClick={handleShow} style={{width: '50%'}} className='btn btn-custom'>Sign Form</Button>
            <br />
            {openModal && (
              <Modal show={openModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Form Signatures</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className='mb-3' controlId='signatures.ControlInput1'>
                      <FloatingLabel
                        controlId='floatingInput'
                        label='Employee 1. Name: '
                      >
                        <Form.Control
                          type='text'
                          placeholder='Employee Name:'
                          autoFocus
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Signature: </Form.Label>
                      <SignatureCanvas
                        penColor='black'
                        canvasProps={{ className: 'sign-canvas' }}
                        ref={sigCanvas1}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='signatures.ControlInput2'>
                      <FloatingLabel
                        controlId='floatingInput'
                        label='Employee 2. Name: '
                      >
                        <Form.Control
                          type='text'
                          placeholder='Employee Name:'
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Signature: </Form.Label>
                      <SignatureCanvas
                        penColor='black'
                        canvasProps={{ className: 'sign-canvas' }}
                        ref={sigCanvas2}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='signatures.ControlInput3'>
                      <FloatingLabel
                        controlId='floatingInput'
                        label='Employee 3. Name: '
                      >
                        <Form.Control
                          type='text'
                          placeholder='Employee Name: '
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Signature: </Form.Label>
                      <SignatureCanvas
                        penColor='black'
                        canvasProps={{ className: 'sign-canvas' }}
                        ref={sigCanvas3}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='signatures.ControlInput3'>
                      <FloatingLabel
                        controlId='floatingInput'
                        label='Employee 4. Name: '
                      >
                        <Form.Control
                          type='text'
                          placeholder='Employee Name: '
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Signature: </Form.Label>
                      <SignatureCanvas
                        penColor='black'
                        canvasProps={{ className: 'sign-canvas' }}
                        ref={sigCanvas4}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button style={{width: '20%'}} className='btn btn-secondary' onClick={handleClose}>Close</Button>
                  <Button style={{width: '75%'}} className='btn-custom' onClick={Save}>Save Changes</Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
          <div className='page-btns'>
            <div className='prev-page-btn'>
              <button className='btn' onClick={Previous}>Previous Page</button>
            </div>
            <div className='save-and-exit-btn'>
              <button className='btn' onClick={(values) => Save(values)}>Save & Exit</button>
            </div>
            <div className='next-page-btn-disabled'>
              <button className='btn' disabled>Next Page</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signatures