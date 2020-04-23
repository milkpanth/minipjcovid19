import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/LoginPage'
import { Route } from 'react-router-dom';
import fire from './config/fire'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.authListener()
  }


  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
        console.log('user',user)
      }
      else {
        this.setState({ user: null })
      }
    })
  }


  render() {
    if (this.state.user == null) {
      return (
        <div>
          <LoginPage />
        </div>

      );
    }
    return (
      <div>
        <div>
          
          <Route path="/login" component={LoginPage} />

        </div>
      </div>
    )
  }
}
export default App