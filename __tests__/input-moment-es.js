import moment from 'moment';
import React from 'react';
import renderer from 'react-test-renderer';
import InputMomentEs from '..';

test('render', () => {
  const m = moment().year(2018).month(7).date(8).hours(8).minutes(8).seconds(8);
  const component = <InputMomentEs moment={m} />;
  expect(renderer.create(component).toJSON()).toMatchSnapshot();
});
