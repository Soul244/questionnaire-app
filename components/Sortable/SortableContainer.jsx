import React from 'react';
import { sortableContainer } from 'react-sortable-hoc';

const SortableContainer = sortableContainer(({ children }) => <ul>{children}</ul>);

export default SortableContainer;
