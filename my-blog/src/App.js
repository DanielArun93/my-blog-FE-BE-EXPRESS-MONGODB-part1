import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

class App extends React.Component {
 render() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/about"  component={AboutPage} />
          <Route path="/articles-list"  component={ArticlesListPage} />
          <Route path="/article/:name"  component={ArticlePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
 }
}

export default App;
