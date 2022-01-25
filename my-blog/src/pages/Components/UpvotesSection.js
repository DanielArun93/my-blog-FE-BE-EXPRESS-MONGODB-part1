import React from "react";

const UpvotesSection = ({ upvotes, articleName, setArticleInfo }) => {
    const handleAddUpvotes = async () => {
        const result = await fetch(`/api/article/${articleName}/upvote`, {
            method: 'POST'
        });
        const body = await result.json();
        setArticleInfo(body);
    }
    return (
        <div className="upvotes-section">
            <button onClick={() => handleAddUpvotes()}>Add Upvote</button>
            <p>This Article has upvoted {upvotes} times</p>
        </div>
    );
;} 

export default UpvotesSection;