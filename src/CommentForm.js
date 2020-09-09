import React from 'react';
import './CommentForm.css';

function TextField ({id,name,value,onchange,children}) {
    return (
            <React.Fragment>
                <div className="CommentForm-col-label">
                    <label htmlFor={id}>{children}</label>
                </div>
                <div className="CommentForm-col-input">
                    <input id={id} type="text" name={name} value={value} onChange={onchange}></input>
                </div>
            </React.Fragment>
    );
}

function TextArea ({id,name,value,onchange,children}) {
    return (
        <React.Fragment>
            <div className="CommentForm-col-label">
                <label htmlFor={id}>{children}</label>
            </div>
            <div className="CommentForm-col-input">
                <textarea id={id} name={name} value={value} onChange={onchange}></textarea>
            </div>
        </React.Fragment>
    );
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            commentsLen: this.props.commentsLength,
            author: "",
            text: ""
        };
    }
    handleChange = (e) => {
        let name = e.target.name
        name = name.replace("comment-","");
        let value = e.target.value
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.setState({
            author: "",
            text: ""
        });
    }
    render() {
        let separator = '';
        if(this.state.commentsLen > 0) {
            separator = <hr />;
        }
        return (
            <React.Fragment>
                {separator}
                <form className="CommentForm" onSubmit={this.handleSubmit}>
                    <div className="CommentForm-content">
                        <div className="CommentForm-row">
                            <TextField id="input-author" name="comment-author" value={this.state.author} onchange={this.handleChange}>Auteur</TextField>
                        </div>
                        <div className="CommentForm-row">
                            <TextArea id="input-comment" name="comment-text" value={this.state.author} onchange={this.handleChange}>Commentaire</TextArea>
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
