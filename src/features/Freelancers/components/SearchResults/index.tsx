
import { Switch } from "antd";

SearchResults.propTypes = {};

function SearchResults() {
    return (
        <div className="mb-10 SearchResults">
            <p className="text-xl">Search Results</p>
            <div className="flex px-6 py-4 bg-gray-100 SearchResults__sort">
                <div className="justify-start flex-auto">
                    <span>
                        <Switch />
                    </span>
                    <span className="pl-3 text-base text-gray-500">
                        Turn on email alerts for this search
                    </span>
                </div>
                <div className="flex justify-end">
                    <span className="pr-3 text-base text-gray-500">
                        Sort by:
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
