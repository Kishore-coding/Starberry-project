import React from "react";

function Filter({ filterData }) {
  return (
    <React.Fragment>
      <div className="filter-container">
        <p style={{ border: "1px ridge lightgrey" }}></p>
        <ul className="filter-list">
          <li>All Bedrooms</li>
          <li>Any Neighbourhood</li>
          <li>Min Price</li>
          <li>Max Price</li>
          <li>Sort by</li>
          <li> {filterData?.length} Results</li>
        </ul>
        <p style={{ border: "1px ridge lightgrey" }}></p>
      </div>
    </React.Fragment>
  );
}

export default Filter;
