import React from 'react';
import './CommentForm.css';

//{id,name,value,onchange,children}
function TextField(props) {
    return (
            <React.Fragment>
                <div className="CommentForm-col-label">
                    <label htmlFor={props.id}>{props.children}</label>
                </div>
                <div className="CommentForm-col-input">
                    <input id={props.id} type="text" name={props.name} value={props.value} onChange={props.onchange}></input>
                </div>
            </React.Fragment>
    );
}

//{id,name,value,onchange,children}
function TextArea(props) {
    return (
        <React.Fragment>
            <div className="CommentForm-col-label">
                <label htmlFor={props.id}>{props.children}</label>
            </div>
            <div className="CommentForm-col-input">
                <textarea id={props.id} name={props.name} value={props.value} onChange={props.onchange}></textarea>
            </div>
        </React.Fragment>
    );
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            author: "",
            text: ""
        };
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    handleTextChange(e) {
        let name = e.target.name
        name = name.replace("comment-","");
        let value = e.target.value
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }
    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.setState({
            author: "",
            text: ""
        });
    }
    render() {
        let separator = '';
        if(this.props.commentsLength > 0) {
            separator = <hr />;
        }
        return (
            <React.Fragment>
                {separator}
                <form className="CommentForm" onSubmit={this.handleFormSubmit}>
                    <div className="CommentForm-content">
                        <div className="CommentForm-row">
                            <TextField id="input-author" name="comment-author" value={this.state.author} onchange={this.handleTextChange}>Auteur</TextField>
                        </div>
                        <div className="CommentForm-row">
                            <TextArea id="input-comment" name="comment-text" value={this.state.author} onchange={this.handleTextChange}>Commentaire</TextArea>
                        </div>
                        <div className="CommentForm-row">
                            <div className="CommentForm-footer">
                                <input type="submit" value="Valider" />
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default CommentForm;
