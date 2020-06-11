import React, {Component} from 'react'
import jwt from 'jsonwebtoken';
import {Link, navigate} from "@reach/router";

class Profile extends Component{
    constructor() {
        super();
        this.state = {
            first_name: "",
            last_name:"",
            email:""
        }
    }
    componentDidMount() {
        if(localStorage.userToken){
            const token = localStorage.userToken;
            const decoded = jwt.decode(token);
            this.setState({
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email: decoded.email,
            })
        }
    }

    render(){
        const loggedIn = (
            <>
            <h3>First name</h3><br/>
            {this.state.first_name}
            <h3>Last name</h3><br/>
            {this.state.last_name}
            <h3>Email</h3><br/>
            {this.state.email}
            </>);

        const notLoggedIn = (<>
            <p>You are not logged in</p>
            </>);
        return(
            <>
                {localStorage.userToken ? loggedIn : notLoggedIn}<br/>
                <Link to={"/"}>Go back</Link>
            </>
        )
    }
}
export default Profile;