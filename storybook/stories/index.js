import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';

import InputBox from '~components/PollEditor/Shared/InputBox';

storiesOf('InputBox', module)
  .addDecorator(centered)
  .add('InputBox', () => <InputBox onClick={action('clicked')} />);
