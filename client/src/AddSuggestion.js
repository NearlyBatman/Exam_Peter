import React, {Component} from 'react';

class AddSuggestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            suggestion: ""
        }
    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit(){
        this.props.submitSuggest(this.state.suggestion)
    }
    render(){
        return(
            <>
                <input name="suggestion" onChange={event=> this.onChange(event)} type="text"/><br/>
                <button onClick={_=> this.onSubmit()}>Submit</button>
            </>
        )
    }
}

export default AddSuggestion;