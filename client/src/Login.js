import React, {Component} from 'react';
import Register from './Register';
import {Link, navigate} from "@reach/router";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        }
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    login(event){
        event.preventDefault();
        const User = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.login(User);
    }

    render(){
        const loggedIn = (
            <>
                <p>You are already logged in</p>
            </>
        );
        const notLoggedIn = (
            <>
                <h3>Login</h3>
                <form noValidate onSubmit={this.login}>
                    <input type="email" name="email"
                           placeholder="Enter email" value={this.state.email}
                           onChange={this.onChange}/><br/>
                    <input type="password" name="password"
                           placeholder="Enter password" value={this.state.password}
                           onChange={this.onChange}/><br/>
                    <button type="submit">Login</button>
                </form>
                <Register register={user => this.props.register(user)}/>
        </>
        );
        return(
            <>
                {localStorage.userToken ? loggedIn : notLoggedIn}<br/>
                <Link to={"/"}>Go back</Link>
            </>
        )
    }
}

export default Login;