import React from "react";
import PropTypes from "prop-types";
import { Switch } from "antd";

SearchResults.propTypes = {};

function SearchResults() {
    return (
        <div className="SearchResults mb-10">
            <p className="text-xl">Search Results</p>
            <div className="SearchResults__sort flex bg-gray-100 px-6 py-4">
                <div className="flex-auto justify-start">
                    <span>
                        <Switch />
                    </span>
                    <span className="text-base pl-3 text-gray-500">
                        Turn on email alerts for this search
                    </span>
                </div>
                <div className="flex justify-end">
                    <span className="text-base pr-3 text-gray-500">
                        Sort by:
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
