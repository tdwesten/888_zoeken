import React, { PropTypes } from 'react';

require( './searchForm.scss' );

export const SearchForm = ( { doSearch, query } ) => {
    let input;
    return (
        <form onSubmit={(e) => {
        e.preventDefault();
        doSearch(input.value);
      }} className="searchform">
            <input autoFocus ref={node => { input = node; }} placeholder="Keyword + Enter" defaultValue={ query || '' } />
            <br />
        </form>
    );
};


SearchForm.propTypes = {
    doSearch: PropTypes.func,
    query: PropTypes.string,
};

SearchForm.defaultProps = {
    doSearch: null,
    query: ''
};

export default SearchForm;