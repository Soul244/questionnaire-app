import React from 'react';
import styled from 'styled-components';

import { Table, Badge } from 'reactstrap';
import { ContentViewer } from '../Shared';

const BadgeStyled = styled(Badge)`
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;
function PercentTable({ poll }) {
  const { questions, answers } = poll;
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Soru</th>
          <th>Cevaplar</th>
        </tr>
      </thead>
      <tbody>
        {questions && questions.map((question, index) => (
          <tr key={`tr${index}`}>
            <td>
              <ContentViewer type={question.type} content={question.content} />
            </td>
            {answers && answers.filter(answer => answer.questionIndex
             === question.index).reverse().map((answer, index) => (
               <td key={`td${index}`}>
                 <ContentViewer type={answer.type} content={answer.content} />
                 {' '}
                 <BadgeStyled color="warning">
                   {`Cevaplanma Sayısı: ${answer.count}`}
                 </BadgeStyled>
                 <BadgeStyled color="primary">
                   {`Oran: %${answer.count > 0 ? Math.round((answer.count / question.count) * 100) : 0}`}
                 </BadgeStyled>
               </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PercentTable;
