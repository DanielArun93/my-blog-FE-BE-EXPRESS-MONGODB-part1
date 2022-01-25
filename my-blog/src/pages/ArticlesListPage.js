import React from "react";
import articles from "./ArticleContentMock";
import { Link } from "react-router-dom";
import ArticleContentMock from './ArticleContentMock';
import ArticleListComponent from "./Components/ArticleListComponent";

const ArticlesListPage = () => {
    return (
        <>
            <ArticleListComponent articles={ArticleContentMock}/>
        </>
    );
};

export default ArticlesListPage;