import React, {Component} from 'react';

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            first_name: "",
            last_name:"",
            email:"",
            password:""
        }
        this.onChange = this.onChange.bind(this);
        this.register = this.register.bind(this);
    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    register(event){
        event.preventDefault();
        const User = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };
        this.props.register(User)
    }

    render(){
        return(
            <>
                <h3>Register</h3>
                <form noValidate onSubmit={this.register}>
                    <input type="text" name="first_name"
                           placeholder="Enter first name" value={this.state.first_name}
                           onChange={this.onChange}/><br/>
                    <input type="text" name="last_name"
                           placeholder="Enter last name" value={this.state.last_name}
                           onChange={this.onChange}/><br/>
                    <input type="email" name="email"
                           placeholder="Enter email" value={this.state.email}
                           onChange={this.onChange}/><br/>
                    <input type="password" name="password"
                           placeholder="Enter password" value={this.state.password}
                           onChange={this.onChange}/><br/>
                    <button onClick={_ => this.register()}>Register</button>
                </form>

            </>
        )
    }
}

export default Register;