import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { actfetchNews, actfetchProducts } from './actions';
import routes from './routes';
import './App.css';
import "tailwindcss/tailwind.css";
import callApi from './utils/apiCaller';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends React.Component {

  componentDidMount() {
    callApi('GET', null, 'category').then(res => {
        this.props.saveProductsToStore(res.data);
    })
    callApi('GET', null, 'news').then(res => {
        this.props.saveNewsToStore(res.data);
    })
  }

  render() {
    return (
        <Router >
            <div className="App min-h-screen bg-body flex flex-col justify-between">
                <Header />
                <React.Fragment>
                    <ScrollToTop />
                    { this.showContentMenus(routes) }
                </React.Fragment>
                <Footer /> 
            </div>
        </Router>
    );
  }


  showContentMenus = (routes) => {
    var result = '';

    if (routes.length > 0) {
        result = routes.map((route, index) => {
            return  <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    ></Route>
        })  
    }
    return <Switch>{result}</Switch>
  }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        saveProductsToStore: (products) => {
            dispatch(actfetchProducts(products));
        },
        saveNewsToStore: (news) => {
            dispatch(actfetchNews(news));
        }
    }
}

export default connect(null, mapDispatchToProps)(App);
