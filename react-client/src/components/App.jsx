import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './Login.jsx';
import Form from './Forms.jsx';
import Recipes from './Recipes.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      recipes: []
    };

    this.getRecipe = this.getRecipe.bind(this)
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

  // handleLog() {
  //   $.ajax({
  //     url: '/users',
  //     method: 'POST',
  //     data: this.state,
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       });
  //     },
  //     error: (err) => {
  //       console.log("err", err)
  //     }
  //   });
  // }

  getRecipe (e) {
    const value = e.target.elements.recipe.value;
     axios.get(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=ba5048a28634fc6e5a79ae35592b0fe3&q=${value}&count=10`)
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
      <div>
        <h1 className="h1">Recipe Finder</h1>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes}/>
       
      </div>
    )
  }  
} 
 export default App;