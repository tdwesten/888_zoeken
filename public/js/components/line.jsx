import React, { PropTypes } from 'react';

require( './line.scss' );

function createMarkup( html ) {
    return { __html: html };
}

export const Line = ( { line, serie } ) => {
    const start_at = "?start_at=" + (parseInt( line._source.start ) - 25);
    const cue = line.highlight['cues.text'][0];
    const slug = serie._source.serieName.replace(/\s+/g, '-').toLowerCase();
    const time = new Date( serie._source.broadcasted_at * 1000 );
    const date = ("0" + time.getDate()).slice(-2) + '-' + ("0" + (time.getMonth() + 1)).slice(-2) + '-' + time.getFullYear();
    return (<li>
            <a href={'http://www.npo.nl/' + slug + '/' + date + '/' + serie._source.nebo_id + start_at } target="blank" dangerouslySetInnerHTML={createMarkup(cue)}/>

    </li>);
};


Line.propTypes = {
    line: PropTypes.object,
    serie: PropTypes.object
};

Line.defaultProps = {
    line: {},
    serie: {}
};

export default Line;