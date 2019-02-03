import React from 'react';
import styled from 'styled-components';

const Container = styled.div` 
    display:flex;
    justify-content: center;
`;

const StepButton = styled.button` 
    border-radius: 50px;
    background-color: #fff;
    border-color: grey;
    width: 30px;
    height:30px;
    margin-left: 0.25rem;
    border: 1px solid grey;
    background-color: ${props => (props.currentStep === props.step ? '#4682B4' : '#fff')};
    color: ${props => (props.currentStep === props.step ? '#fff' : 'grey')};
    &:focus,
    &:active{
    outline-style: none; 
  }
`;

class StepWizardNav extends React.Component {
    createItems = (totalSteps, goToStep, currentStep) => {
      const items = [];
      // Outer loop to create parent
      for (let i = 1; i <= totalSteps; i += 1) {
        items.push(
          <StepButton type="button" onClick={() => goToStep(i)} step={i} currentStep={currentStep}>{i}</StepButton>,
        );
      }
      return items;
    };

    render() {
      const {
        props,
      } = this;

      return (
        <Container>
          {this.createItems(props.totalSteps, props.goToStep, props.currentStep)}
        </Container>
      );
    }
}

export default StepWizardNav;
