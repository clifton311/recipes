import React from 'react';
import Link from 'react-router-dom';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      IsRegistered: true,
      currentUser: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
     const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      userName: this.state.userName
      
     }
     console.log(newUser)
     axios.post('users/new', newUser)
      .then((response) => {
        console.log(response)
    })
    .catch(
      console.log("user not submitted")
    )
  }

  render () {
    return (
      <div>
      <h1 className="register"> Welcome to Recipe Finder!</h1>
        <p>Please Register Below</p>
        
        <form onSubmit={this.handleSubmit}>
          <label>Enter First Name: </label>
          <input type="text" 
            name="firstName" 
            onChange={this.handleChange}
            placeholder="Enter First Name...">
          </input> <br></br>

          <label>Enter Last Name: </label>
          <input type="text" 
            name="lastName" 
            onChange={this.handleChange}
            placeholder="Enter Last Name...">
          </input> <br></br>

          <label>Enter Password:</label>
          <input type="text" 
            name="password" 
            onChange={this.handleChange}
            placeholder="Enter Password...">
          </input> <br></br>

          <label>Enter Username:</label>
          <input type="text" 
            name="userName" 
            onChange={this.handleChange}
            placeholder="Enter Username...">
          </input> <br></br>

          <label>Enter Email:</label>
          <input type="text" 
            name="email" 
            onChange={this.handleChange}
            placeholder="Enter email...">
          </input> <br></br>

          <button style={{
            width: "150px",
            borderRadius: "3px", }}
            type="submit"
            onSubmit={this.handleSubmit}
            >Sign Up
          </button>

        </form>
      </div>
    )
  }
}

export default Register