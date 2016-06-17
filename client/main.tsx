import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './startup/routes';

import './startup/accounts-config';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});