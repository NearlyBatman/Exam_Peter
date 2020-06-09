import React, {Component} from 'react';

class AddSignature extends Component{
    constructor(props){
        super(props);
        this.state={
            input:""
        }
    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    addSignature(){
        this.props.addSignature(this.props.id, this.state.input)
    }

    render(){
        return(
            <>
                <input name="input" onChange={event => this.onChange(event)} type="text"/><br/>
                <button onClick={_ => this.addSignature()}>Add signature</button>
            </>
        )
    }
}

export default AddSignature;