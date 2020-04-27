import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, Button, Form, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import fire from '../config/fire'
import 'firebase/firestore'
import { useForm } from 'react-hook-form'
import './selfScreening.css';

if (firebase.apps.length === 0) firebase.initializeApp(fire)
export const firestore = firebase.firestore()
const SelfScreening = () => {
  const [user, setUser] = useState('')

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user.email)
        //console.log('user', user.email)
      } else {
        setUser({ user: null })
      }
    })
  }
  useEffect(() => {
    authListener()
  }, [])

  const logout = () => {
    fire.auth().signOut()
  }

  const [tasks, setTasks] = useState([])

  const retriveData = () => {
    firestore
      .collection('tasks')
      .orderBy('id', 'asc')
      .onSnapshot(snapshot => {
        let myTask = snapshot.docs.map(d => {
          const { id, name } = d.data()
          return { id, name }
        })
        setTasks(myTask)
      })
  }

  useEffect(() => {
    retriveData()
  }, [])

  const addTask = register => {
    let id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1
    firestore
      .collection('tasks')
      .doc(id + '')
      .set({ id, register })
  }
  const [ status,setStatus ] = useState('')
  const { register, handleSubmit } = useForm() // initialise the hook
  const onSubmit = register => {
    console.log('register data : ', register)
    addTask(register)
    if (
      register.sick === '1' &&
      register.symptomCough === '1' &&
      register.symptomRunnynose === '1' &&
      register.symptomShortnessofbreath === '1' &&
      register.symptomSorethroats === '1' &&
      register.nhistory === '1' ||
      register.nhistory === '2' &&
      register.thistory === '1'
    )
      return setStatus('Risky  Quarantine 14 days') && console.log('Risk Assessment = Risky')
    else return setStatus('Not Risky  No Quarantine') && console.log('Risk Assessment = Not Risky')

    
  }
  const [modalShow, setModalShow] = React.useState(false)
  const MyVerticallyCenteredModal = props => {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centereds
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
          Risk Assessment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {status}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand>MiniProjet covid19</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Summary</Nav.Link>
          <Nav.Link href='/selfScreening'>Self-Screening</Nav.Link>
          <Nav.Link href='/selfScreeningeng'>Self-Screening for Foreign</Nav.Link>
        </Nav>
        <Form inline>
          <Nav className='mr-auto'>
            <Nav.Link>{user}</Nav.Link>
          </Nav>
          <Button onClick={logout} variant='outline-info'>
            Logout
          </Button>
        </Form>
      </Navbar>

      {/* ###########################   Firebase  ############################### */}
      {/* ##########################   Topic  ###################################### */}
      <div className='container'>
        <h1>SelfScreening</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ############################   Email  ####################################### */}
          <div className='form-group row'>
            <label className='col-sm-10 col-form-label'>Email</label>
            <div className='col-sm-10'>
              <input
                type='text'
                name='email'
                ref={register}
                placeholder={user}
                value={user}
                disabled
                className='form-control-plaintext'
              ></input>
            </div>
          </div>
          {/* ############################   Sex  ####################################### */}
          <div className='form-group row'>
            <label className='col-sm-10 col-form-label'>เพศ (Sex)</label>
            <div className='col-sm-10'>
              <select name='sex' ref={register} className='custom-select'>
                <option value='1'>ชาย (Male)</option>
                <option value='2'>หญิง (Female)</option>
              </select>
            </div>
          </div>
          {/* ############################   Sick  ####################################### */}
          <div className='form-group row'>
            <label className='col-sm-10 col-form-label'>
                Do you have Fever?
            </label>
            <div className='col-sm-10'>
              <select name='sick' ref={register} className='custom-select'>
                <option value='1'>มี YES</option>
                <option value='2'>ไม่มี NO </option>
              </select>
            </div>
          </div>
          {/* ############################   symptom  ####################################### */}
          <div className='form-group row'>
            <label className='col-sm-10 col-form-label'>
              Do you have any of these Symptoms?
            </label>
            <div className='col-sm-10'>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <input
                      name='symptomCough'
                      ref={register}
                      value='1'
                      type='checkbox'
                      aria-label='Checkbox for following text input'
                    ></input>
                  </div>
                </div>
                <label
                  type='text'
                  className='form-control'
                  aria-label='Text input with checkbox'
                >
                   Cough
                </label>
              </div>

              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <input
                      name='symptomSorethroats'
                      ref={register}
                      value='1'
                      type='checkbox'
                      aria-label='Checkbox for following text input'
                    ></input>
                  </div>
                </div>
                <label
                  type='text'
                  className='form-control'
                  aria-label='Text input with checkbox'
                >
                   Sore throats
                </label>
              </div>

              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <input
                      name='symptomRunnynose'
                      ref={register}
                      value='1'
                      type='checkbox'
                      aria-label='Checkbox for following text input'
                    ></input>
                  </div>
                </div>
                <label
                  type='text'
                  className='form-control'
                  aria-label='Text input with checkbox'
                >
                  Runny nose
                </label>
              </div>

              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <input
                      name='symptomShortnessofbreath'
                      ref={register}
                      value='1'
                      type='checkbox'
                      aria-label='Checkbox for following text input'
                    ></input>
                  </div>
                </div>
                <label
                  type='text'
                  className='form-control'
                  aria-label='Text input with checkbox'
                >
                  Shortness of breath
                </label>
              </div>

              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <input
                      name='symptomNoneofthesesymtoms'
                      ref={register}
                      type='checkbox'
                      value='0'
                      aria-label='Checkbox for following text input'
                    ></input>
                  </div>
                </div>
                <label
                  type='text'
                  className='form-control'
                  aria-label='Text input with checkbox'
                >
                  None of these symtoms
                </label>
              </div>
            </div>
          </div>
          {/* ############################   Thistory  ####################################### */}
          <div className='form-group row'>
            
            <label className='col-sm-10 col-form-label'>
              Do you have traveled from China, Japan, Singapore, 
              Republic of Korea, HongKong, Taiwan, Macao, Germany, France 
              or the Novel Coronavirus 2019 outbreak
              areas within the past 14 days before get sick ?
            </label>
            <div className='col-sm-10'>
              <select name='thistory' ref={register} className='custom-select'>
                <option value='1'>Yes </option>
                <option value='2'>No</option>
              </select>
            </div>
            <div className='col-sm-10'>
              <input
                type='text'
                name='from'
                ref={register}
                className='form-control-plaintext'
                placeholder='Are you from'
              ></input>
            </div>
          </div>
          {/* ############################   nhistory  ####################################### */}
          <div className='form-group row'>
            
            <label className='col-sm-10 col-form-label'>
                Do you have contacted with suspected or 
                have career opportunities with foreign tourists?
            </label>
            <div className='col-sm-10'>
              <select name='nhistory' ref={register} className='custom-select'>
                <option value='1'>
                Yes ( (contacted with suspected) )
                </option>
                <option value='2'>
                   Yes ( (career opportunities with foreign
                  tourists) )
                </option>
                <option value='3'> No</option>
              </select>
            </div>
          </div>
          {/* ############################   Button  ####################################### */}
          <div>
            <Button
              type='submit'
              variant='primary'
              onClick={() => setModalShow(true)}
            >
              <div>Save and self screening result</div>
              Save and self screening result
            </Button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <button type='button' className='btn btn-danger'>
              <div>cancel</div>
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SelfScreening