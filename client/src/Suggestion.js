import React, {Component} from 'react';
import AddSignature from "./AddSignature";

class Suggestion extends Component{
    render()
    {
        const id = this.props.id;
        const submission = this.props.getSubmission(id);
        let content;
        let signatures = [];
        if(submission){
             content = submission.suggestion;
             for(let i = 0; i < submission.signatures.length; i++){
                 signatures.push(<li>{submission.signatures[i].signature} {submission.signatures[i].meh}</li>);
             }
        }
        return(
            <>
                {content}
                <ul>
                    {signatures}
                </ul>
                <h3>Add signature</h3>
                <AddSignature id={id} addSignature={(id, text) => this.props.addSignature(id, text)}/>
            </>
        )
    }
}

export default Suggestion;