import { configure } from '@storybook/react';
import '~css/index.css';

function loadStories() {
  require('../storybook/stories');
}

configure(loadStories, module);
