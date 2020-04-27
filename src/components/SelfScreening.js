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
      return setStatus('มีความเสี่ยง จำเป็นต้องกักตัว 14 วัน') && console.log('ผลการตรวจสอบ = มีความเสี่ยง')
    else return setStatus('ไม่มีความเสี่ยง  ไม่ต้องกักตัว') && console.log('ผลการตรวจสอบ = ไม่มีความเสี่ยง')

    
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
          ผลประเมินความเสี่ยง
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
        <Navbar.Brand>MiniProject covid19</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Summary</Nav.Link>
          <Nav.Link href='/selfScreening'>Self-Screening For Thai</Nav.Link>
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
            <label className='col-sm-10 col-form-label'>เพศ</label>
            <div className='col-sm-10'>
              <select name='sex' ref={register} className='custom-select'>
                <option value='1'>ชาย</option>
                <option value='2'>หญิง</option>
              </select>
            </div>
          </div>
          {/* ############################   Sick  ####################################### */}
          <div className='form-group row'>
            <label className='col-sm-10 col-form-label'>
              1. ท่านมีไข้หรือไม่? 
            </label>
            
            <div className='col-sm-10'>
              <select name='sick' ref={register} className='custom-select'>
                <option value='1'>มี</option>
                <option value='2'>ไม่มี </option>
              </select>
            </div>
          </div>
          {/* ############################   symptom  ####################################### */}
          <div className='form-group row'>
            <label className='col-sm-10 col-form-label'>
              2. ท่านมีอาการดังต่อไปนี้ หรือไม่ 
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
                  ไอ
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
                  เจ็บคอ
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
                  น้ํามูกไหล
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
                  เหนื่อยหอบ 
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
                  ไม่มีอาการเหล่านี้
                </label>
              </div>
            </div>
          </div>
          {/* ############################   Thistory  ####################################### */}
          <div className='form-group row'>
            <label className='col-sm-10 col-form-label'>
              3. ท่านมีประวัติเดินทางมาจากประเทศจีน, ญี่ปุ่น, สิงคโปร์,
              เกาหลีใต้, ฮ่องกง, ไต้หวัน, มาเก๊า ,เยอรมัน, ฝรั่งเศส
              หรือในพื้นที่ที่มีการระบาดของโรคไวรัสโคโรนา สายพันธุ์ใหม่ 2019
              ในช่วงเวลา 14 วัน ก่อนเริ่มป่วย ใช่หรือไม่ ?
            </label>
            
            <div className='col-sm-10'>
              <select name='thistory' ref={register} className='custom-select'>
                <option value='1'>ใช่ </option>
                <option value='2'>ไม่ใช่ </option>
              </select>
            </div>
            <div className='col-sm-10'>
              <input
                type='text'
                name='from'
                ref={register}
                className='form-control-plaintext'
                placeholder='จากประเทศ'
              ></input>
            </div>
          </div>
          {/* ############################   nhistory  ####################################### */}
          <div className='form-group row'>
            <label className='col-sm-10 col-form-label'>
              4.
              ท่านมีประวัติสัมผัสใกล้ชิดกับผู้ป่วยที่ต้องสงสัยการติดเชื้อโรคไวรัสโคโรนาสายพันธุ์ใหม่
              2019 หรือมีอาชีพที่มีโอกาสสัมผัสนักท่องเที่ยวต่างชาติ หรือไม่? 
            </label>
           
            <div className='col-sm-10'>
              <select name='nhistory' ref={register} className='custom-select'>
                <option value='1'>
                  ใช่ ( สัมผัสผู้ป่วย )
                </option>
                <option value='2'>
                  ใช่ ( ประกอบอาชีพ )
                </option>
                <option value='3'>ไม่</option>
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
              <div>บันทึกและประเมินผลความเสี่ยงของท่าน </div>
              Save and self screening result
            </Button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <button type='button' className='btn btn-danger'>
              <div>ยกเลิก</div>
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SelfScreening