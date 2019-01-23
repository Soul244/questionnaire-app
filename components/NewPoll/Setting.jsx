import React from 'react';
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';

import {
  Button, CustomInput, FormGroup, Label, Input,
} from 'reactstrap';
import styled from 'styled-components';
import Icon, { question, remove3 } from '../../css/icons';

const InputShowAble = styled(Input)`
  display: ${props => (props.show ? 'block' : 'none')};
  margin-top: 0.4rem;
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const ButtonStyled = styled(Button)`
  width: 24px;
  height: 24px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  background: aliceblue;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  border-radius: 8px;
  padding: 0.75rem;
`;

const Text = styled.p` 
  font-size: 0.75rem;
`;

const FormGroupStyled = styled(FormGroup)`
  position: initial !important;
`;

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv1(),
      show: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    const {
      value,
      labels,
      name,
      header,
      onChange,
      hasInput,
      inputValue,
      inputChange,
      inputPlaceHolder,
      tooltip,
      info,
    } = this.props;
    const { id, show } = this.state;
    return (
      //  checked needs refactor for string paramaters - it's not a good solution
      <FormGroupStyled id={id}>
        <HeaderContainer>
          <Label>{header}</Label>
          <ButtonStyled type="button" onClick={this.toggle}>
            <Icon
              size="14px"
              icon={question}
              style={{
                display: 'inline-block',
                marginBottom: '4px',
              }}
            />
          </ButtonStyled>
        </HeaderContainer>
        <InfoContainer show={show}>
          <HeaderContainer>
            <Label>Detaylı Bilgi</Label>
            <ButtonStyled type="button" color="danger" onClick={this.toggle}>
              <Icon
                size="16px"
                icon={remove3}
                style={{
                  display: 'inline-block',
                  marginBottom: '4px',
                }}
              />
            </ButtonStyled>
          </HeaderContainer>
          <Text>
            {info}
          </Text>
        </InfoContainer>
        <div>
          <CustomInput
            type="radio"
            id={`${name}True`}
            name={name}
            label={labels[0]}
            checked={
              value === true || value === 'sideBySide' || value === 'test' || value === 'form'
            }
            value={value}
            onChange={onChange}
          />
          <CustomInput
            type="radio"
            id={`${name}False`}
            name={name}
            label={labels[1]}
            checked={value === false || value === 'full' || value === 'poll' || value === 'anonim'}
            value={value}
            onChange={onChange}
          />
          {hasInput && (
            <InputShowAble
              type="number"
              placeholder={inputPlaceHolder}
              show={value ? 1 : 0}
              defaultValue={inputValue}
              value={inputValue}
              onChange={inputChange}
            />
          )}
        </div>
        {/* <UncontrolledTooltip placement="bottom" target={id}>{tooltip}</UncontrolledTooltip> */}
      </FormGroupStyled>
    );
  }
}

Setting.defaultProps = {
  header: '',
  labels: ['Evet', 'Hayır'],
  hasInput: false,
  inputValue: '',
  inputChange: undefined,
  inputPlaceHolder: '',
  value: undefined,
  tooltip: '',
  info: '',
};

Setting.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string.isRequired,
  labels: PropTypes.array,
  tooltip: PropTypes.string,
  header: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hasInput: PropTypes.bool,
  inputValue: PropTypes.string,
  inputChange: PropTypes.func,
  inputPlaceHolder: PropTypes.string,
  info: PropTypes.string,
};

export default Setting;
