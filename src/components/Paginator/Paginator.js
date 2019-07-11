import React from 'react';
import './Paginator.css';

const paginator = props => (
        <div className="paginator flex-centered-column">
            {props.children}

            <div className="paginator__controls flex-centered-row">
                {props.currentPage > 1 && (
                    <button className="paginator__control"
                            onClick={props.onRequestPreviousPage}>
                                Previous
                    </button>
                )}

            {props.currentPage < props.lastPage && (
                    <button className="paginator__control"
                            onClick={props.onRequestNextPage}>
                                Next
                    </button>
                )}

            </div>
            
        </div>
    )


export default paginator;
