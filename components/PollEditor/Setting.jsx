import React from 'react';
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
      show: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    const {
      values,
      labels,
      checkedValue,
      name,
      header,
      onChange,
      hasInput,
      inputValue,
      inputChange,
      inputPlaceHolder,
      info,
    } = this.props;
    const { id, show } = this.state;
    return (
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
        <InfoContainer show={show ? 1 : 0}>
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
            id={`${values[0] + name}`}
            type="radio"
            name={name}
            label={labels[0]}
            value={values[0]}
            checked={values[0] === checkedValue}
            onChange={onChange}
          />
          <CustomInput
            id={`${values[1] + name}`}
            type="radio"
            name={name}
            label={labels[1]}
            value={values[1]}
            checked={values[1] === checkedValue}
            onChange={onChange}
          />
          {hasInput && (
            <InputShowAble
              type="text"
              placeholder={inputPlaceHolder}
              show={values[0] ? 1 : 0}
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
  values: [true, false],
  hasInput: false,
  inputValue: '',
  inputChange: null,
  inputPlaceHolder: '',
  checkedValue: null,
  info: '',
};

Setting.propTypes = {
  values: PropTypes.array,
  name: PropTypes.string.isRequired,
  labels: PropTypes.array,
  header: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hasInput: PropTypes.bool,
  inputValue: PropTypes.string,
  inputChange: PropTypes.func,
  inputPlaceHolder: PropTypes.string,
  info: PropTypes.string,
  checkedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Setting;
