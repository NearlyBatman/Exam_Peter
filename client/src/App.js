import React, {Component} from 'react';
import {Router} from '@reach/router';
import Suggestions from "./Suggestions";
import Suggestion from "./Suggestion";
import Login from "./Login";

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
    const data = await response.json();
    await this.getData();
    console.log(data);
  }

  async addSignature(id, text){
    console.log(id, text);
    const url = `/api/suggestions/${id}/signature`;
    console.log(url);
    await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        text: text
      })
    });
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
    await response.json();
    console.log("Login succes");
  }

  async login(user){
    console.log(user.email);
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
    })
    //await localStorage.setItem('userToken', response.token)
    let data = await response.json();
    await localStorage.setItem('userToken', data);
    console.log(data)
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
          </Router>
        </>
    )
  }
}

export default App;
