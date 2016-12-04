import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import { ResultList } from './components/resultList.jsx';
import { SearchForm } from './components/SearchForm.jsx';
import { ResultCount } from './components/ResultCount.jsx';

require( './../scss/style.scss' );

window.id = 0;

class SearchApp extends React.Component {
    constructor( props ) {
        // Pass props to parent class
        super( props );
        // Set initial state
        this.state = {
            search_action: false,
            data: {
                hits: [],
                total: 0
            }
        };
        this.apiUrl = 'http://localhost:5000/search/s/'
    }

    // Lifecycle method
    componentDidMount() {
        // Make HTTP reques with Axios
        // axios.get( this.apiUrl )
        //     .then( ( res ) => {
        //         // Set state with result
        //         this.setState( { data: res.data } );
        //     } );
    }

    // Add results handler
    doSearch( val ) {
        // Update data
        axios.get( this.apiUrl + val )
            .then( ( res ) => {
                // this.state.data.push( res.data );
                this.setState( { data: res.data, search_action: true } );
            } );
    }

    render() {
        // Render JSX
        return (
            <div>
                <div className="container">
                    <h1>888_zoeken</h1>
                    <h3>NPO ondertitels doorzoekbaar, <span>gebouwd door <a
                        href="https://twitter.com/tdwesten">@tdwesten</a></span></h3>
                    <SearchForm doSearch={this.doSearch.bind(this)}/>
                    <ResultCount total={this.state.data.total} search_action={this.state.search_action}/>
                </div>
                <ResultList results={ this.state.data }/>
            </div>
        );
    }
}

render( <SearchApp />, document.getElementById( 'react-app' ) );