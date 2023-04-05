import React, {useRef, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import SignatureCanvas from 'react-signature-canvas';
import './Components.css';
import "bootstrap/dist/css/bootstrap.min.css";
import squareLogo from '../assets/squareLogo.jpg';

const Signatures = ({prevStep, SaveAndExit, handleChange, handleSignChange, moreValues}) => {
  const [imageURL, setImageURL] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const sigCanvas = useRef()

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  const Save = e => {
    e.preventDefault();
    const URL = sigCanvas.current.toDataURL('image/png');
    setImageURL(URL);
    handleSignChange(imageURL);
    localStorage.setItem(moreValues.employeeID + "signature" + moreValues.time, JSON.stringify(imageURL));
    SaveAndExit(imageURL);
  }

  return (
    <div className='Hazard-form-container'>
      <form className='Hazard-form'>
        <div className='Hazard-form-content'>
          <div className='row Hazard-form-header'>
            <img  src={squareLogo} alt='Logo' className='col w-25 Hazard-form-logo-square' />
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
            <button onClick={() => setOpenModal(true)} type='button' className='btn btn-custom'>Sign Form</button>
            <br />
            {openModal && (
              <Modal
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id='contained-modal-title-vcenter'>
                    Enter employees present and have them sign
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Enter Employee</h4>
                  <div className='border rounded sign-pad-container'>
                    <SignatureCanvas
                      penColor="black"
                      canvasProps={{ className: "sign-canvas" }}
                      ref={sigCanvas}
                    />
                    <hr />
                    <button type='button' onClick={() => sigCanvas.current.clear()}>Clear</button>
                  </div>
                </Modal.Body>
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