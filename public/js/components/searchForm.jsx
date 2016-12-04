import React, { PropTypes } from 'react';

require( './searchForm.scss' );

export const SearchForm = ( { doSearch } ) => {
    let input;
    return (
        <form onSubmit={(e) => {
        e.preventDefault();
        doSearch(input.value);
        // input.value = '';

      }} className="searchform">
            <input autoFocus ref={node => { input = node; }} placeholder="Keyword + Enter" />
            <br />
        </form>
    );
};


SearchForm.propTypes = {
    doSearch: PropTypes.func
};

SearchForm.defaultProps = {
    doSearch: null
};

export default SearchForm;