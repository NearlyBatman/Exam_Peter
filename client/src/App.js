import React, {Component} from 'react';
import {Router} from '@reach/router';
import Suggestions from "./Suggestions";
import Suggestion from "./Suggestion";
import Login from "./Login";
import Profile from "./Profile";
import jwt from 'jsonwebtoken';
import {Link, navigate} from '@reach/router';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      submissions: []
    };
  }

  componentDidMount(){
    this.getData();
  }
  async getData(){
    const url = 'api/suggestions';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      submissions: data
    })
  }

  getSubmission(id){
    const submission = this.state.submissions.find(q => q._id === id);
    return submission;
  }

  async submitSuggest(suggest){
    console.log(suggest);
    const url ='api/addsuggestion';
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        suggestion: suggest
      })
    });
    const data = await response.json()
    await this.getData();
  }

  async addSignature(id, text){
    let decoder = jwt.decode(localStorage.userToken);
    if(text != decoder.first_name){
      alert("Names does not match");
      return;
    }
    const url = `/api/suggestions/${id}/signature`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        text: text,
        email: decoder.email
      })
    })
        .catch(err => {
      console.log(err)
    });
    const data = await response.json()
        .catch(err => {
          console.log(err)
        });
    console.log(data);
  }
  async register(user){
    console.log(user.first_name);
    const url = '/api/register';
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password
      })
    });
    let data = await response.json();
    let kek = JSON.stringify(data);
    if(kek == `"${user.email}"`){
      console.log("woohoo");
      alert("Register: Success");
      await this.getData();
    }
    else{
      alert("Email already in use");
      return
    }
  }

  async login(user){
    const url ='/api/login';
    const response = await fetch(url,{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    });
    //await localStorage.setItem('userToken', response.token)
    let data = await response.json();
    try{
      jwt.verify(data, 'secret')
    } catch(err){
      alert("Auth failed")
      return
    }
    await localStorage.setItem('userToken', data);
    await this.getData();
  }

  render(){
    return(
        <>
          <h2>Sign it baby</h2>
          <Router>
            <Suggestions path="/"
                         data={this.state.submissions}
                         submitSuggest={suggest => this.submitSuggest(suggest)}
            ></Suggestions>
            <Suggestion path="/suggestion/:id"
                        getSubmission={id => this.getSubmission(id)}
                        addSignature={(id, text) => this.addSignature(id, text)}
            ></Suggestion>
            <Login path="/login"
                   register={user =>this.register(user)}
                   login={user => this.login(user)}
            ></Login>
            <Profile path="/profile"
            ></Profile>
          </Router>
        </>
    )
  }
}

export default App;
