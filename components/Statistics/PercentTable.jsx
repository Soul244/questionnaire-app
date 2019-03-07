import React from 'react';

import { Table, Badge } from 'reactstrap';
import { ContentViewer } from '../Shared';


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
                 <Badge color="info">
                   {`Cevaplanma Sayısı: ${answer.count}`}
                 </Badge>
                 <Badge color="primary">
                   {`Oran: %${answer.count > 0 ? Math.round((answer.count / question.count) * 100) : 0}`}
                 </Badge>
               </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PercentTable;
