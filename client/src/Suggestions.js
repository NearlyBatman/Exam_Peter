import React, {Component} from 'react';
import {Link, navigate} from '@reach/router';
import AddSuggestion from "./AddSuggestion";

class Suggestions extends Component{

    logOut(event){
        event.preventDefault();
        localStorage.removeItem('userToken');
        navigate("/login");
    }

    render()
    {
        const list = this.props.data.map(p => <li>
            <Link to={"/suggestion/"+p._id}>{p.suggestion}</Link>.
            Signature Count: {p.signatures.length}
        </li>);
        const logout =(
            <>
                <a href="" onClick={this.logOut}>Logout</a>
            </>
        );
        const login = (
            <>
                <Link to={"/login"}>Login</Link>
            </>
        );

        return(
            <>
                <ul>
                    {list}
                </ul>
                <h3>Add Suggestion</h3>
                <AddSuggestion submitSuggest={suggest => this.props.submitSuggest(suggest)}></AddSuggestion> <br/>
                {localStorage.userToken ? logout : login}
            </>
        )
    }
}

export default Suggestions;