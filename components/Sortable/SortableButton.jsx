import React from 'react';
import {
  sortableHandle,
} from 'react-sortable-hoc';
import styled from 'styled-components';
import Icon, { arrowMove } from '../../css/icons';
import colors from '../../css/colors';

const IconContainer = styled.div`
  color: gray;
  vertical-align: text-bottom;
  display:inline-block;
  margin: 0.5rem;
  :hover{
    color: ${colors.color2};
    cursor: all-scroll;
  }
`;


const SortableButton = sortableHandle(() => (
  <IconContainer>
    <Icon size={24} icon={arrowMove} />
  </IconContainer>
));

export default SortableButton;
