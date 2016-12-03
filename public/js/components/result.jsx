import React, { PropTypes } from 'react';
import { Line } from './line.jsx';

require( './result.scss' );

export const Result = ( { result } ) => {
    let lines = result.inner_hits.cues.hits.hits;

    const linesNode = lines.map( ( line, index ) => {
        return (<Line line={ line } serie={result} key={line._score + index }/> )
    } );

    return (
        <div>
            <h3>{result._source.serieName}</h3>
            <p>{result._source.serieDescription}</p>
            <ul>
                { linesNode }
            </ul>
        </div>
    );
}


Result.propTypes = {
    result: PropTypes.object
};

Result.defaultProps = {
    result: {}
};

export default Result;