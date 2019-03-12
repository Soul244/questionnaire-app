import React from 'react';
import {
  Formik,
} from 'formik';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  Col, Button, FormGroup, Progress, InputGroup, Card, CardBody, Alert,
} from 'reactstrap';
import styled from 'styled-components';

import { ParticipantSchema } from '../../../validation/validationSchemas';
import { CustomInput } from '../../Shared';

const ColStyled = styled(Col)` 
 margin-top: 1rem;
`;

class Last extends React.Component {
  onClick = () => {
    const {
      participant, pollId, postParticipant,
    } = this.props;
    participant.pollId = pollId;
    participant.name = 'anonim';
    participant.surname = 'anonim';
    participant.email = 'anonim@anonim.com';
    postParticipant(participant);
  }

  render() {
    const {
      name, lastDesc, participant, pollId, userDataCollectType, type, postParticipant,
    } = this.props;
    const { answers, message } = participant;
    const answerCount = answers.length;
    const right = _.filter(answers, (item) => {
      if (item.hasRightAnswer && item.isTrue) { return item; }
    }).length;
    const wrong = _.filter(answers, (item) => {
      if (item.hasRightAnswer
      && item.isTrue === false) return item;
    }).length;
    const rightPercent = right > 0 ? Math.round((right / answerCount) * 100) : 0;
    const wrongPercent = wrong > 0 ? Math.round((wrong / answerCount) * 100) : 0;
    return (
      <Card>
        <CardBody className="text-center">
          <div dangerouslySetInnerHTML={{ __html: name }} />
          <div dangerouslySetInnerHTML={{ __html: lastDesc }} />
          {type === 'test' && (
            <>
              <Col>
                <h6>SONUÇLAR:</h6>
                <Progress multi>
                  <Progress bar color="success" value={rightPercent}>
                    {`%${rightPercent} doğru yüzdesi`}
                  </Progress>
                  <Progress bar color="danger" value={wrongPercent}>
                    {wrongPercent > 0 && (
                      `%${wrongPercent} yanlış yüzdesi`
                    )}
                  </Progress>
                </Progress>
                <hr />
              </Col>
            </>
          )}
          <Col md={{ size: 6, offset: 3 }} className="my-4">
            {userDataCollectType === 'form' && (
            <Formik
              initialValues={{
                email: '',
                name: '',
                password: '',
                surname: '',
              }}
              validationSchema={ParticipantSchema}
              onSubmit={(values) => {
                participant.pollId = pollId;
                participant.name = values.name;
                participant.surname = values.surname;
                participant.email = values.email;
                postParticipant(participant);
              }}
            >
              {(props) => {
                const {
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <InputGroup>
                        <CustomInput
                          id="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputLabel="Mail Adresi"
                          error={errors.email}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <CustomInput
                          id="name"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputLabel="İsminiz"
                          error={errors.name}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <CustomInput
                          id="surname"
                          type="text"
                          value={values.surname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputLabel="Soyadınız"
                          error={errors.surname}
                        />
                      </InputGroup>
                    </FormGroup>
                    <Button type="submit" color="info">Kayıt Ol</Button>
                    {' '}
                  </form>
                );
              }}
            </Formik>
            )}
            {userDataCollectType === 'anonim' && (
              <Button onClick={this.onClick}>Cevaplarınızı Gönderin</Button>
            )}
          </Col>
          {message && (
          <ColStyled>
            <Alert color="success">{message}</Alert>
          </ColStyled>
          )}
        </CardBody>
      </Card>
    );
  }
}

Last.defaultProps = {
  lastDesc: '',
};

Last.propTypes = {
  name: PropTypes.string.isRequired,
  lastDesc: PropTypes.string,
  participant: PropTypes.object.isRequired,
  pollId: PropTypes.string.isRequired,
  postParticipant: PropTypes.func.isRequired,
  userDataCollectType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Last;
