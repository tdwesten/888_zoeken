import React, { PropTypes } from 'react';
require( './line.scss' );

function createMarkup( html ) {
    return { __html: html };
}

export const Line = ( { line, serie, ga } ) => {
    const start_at = "?start_at=" + (parseInt( line._source.start ) - 2);
    const cue = line.highlight[ 'cues.text' ][ 0 ];
    const slug = serie._source.serieName.replace( /\s+/g, '-' ).toLowerCase();
    const time = new Date( serie._source.broadcasted_at * 1000 );
    const date = ("0" + time.getDate()).slice( -2 ) + '-' + ("0" + (time.getMonth() + 1)).slice( -2 ) + '-' + time.getFullYear();
    return (
        <li className="line">
            -> <span dangerouslySetInnerHTML={createMarkup(cue)}/>
            <ga.OutboundLink
                eventLabel={'http://www.npo.nl/' + slug + '/' + date + '/' + serie._source.nebo_id + start_at}
                to={'http://www.npo.nl/' + slug + '/' + date + '/' + serie._source.nebo_id + start_at }
                target="_blank">
                [Kijk vanaf dit punt]
            </ga.OutboundLink>
        </li>
    );
};


Line.propTypes = {
    line: PropTypes.object,
    serie: PropTypes.object,
    ga: PropTypes.object
};

Line.defaultProps = {
    line: {},
    serie: {},
    ga: {}
};

export default Line;