import React, {Component} from 'react';
import {Router} from '@reach/router';
import Suggestions from "./Suggestions";
import Suggestion from "./Suggestion";

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
  /*
           {suggestion: "This is a test", id: 0, signatures: [
             {signature: "Kalle", meh: 42},
             {signature: "Helle", meh: 45},
             {signature: "Johnny", meh: 86}]},
         {suggestion: "This is another test", id: 1, signatures: [
             {signature: "Pelle", meh: 56},
             {signature: "Malle", meh: 89},
             {signature: "Mulle", meh: 22}]},
         {suggestion: "This is the last test", id: 2, signatures: [
                 {signature: "Talle", meh: 67},
                 {signature: "Jalle", meh: 17},
                 {signature: "Tjalle", meh: 97}]}
   submitSuggest(suggest){
       this.state.submissions.push({suggestion: suggest, id: this.state.submissions.length+1, signatures: []})
 }
*/
  getSubmission(id){
    const submission = this.state.submissions.find(q => q.id === parseInt(id));
    return submission;
  }
  addSignature(id, text){
    let test = this.state.submissions.find(q => q.id === parseInt(id));
    test.signatures.push({signature: text, meh: 2});
    //submission.signatures.push({signature: text, meh: 2})
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
    console.log(data);
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
          </Router>
        </>
    )
  }
}

export default App;
