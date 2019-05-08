import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  Table,
  Card,
} from 'reactstrap';
import styled from 'styled-components';
import Actions from './Actions';

const TableStyled = styled(Table)` 
  background-color: #fff;
`;

function TableList({ polls, deletePoll, copyPoll }) {
  return (
    <>
      <Card>
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
                  <td>{item._id}</td>
                  <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                  <td>
                    <Actions _id={item._id} deletePoll={deletePoll} copyPoll={copyPoll} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableStyled>
      </Card>
    </>
  );
}

TableList.defaultProps = {
  polls: [],
};

TableList.propTypes = {
  deletePoll: PropTypes.func.isRequired,
  polls: PropTypes.array,
};

export default TableList;
