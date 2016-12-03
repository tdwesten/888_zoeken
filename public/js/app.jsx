import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import { ResultList } from './components/resultList.jsx';
import { SearchForm } from './components/SearchForm.jsx';

require( './../scss/style.scss' );

window.id = 0;

class SearchApp extends React.Component {
    constructor( props ) {
        // Pass props to parent class
        super( props );
        // Set initial state
        this.state = {
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
                this.setState( { data: res.data } );
            } );
    }

    render() {
        // Render JSX
        return (
            <div>
                <SearchForm doSearch={this.doSearch.bind(this)}/>
                <ResultList
                    results={this.state.data}
                />
            </div>
        );
    }
}

render( <SearchApp />, document.getElementById( 'container' ) );