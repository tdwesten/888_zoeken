import React, { PropTypes } from 'react';

require( './searchForm.scss' );

export const SearchForm = ( { doSearch } ) => {
    let input;

    return (
        <form onSubmit={(e) => {
        e.preventDefault();
        doSearch(input.value);
        // input.value = '';
      }}>
            <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />
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