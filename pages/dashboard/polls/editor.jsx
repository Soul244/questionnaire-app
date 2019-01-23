import React from 'react';

import NewPoll from '../../../containers/NewPoll';

const Editor = NewPoll;

const PollEditor = ({ slug }) => <Editor slug={slug} />;

PollEditor.getInitialProps = async (context) => {
  if (context.query !== undefined) {
    const { slug } = context.query;
    return { slug };
  }
  return {};
};

export default PollEditor;
