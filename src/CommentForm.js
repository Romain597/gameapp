import React from 'react';
import './CommentForm.css';

function TextField(props) {
    return (
            <React.Fragment>
                <div className="CommentForm-col-label">
                    <label className="form-check-label" htmlFor={props.id}>{props.children}</label>
                </div>
                <div className="CommentForm-col-input">
                    <input id={props.id} type="text" className="form-control" name={props.name} value={props.value} onChange={props.onchange}></input>
                </div>
            </React.Fragment>
    );
}

function TextArea(props) {
    return (
        <React.Fragment>
            <div className="CommentForm-col-label">
                <label className="form-check-label" htmlFor={props.id}>{props.children}</label>
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
    }
    handleFormSubmit(e) {
        e.preventDefault();
        this.props.addComment(this.state.author.trim(),this.state.text.trim());
        this.setState({
            author: "",
            text: ""
        });
    }
    render() {
        return (
            <form className="CommentForm" onSubmit={this.handleFormSubmit}>
                <div className="CommentForm-content">
                    <div className="CommentForm-row">
                        <TextField id="input-author" name="comment-author" value={this.state.author} onchange={this.handleTextChange}>Auteur</TextField>
                    </div>
                    <div className="CommentForm-row">
                        <TextArea id="input-comment" name="comment-text" value={this.state.text} onchange={this.handleTextChange}>Commentaire</TextArea>
                    </div>
                    <div className="CommentForm-row">
                        <div className="CommentForm-col-footer">
                            <input type="submit" className="btn btn-primary" value="Valider" />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default CommentForm;
