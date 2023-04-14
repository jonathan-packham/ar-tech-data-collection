import React from 'react';
import './Components.css';
import "bootstrap/dist/css/bootstrap.min.css";
import squareLogo from '../assets/squareLogo.jpg';

const Ppe1 = ({prevStep, SaveAndExit, nextStep, handleChange, values, moreValues}) => {
  const Continue = e => {
    e.preventDefault();
    nextStep();
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  const Save = e => {
    e.preventDefault();
    SaveAndExit(e);
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
          <h5 className='Hazard-form-subtitle'>Select Required PPE</h5>
          <div style={{height: 300}} className='border rounded overflow-auto'>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.chemProtect} onChange={handleChange('chemProtect')} id='chemProtect' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='chemProtect'>Chemical Protective Clothing</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.cotton} onChange={handleChange('cotton')} id='cotton' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='cotton'>Cotton Coveralls</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.communicationDev} onChange={handleChange('communicationDev')} id='communicationDev' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='communicationDev'>Communication Device</label>
              </div>
            </div>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.hardHat} onChange={handleChange('hardHat')} id='hardHat' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='hardHat'>Hard Hat</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.hearing} onChange={handleChange('hearing')} id='hearing' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='hearing'>Hearing Protection</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.highVis} onChange={handleChange('highVis')} id='highVis' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='highVis'>High Visibility Clothing</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.Gloves} onChange={handleChange('Gloves')} id='Gloves' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='Gloves'>Gloves</label>
              </div>
            </div>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.Goggles} onChange={handleChange('Goggles')} id='Goggles' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='Goggles'>Goggles</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.safeLight} onChange={handleChange('safeLight')} id='safeLight' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='safeLight'>Intrinsically Safe Lighting</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.lifeline} onChange={handleChange('lifeline')} id='lifeline' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='lifeline'>Lifeline, Lanyard with Shock Absorber, Safety Harness</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.fireResist} onChange={handleChange('fireResist')} id='fireResist' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='fireResist'>FR Coveralls</label>
              </div>
            </div>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.gasMon} onChange={handleChange('gasMon')} id='gasMon' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='gasMon'>Personal Gas Monitor</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.safeGlasses} onChange={handleChange('safeGlasses')} id='safeGlasses' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='safeGlasses'>Safety Glasses</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.steelToed} onChange={handleChange('steelToed')} id='steelToed' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='steelToed'>Steel Toed Boots</label>
              </div>
            </div>
          </div>
          <div className='page-btns'>
            <div className='prev-page-btn'>
              <button className='btn' onClick={Previous}>Previous Page</button>
            </div>
            <div className='save-and-exit-btn'>
              <button className='btn' onClick={(values) => Save(values)}>Save & Exit</button>
            </div>
            <div className='next-page-btn'>
              <button className='btn' onClick={Continue}>Next Page</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Ppe1