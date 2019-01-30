import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Paginate extends React.Component {
  constructor() {
    super();
    this.state = {
      pageCount: 0,
    };
    this.createPaginateItems = this.createPaginateItems.bind(this);
  }

  createPaginateItems = (pageCount, handlePageChange) => {
    const paginationItems = [];
    // Outer loop to create parent
    for (let i = 0; i <= pageCount; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={e => handlePageChange(e.target.value)} value={i}>{i}</PaginationLink>
        </PaginationItem>,
      );
    }
    return paginationItems;
  };

  render() {
    const { pageCount, handlePageChange } = this.props;
    return (
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled>
          <PaginationLink previous />
        </PaginationItem>
        {this.createPaginateItems(pageCount, handlePageChange)}
        <PaginationItem>
          <PaginationLink next />
        </PaginationItem>
      </Pagination>
    );
  }
}

export default Paginate;
