import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const Paginator = ({ currentPage, itemsByPage, length, onPageChanged }) => {
  //Calcul number of pages
  const pageCount = Math.ceil(length / itemsByPage);

  return (
    <Pagination
      count={pageCount}
      variant="outlined"
      shape="rounded"
      onChange={onPageChanged}
      page={currentPage}
    />
  );
};

Paginator.getData = (items, currentPage, itemsByPage) => {
  //Display and handle number of items by pagination
  const start = currentPage * itemsByPage - itemsByPage;
  return items.slice(start, start + itemsByPage);
};

export default Paginator;
