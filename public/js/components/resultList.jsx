import React, { PropTypes } from 'react';
import { Result } from './result.jsx';

require( './result.scss' );

export const ResultList = ( { results } ) => {
    if( results.total === 0 ) {
        return null;
    }

    const resultsNode = results.hits.map( ( result, index ) => {
        return (<Result result={result} key={result._id + index }/>)
    } );

    return (<div>{resultsNode}</div>);
};

ResultList.propTypes = {
    results: PropTypes.object
};

ResultList.defaultProps = {
    results: {}
};

export default ResultList;
