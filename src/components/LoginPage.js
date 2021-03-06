import React, { useState } from 'react'
import fire from '../config/fire'
import './loginPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signin = e => {
        e.preventDefault()
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(u => {
                console.log('usingin', u)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const signup = e => {

        e.preventDefault()
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(u => {
                console.log('usingup', u)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className='sidenav'>
                <div className='login-main-text'>
                    {/* <h2>Application</h2> */}
                    <br></br>
                    <h2>Miniproject</h2>
                    <p>Coronavirus statistics: Latest numbers on COVID-19 cases</p>
                    <p>Please register or login</p>
                </div>
            </div>
            <div className='main'>
                <div className='col-md-6 col-sm-12'>
                    <div className='login-form'>
                        <form>
                            <div className='form-group'>
                                <label>E-mail</label>
                                <input
                                    type='text'
                                    onChange={e => setEmail(e.target.value)}
                                    className='form-control'
                                    placeholder='E-mail'
                                ></input>
                            </div>

                            <div className='form-group'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    onChange={e => setPassword(e.target.value)}
                                    className='form-control'
                                    placeholder='Password'
                                ></input>
                            </div>
                            <button type='submit' onClick={signin} className='btn btn-black'>
                                Login
               </button>
                            <button type='submit' onClick={signup} className='btn btn-secondary'>
                                Register
               </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <div className='Login-header'>
         <div>
           <input
             type='text'
             name='email'
             onChange={e => setEmail(e.target.value)}
           ></input>
         </div>
         <div>
           <input
             type='password'
             name='password'
             onChange={e => setPassword(e.target.value)}
           ></input>
         </div>
         <div>
           <button type='submit' onClick={signin}>
             SingIn
           </button>
           <button type='submit' onClick={signup}>
             Signup
           </button>
         </div>
       </div> */}
            {/* https://bootsnipp.com/snippets/7nk08 */}
        </div>
    )
}
export default LoginPage;