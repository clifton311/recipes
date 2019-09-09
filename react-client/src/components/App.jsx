import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './Login.jsx';
import Form from './Forms.jsx';
import Recipes from './Recipes.jsx';
import axios from 'axios';
import Register from './Register.jsx';
import Navbar from './NavBar.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      recipes: [],
      count: 0,
      login: true,
      pageView: 0,
      username: "",
      password: ""
    };

    this.getRecipe = this.getRecipe.bind(this);
    this.incrementMe = this.incrementMe.bind(this);
    this.isRegistered = this.isRegistered.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.pageViewChange = this.pageViewChange.bind(this)
  }

  componentDidMount() {
    //get item in local is in JSON format so needs to parse
    let item = localStorage.getItem("recipes");
    let recipes = JSON.parse(item);
    this.setState({recipes});

  }

  componentDidUpdate () {
    //only takes json.stringify
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes",recipes);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value,
      password: e.target.value
    })
  }

  handleLog() {
    $.ajax({
      url: '/users',
      method: 'POST',
      data: this.state,
      success: (data) => {
        this.setState({
          items: data
        });
      },
      error: (err) => {
        console.log("err", err)
      }
    });
  }

  incrementMe() {
    let newCount = this.state.count + 1;
    this.setState({
      count: newCount
    });
  }

  isRegistered () {
    this.setState({
      login: !this.state.login,
      isRegistered: !this.state.isRegistered
    })
  }

  pageViewChange () {
    this.setState({
      pageView: 1
    })
  }

  getRecipe (e) {
    const value = e.target.elements.recipe.value;
    const number = 6;
     axios.get(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=76521c50a5da5eed488968b0bfa15ce9&q=${value}&count=${number}`)
      .then(results => {
       this.setState({
         recipes: results.data.recipes
       });
      })
      .catch(err => {
        console.log(err);
      });
    
    e.preventDefault();
  }

  render () {  
    
    return (
      <div className="App">
        <h1 className="App-title">Recipe Finder</h1> <br></br>
        {this.state.pageView === 0 ? <Login pageViewChange={this.pageViewChange} handleChange={this.handleChange}/> : <Register />}
        
        {/* <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes} likes={this.state.count} incrementMe={this.incrementMe}/> */}
      </div>
    )
  }  
} 
 export default App;