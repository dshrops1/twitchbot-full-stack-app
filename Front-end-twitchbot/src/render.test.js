import React from 'react';
import CreatQuote from './components/CreateQuote'
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

it('renders', () => {
    const wrapper = shallow(<CreatQuote/>);
    expect(wrapper.find('#tester').text()).toEqual("<WithStyles(Button) />");
});

