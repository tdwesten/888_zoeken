import React, { PropTypes } from 'react';

// require( './result.scss' );

export const ResultCount = ( { total, search_action } ) => {
    let mgs = false;

    if ( total > 0 && search_action) {
        mgs = total + ' Resultaten gevonden';
    } else if ( total === 0 && search_action ) {
        mgs = 'Geen resultaten gevonden, bammmer...';
    } else {
        return null;
    }

    return (
        <div>
            { mgs }
        </div>
    );
}


ResultCount.propTypes = {
    total: PropTypes.number,
    search_action: PropTypes.bool
};

ResultCount.defaultProps = {
    total: 0,
    search_action: false
};

export default ResultCount;
