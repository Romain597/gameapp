import React , { useState } from 'react';

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

const CommentForm = (props) => {

    const [ formDatas , setFormDatas ] = useState({
            author: "",
            text: ""
        });

    const handleTextChange = (event) => {
        let name = event.target.name
        name = name.replace("comment-","");
        let value = event.target.value
        let data = {
            [name]: value
        };
        setFormDatas( { ...formDatas , ...data } )
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.addCommentMethod(formDatas.author.trim(),formDatas.text.trim())
        setFormDatas({
            author: "",
            text: ""
        });
    }

    return (
        <form className="col-6" onSubmit={handleFormSubmit}>
            <TextField id="input-author" name="comment-author" value={formDatas.author} onchange={handleTextChange} >Auteur</TextField>
            <TextArea id="input-comment" name="comment-text" value={formDatas.text} onchange={handleTextChange} >Commentaire</TextArea>
            <SubmitButton>Valider</SubmitButton>
        </form>
    );
}

export default CommentForm;
