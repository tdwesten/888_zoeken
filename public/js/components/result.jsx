import React, { PropTypes } from 'react';
import { Line } from './line.jsx';

require( './result.scss' );

export const Result = ( { result, ga } ) => {
    let lines = result.inner_hits.cues.hits.hits;
    const time = new Date( result._source.broadcasted_at * 1000 );
    const date = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();

    const linesNode = lines.map( ( line, index ) => {
        return (<Line line={ line } serie={result} key={line._score + index } ga={ga}/> )
    } );

    return (
        <div className="result__item">
            <div className="container">
                <h3>{result._source.serieName} <span className="small">van { date }</span></h3>
                <ul>
                    { linesNode }
                </ul>
            </div>
        </div>
    );
}


Result.propTypes = {
    result: PropTypes.object,
    ga: PropTypes.object
};

Result.defaultProps = {
    result: {},
    ga: {}
};

export default Result;