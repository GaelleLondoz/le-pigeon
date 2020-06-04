import React from 'react';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const PaginationList = ({ reviewsPerPage, totalReviews, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
        pageNumbers.push(i);
    }


    const handleChange = (event, value) => {
        setPage(value);
        paginate(value)
    };

    const [page, setPage] = React.useState(1);
    return (

        <>
            <Pagination

                page={page}
                count={pageNumbers.length}
                onChange={handleChange}
            // renderItem={(item) => (
            //     <PaginationItem
            //         onClick={paginnateNumber(item)}
            //     />
            // )}
            />
            {/* <ul className='pagination'>
                {pageNumbers.map(number => (
                    // <li key={number} className='page-item'>
                    //     <a onClick={(e) => paginate(number)} className='page-link'>
                    //         {number}
                    //     </a>
                    // </li>
                  
                ))}
            </ul> */}

        </>


    );
};

export default PaginationList;