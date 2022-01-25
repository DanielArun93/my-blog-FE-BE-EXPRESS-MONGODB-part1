import React, {useState, useEffect} from "react";
import ArticleContentMock from './ArticleContentMock';
import ArticleListComponent from "./Components/ArticleListComponent";
import CommentsList from "./Components/CommentsListComponent";
import UpvotesSection from "./Components/UpvotesSection";
import AddCommentsForm from "./Components/AddCommentForm";

const ArticlePage = ({match }) => {
    const name = match.params.name;
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/article/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    const article = ArticleContentMock.find(article => article.name === name);
    const otherArticle = ArticleContentMock.filter(article => article.name !== name);
    return (
        <>
            <h1>{article.title}</h1>
            <UpvotesSection articleName={name} setArticleInfo={setArticleInfo} upvotes={articleInfo.upvotes}/>
            {article.content.map((para, key) => {
                return <p key={key}>{para}</p>
            })}
            <CommentsList comments={articleInfo.comments} />
            <AddCommentsForm name={name} setArticleInfo={setArticleInfo}/>
            <h2>Other Articles</h2>
            <ArticleListComponent articles={otherArticle} />
        </>
    );
};

export default ArticlePage;