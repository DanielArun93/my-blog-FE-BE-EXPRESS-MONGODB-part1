import React, {useState, useEffect} from "react";

const AddCommentsForm = ({ name, setArticleInfo}) => {
    const [userName, setUserName] = useState('');
    const [commentText, setCommentText] = useState('');

    const hanldeSubmit = async () => {
        const result = await fetch(`/api/article/${name}/add-comment`, {
            method: 'POST',
            body: JSON.stringify({ username:userName, text: commentText}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const body = await result.json();
        setArticleInfo(body);
        setUserName('');
        setCommentText('');
    };

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Username:
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </label>
            <label>
                Comment:
                <textarea rows="4" cols="50" value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
            </label>
            <button onClick={hanldeSubmit}>Submit</button>
        </div>
    );
};

export default AddCommentsForm;