import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import fire from '../config/fire'
import { Nav, Navbar, Button, Form } from 'react-bootstrap'
import firebase from 'firebase/app';
import 'firebase/firestore'
import { useForm } from 'react-hook-form'
import '../components/selfScreening.css'

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
    const [name, setName] = useState('')

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

    const renderTask = () => {
        if (tasks && tasks.length) {
            return tasks.map((task, index) => (
                <li key={index}>
                    {task.id}:{task.name}{' '}
                </li>
            ))
        } else {
            return <div>No Task</div>
        }
    }
    const addTask = register => {
        let id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1
        firestore
            .collection('tasks')
            .doc(id + '')
            .set({ id, register })
    }
    const { register, handleSubmit } = useForm() // initialise the hook
    const onSubmit = register => {
        console.log('register data : ', register)
        addTask(register)
        if (register.sick === '1' && register.symptomCough === '1' && register.symptomRunnynose === '1'
            && register.symptomShortnessofbreath === '1' && register.symptomSorethroats === '1'
            && register.nhistory === '1' && register.thistory === '1')
            return console.log('ผลการตรวจสอบ = มีความเสี่ยง')
        else
            return console.log('ผลการตรวจสอบ = ไม่มีความเสี่ยง')
    }

    const submit = () => { }

    return (
        <div>
            <Navbar bg='dark' variant='dark'>
                <Navbar.Brand>MiniProjet covid19</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Link href='/'>Summary</Nav.Link>
                    <Nav.Link href='/selfScreening'>Self-Screening</Nav.Link>
                </Nav>
                <Form inline>
                    <Nav className='mr-auto'>
                        <Nav.Link>{user}</Nav.Link>
                    </Nav>
                </Form>
            </Navbar>
            {/* ###########################   Firebase  ############################### */}
            <h1>Todo</h1>
            <input
                type='text'
                name='name'
                onChange={e => setName(e.target.value)}
            ></input>
            <button onClick={addTask}>Submit</button>
            <ul> {renderTask()}</ul>
            {/* ##########################   Topic  ###################################### */}
            <div className='container'>
                <h1>SelfScreening</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* ############################   Email  ####################################### */}
                    <div class='form-group row'>
                        <label className='col-sm-10 col-form-label'>
                            Email
              </label>
                        <div class='col-sm-10'>
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
                        <label className='col-sm-10 col-form-label'>
                            เพศ (Sex)
             </label>
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
                            1. ท่านมีไข้หรือไม่ Do you have Fever?
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
                            2. ท่านมีอาการดังต่อไปนี้ หรือไม่ Do you have any of these
                            Symptoms?
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
                                    ไอ Cough
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
                                    เจ็บคอ Sore throats
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
                                    น้ํามูกไหล Runny nose
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
                                    เหนื่อยหอบ Shortness of breath
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
                                    ไม่มีอาการเหล่านี้ None of these symtoms
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
                            ในช่วงเวลา 14 วัน ก่อนเริ่มป่วย ใช่หรือไม่ ? Do you have traveled
                            from China, Japan, Singapore, Republic of Korea, HongKong, Taiwan,
                            Macao, Germany, France or the Novel Coronavirus 2019 outbreak
                            areas within the past 14 days before get sick ?
             </label>
                        <div className='col-sm-10'>
                            <select name='thistory' ref={register} className='custom-select'>
                                <option value='1'>ใช่ ( Yes )</option>
                                <option value='2'>ไม่ใช่ ( No )</option>
                            </select>
                        </div>
                        <div className='col-sm-10'>
                            <input
                                type='text'
                                name='from'
                                ref={register}
                                className='form-control-plaintext'
                                placeholder='จากประเทศ (From)'
                            ></input>
                        </div>
                    </div>
                    {/* ############################   nhistory  ####################################### */}
                    <div className='form-group row'>
                        <label className='col-sm-10 col-form-label'>
                            4.
                            ท่านมีประวัติสัมผัสใกล้ชิดกับผู้ป่วยที่ต้องสงสัยการติดเชื้อโรคไวรัสโคโรนาสายพันธุ์ใหม่
                            2019 หรือมีอาชีพที่มีโอกาสสัมผัสนักท่องเที่ยวต่างชาติ หรือไม่? Do
                            you have contacted with suspected or have career opportunities
                            with foreign tourists?
             </label>
                        <div className='col-sm-10'>
                            <select name='nhistory' ref={register} className='custom-select'>
                                <option value='1'>
                                    ใช่ Yes ( สัมผัสผู้ป่วย (contacted with suspected) )
                 </option>
                                <option value='2'>
                                    ใช่ Yes ( ประกอบอาชีพ (career opportunities with foreign
                                    tourists) )
                 </option>
                                <option value='3'>ไม่ No</option>
                            </select>
                        </div>
                    </div>
                    {/* ############################   Button  ####################################### */}
                    <button type='submit' className='btn btn-success'>
                        <div>บันทึกและประเมินผลการเรียนของท่าน </div>
                         Save and self screening result
                </button>

                    <button type='button' className='btn btn-danger'>
                        <div>ยกเลิก</div>
                        cancel
                    </button>
                </form>
            </div>
        </div>

    )
}

export default SelfScreening; 