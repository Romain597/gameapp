import React from 'react';
import './CommentForm.css';
import Datas from './datas.json';

//{id,name,value,onchange,children}
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

//{id,name,value,onchange,children}
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
        this.addComment = this.addComment.bind(this)
    }
    handleTextChange(e) {
        let name = e.target.name
        name = name.replace("comment-","");
        let value = e.target.value
        //console.log(name,value);
        this.setState({
            [name]: value
        });
        //console.log(this.state);
    }
    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.addComment();
        this.setState({
            author: "",
            text: ""
        });
    }
    addComment() {
        let dateObj = new Date();
        //let dateString = dateObj.getUTCFullYear() + "-" + dateObj.getUTCMonth() + "-" + dateObj.getUTCDay();
        let dateString = dateObj.toJSON();
        let num = parseInt(this.props.commentsLength) + 1;
        let newComment = { "num":num , "date": dateString , "author": this.state.author , "text": this.state.text };
        //console.log(Datas);
        Datas.forEach((item,key) => {
            if(item.num === this.props.itemNum) {
                item.comments.push(newComment);
            }
        });
        console.log(JSON.stringify(Datas));
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
