import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Paginate extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      pageCount: 0,
    };
    this.createPaginateItems = this.createPaginateItems.bind(this);
  }

  createPaginateItems = (pageCount, handlePageChange) => {
    const paginationItems = [];
    // Outer loop to create parent
    for (let i = 0; i < pageCount; i += 1) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={e => handlePageChange(e.target.value)} value={i}>{i + 1}</PaginationLink>
        </PaginationItem>,
      );
    }
    return paginationItems;
  };

  componentDidMount() {
    const { itemsCount } = this.props;
    let pageCount = 1;
    if (itemsCount > 10) {
      pageCount = itemsCount / 10;
    }
    // last page
    if (itemsCount > 10 && itemsCount % 10 !== 0) {
      pageCount += 1;
    }
    this.setState({
      pageCount,
    });
  }

  render() {
    const { page, handlePageChange } = this.props;
    const { pageCount } = this.state;
    console.log(page);
    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink previous onClick={e => handlePageChange(page - 1)} />
        </PaginationItem>
        {this.createPaginateItems(pageCount, handlePageChange)}
        <PaginationItem>
          <PaginationLink next onClick={e => handlePageChange(page + 1)} />
        </PaginationItem>
      </Pagination>
    );
  }
}

export default Paginate;
