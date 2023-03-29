import React, {useEffect, useState} from 'react';
import SyncLoader from 'react-spinners/SyncLoader';
import './Components.css';
import "bootstrap/dist/css/bootstrap.min.css";
import squareLogo from '../assets/squareLogo.jpg';
import htsLogo from '../assets/htslogo.jpg';

const Hazards1 = ({SaveAndExit, nextStep, handleChange, values, moreValues}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [newJobs, setNewJobs] = useState(null);

  async function getJobs() {
    let fetchedJobs = [];
    try {
      const response = await fetch("http://localhost/backend/getJobs.php", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      // .then((response) => {
      //   if (response.ok) {
      //     setJobIDs(JSON.parse(response))
      //     return jobIDs
      //   }
      //   throw new Error('error')
      // })
      const data = await response.json();
      console.log(data);
      fetchedJobs = data.Jobs;
      console.log(fetchedJobs);
      setNewJobs(fetchedJobs);
      console.log(newJobs);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getJobs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [newJobs]);

  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `

  const Continue = e => {
    e.preventDefault();
    nextStep();
  }

  const Save = e => {
    e.preventDefault();
    SaveAndExit(e);
  }

  return isLoading ?
    <div className='Splash-container'>
      <div className='Splash-content'>
        <div className='h-100 w-100'>
          <SyncLoader color={'#271801'} loading={isLoading} css={override} size={20} />
          <img src={htsLogo} alt='HTS-Logo' className='HTS-logo' />
        </div>
      </div>
    </div> :
    <div className='Hazard-form-container'>
      <form className='Hazard-form'>
        <div className='Hazard-form-content'>
          <div className='row Hazard-form-header'>
            <img  src={squareLogo} alt='Logo' className='col w-25 h-100 Hazard-form-logo-square' />
            <div className='col w-75 pt-3'>
              <div id='empID' className='row'>
                <label htmlFor='empID'>Employee ID: </label>
                <div className='Hazard-form-text-display'>
                  {moreValues.employeeID}
                </div>
              </div>
              <div className='row'>
                <label htmlFor='jobSelect'>Job ID: </label>
                <select id='jobSelect' onChange={handleChange('jobID')}>
                  <option value="Select Job: ">Select Job: </option>
                  {newJobs.map((Job) => <option key={Job.JobID} value={Job.JobID}>{Job.JobName}</option>)}
                </select>
              </div>
              <div className='row'>
                <label htmlFor='date'>Date: </label>
                <div className='Hazard-form-text-display'>
                  {moreValues.date}
                </div>
              </div>
              <div id='time' className='row'>
                <label htmlFor='time'>Time: </label>
                <div className='Hazard-form-text-display'>
                  {moreValues.time}
                </div>
              </div>
            </div>
          </div>
          <h3 className='Hazard-form-title'>Hazard Assessment Form</h3>
          <h5 className='Hazard-form-subtitle'>Select Preparation Items</h5>
          <div style={{height: 300}} className='border rounded overflow-auto'>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.accessExit} onChange={handleChange('accessExit')} id='accessExit' />
                <label style={{fontSize: 14}} className='form-check-label ' htmlFor='accessExit'>Access / Exit</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.airborne} onChange={handleChange('airborne')} id='airborne' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='airborne'>Airborne Particles</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.barricade} onChange={handleChange('barricade')} id='barricade' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='barricade'>Barricade / Flag Area</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.blindBlankDisc} onChange={handleChange('blindBlankDisc')} id='blindBlankDisc' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='blindBlankDisc'>Blinded / Blanked / Disconnected</label>
              </div>
            </div>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.codeOfPrac} onChange={handleChange('codeOfPrac')} id='codeOfPrac' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='codeOfPrac'>Code of Practice</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.confined} onChange={handleChange('confined')} id='confined' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='confined'>Confined Space Entry</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.depressurized} onChange={handleChange('depressurized')} id='depressurized'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='depressurized'>Depressurized</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.diesel} onChange={handleChange('diesel')} id='diesel'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='diesel'>Diesel Emergency Shut Down</label>
              </div>
            </div>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.drainage} onChange={handleChange('drainage')} id='drainage'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='drainage'>Drainage</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.emergPlan} onChange={handleChange('emergPlan')} id='emergPlan' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='emergPlan'>Emergency Response Plan Review</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.extension} onChange={handleChange('extension')} id='extension'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='extension'>Extension Cords</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.fall} onChange={handleChange('fall')} id='fall'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='fall'>Fall Protection</label>
              </div>
            </div>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.openings} onChange={handleChange('openings')} id='openings'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='openings'>Floor / Roof Openings</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.genHouse} onChange={handleChange('genHouse')} id='genHouse'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='genHouse'>General House</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.grounding} onChange={handleChange('grounding')} id='grounding' />
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='grounding'>Grounding</label>
               </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.h2s} onChange={handleChange('h2s')} id='h2s'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='h2s'>H2S</label>
              </div>
            </div>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.heavy} onChange={handleChange('heavy')} id='heavy'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='heavy'>Heavy Lifting</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.hygiene} onChange={handleChange('hygiene')} id='hygiene'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='hygiene'>Hygiene Program</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.lighting} onChange={handleChange('lighting')} id='lighting'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='lighting'>Lighting</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.ladders} onChange={handleChange('ladders')} id='ladders'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='ladders'>Ladders</label>
              </div>
            </div>
            <div className='row Hazard-form-check-contain'>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.lifting} onChange={handleChange('lifting')} id='lifting'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='lifting'>Lifting Devices and Rigging</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.loadSecure} onChange={handleChange('loadSecure')} id='loadSecure'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='loadSecure'>Load Secured</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' value={values.locked} onChange={handleChange('locked')} id='locked'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='locked'>Locked / Tagged</label>
              </div>
              <div className='col form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' values={values.manlift} onChange={handleChange('manlift')} id='manlift'/>
                <label style={{fontSize: 14}} className='form-check-label' htmlFor='manlift'>Manlift</label>
              </div>
            </div>
          </div>
          <div className='page-btns'>
            <div className='prev-page-btn-disabled'>
              <button className='btn' disabled>Previous Page</button>
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
}

export default Hazards1;