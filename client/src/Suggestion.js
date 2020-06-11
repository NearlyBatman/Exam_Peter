import React, {Component} from 'react';
import AddSignature from "./AddSignature";
import moment from "moment";
import {Link} from "@reach/router";

class Suggestion extends Component{


    render()
    {
        const id = this.props.id;
        const submission = this.props.getSubmission(id);

        const meh = (
                <p>You are not logged in and can't add a signature</p>
    );
        const test = (
            <AddSignature id={id} addSignature={(id, text) => this.props.addSignature(id, text)}/>
        );
        let content;
        let signatures = [];
        if(submission){
             content = submission.suggestion;
             for(let i = 0; i < submission.signatures.length; i++){
                 signatures.push(<li>{submission.signatures[i].first_name} {moment(submission.signatures[i].date).format('d MMMM, YYYY')}</li>);
             }
        }
        return(
            <>
                {content}
                <ul>
                    {signatures}
                </ul>
                <h3>Add signature</h3>
                {localStorage.userToken ? test : meh}
                <br/><Link to={"/"}>Go back</Link>
            </>
        )
    }
}

export default Suggestion;