import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const app = TestUtils.renderIntoDocument(<App />);
});
