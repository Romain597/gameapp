import React from 'react';

function TextField(props) {
    return (
            <div className="form-group">
                <label htmlFor={props.id}>{props.children}</label>
                <input id={props.id} type="text" className="form-control" name={props.name} value={props.value} onChange={props.onchange}></input>
            </div>
    );
}

function TextArea(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.children}</label>
            <textarea id={props.id} className="form-control" name={props.name} value={props.value} onChange={props.onchange}></textarea>
        </div>
    );
}

function SubmitButton(props) {
    return (
        <div className="form-group text-center">
            <input type="submit" className="btn btn-primary" value={props.children} />
        </div>
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
            <form className="col-6" onSubmit={this.handleFormSubmit}>
                <TextField id="input-author" name="comment-author" value={this.state.author} onchange={this.handleTextChange}>Auteur</TextField>
                <TextArea id="input-comment" name="comment-text" value={this.state.text} onchange={this.handleTextChange}>Commentaire</TextArea>
                <SubmitButton>Valider</SubmitButton>
            </form>
        );
    }
}

export default CommentForm;
