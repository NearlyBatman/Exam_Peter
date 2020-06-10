import React, {Component} from 'react';
import {Link} from '@reach/router';
import AddSuggestion from "./AddSuggestion";

class Suggestions extends Component{
    render()
    {
        const list = this.props.data.map(p => <li>
            <Link to={"/suggestion/"+p._id}>{p.suggestion}</Link>.
            Signature Count: {p.signatures.length}
        </li>);
        return(
            <>
                <ul>
                    {list}
                </ul>
                <h3>Add Suggestion</h3>
                <AddSuggestion submitSuggest={suggest => this.props.submitSuggest(suggest)}></AddSuggestion> <br/>
                <Link to={"/login"}>Login</Link>
            </>
        )
    }
}

export default Suggestions;