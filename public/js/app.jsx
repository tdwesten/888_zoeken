import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import axios from 'axios';

import { ResultList } from './components/resultList.jsx';
import { SearchForm } from './components/SearchForm.jsx';
import { ResultCount } from './components/ResultCount.jsx';

import ReactGA from 'react-ga';
ReactGA.initialize( 'UA-88370387-1' );

require( './../scss/style.scss' );

window.id = 0;

class SearchApp extends React.Component {
    constructor( props, context ) {
        // Pass props to parent class
        super( props );
        // Set initial state
        this.state = {
            params: props.params,
            search_action: false,
            data: {
                hits: [],
                total: 0
            }
        };
        this.apiUrl = 'http://localhost:5000/search/s/'
    }

    componentDidMount() {
        if( undefined !== this.state.params.searchQuery ) {
            this.doSearch( decodeURIComponent( this.state.params.searchQuery ) );
        }
        this.logPageView();
    }

    doSearch( val ) {
        axios.get( this.apiUrl + val )
            .then( ( res ) => {
                this.setState( {
                    data: res.data,
                    search_action: true
                } );


                if( '' !== val ) {
                    if( this.state.params.searchQuery !== val ) {
                        this.props.router.push( {
                            pathname: '/' + encodeURIComponent( val )
                        } );
                    }

                    ReactGA.event( {
                        category: 'Action',
                        action: 'Search',
                        label: val
                    } );
                }
            } );
    }

    logPageView() {
        ReactGA.set( { page: window.location.pathname } );
        ReactGA.pageview( window.location.pathname );
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>888_zoeken</h1>
                    <h3>NPO ondertitels doorzoekbaar, <span>gebouwd door <a
                        href="https://twitter.com/tdwesten">@tdwesten</a></span></h3>
                    <SearchForm doSearch={this.doSearch.bind(this)} query={this.state.params.searchQuery}/>
                    <ResultCount total={this.state.data.total} search_action={this.state.search_action}/>
                </div>
                <ResultList results={ this.state.data } ga={ReactGA}/>
            </div>
        );
    }
}
render( (
    <Router history={hashHistory}>
        <Route path="/" component={SearchApp}>
            <Route path="/:searchQuery" component={SearchApp}/>
        </Route>
    </Router>
), document.getElementById( 'react-app' ) )
