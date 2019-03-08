import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  Table,
} from 'reactstrap';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import Actions from './Actions';

const TableStyled = styled(Table)` 
  background-color: #fff;
  tr:hover{
    color: #009fd4;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  }
  td:hover{
    color: #009fd4;
  }
`;

class PollList extends React.Component {
  notify = (message) => {
    /*
        if (message) {
      toast.info(message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    */
  };


  render() {
    const { polls, message, deletePoll } = this.props;
    return (
      <>
        {this.notify(message)}
        <ToastContainer autoClose={2000} />
        <TableStyled hover responsive>
          <thead>
            <tr>
              <th>Anket Başlığı</th>
              <th>Anket Adresi</th>
              <th>Tarih</th>
              <th>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {polls && polls.length > 0 && (
              polls.map(item => (
                <tr key={item._id}>
                  <td dangerouslySetInnerHTML={{ __html: item.name }} />
                  <td>{item.slug}</td>
                  <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                  <td>
                    <Actions _id={item._id} slug={item.slug} deletePoll={deletePoll} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableStyled>
      </>
    );
  }
}

PollList.propTypes = {
  deletePoll: PropTypes.func.isRequired,
  polls: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
};

export default PollList;
