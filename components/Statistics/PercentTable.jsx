import React, { Component } from 'react';
import _ from 'lodash';

import { Table, Badge } from 'reactstrap';
import { ContentViewer } from '../Shared';

class PercentTable extends Component {
  constructor() {
    super();
    this.state = {
      headerCount: 0,
    };
  }

  render() {
    const { questions, answers } = this.props.poll;
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
            <tr>
              <td>
                <ContentViewer type={question.type} content={question.content} />
              </td>
              {answers && answers.filter(answer => answer.questionOrder === question.order).reverse().map((answer, index) => (
                  <>
                    <td>
                      <ContentViewer type={answer.type} content={answer.content} />
                      {' '}
                      <Badge color="info">
                        {`Cevaplanma Sayısı: ${answer.count}`}
                      </Badge>
                      <Badge color="primary">
                        {`Oran: %${answer.count > 0 ? Math.round((answer.count / question.count) * 100) : 0}`}
                      </Badge>
                    </td>
                  </>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default PercentTable;
