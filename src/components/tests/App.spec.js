import React from 'react';
import { shallow } from 'enzyme';

import Select from 'react-select';

import * as Constants from '../../constants';
import App from '../App';
import LoginOnGoogle from '../LoginOnGoogle';
import PostCreator from '../PostCreator';
import Button from '../Button';

describe('App', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<App />);
	});

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});
	it('should render a wrapping <div /> and an internal div', () => {
		expect(wrapper.find('div').length).toEqual(2);
	});
	it('should render a <Select> element', () => {
		expect(wrapper.containsMatchingElement(<Select />)).toEqual(true);
	});
	it('should display a PostCreate element', () => {
		expect(wrapper.containsMatchingElement(<PostCreator />)).toEqual(true);
	});
	it('should display a LoginOnGoogle element', () => {
		expect(wrapper.containsMatchingElement(<LoginOnGoogle />)).toEqual(true);
	});
	it('should have a default state with topicType of standard', () => {
		expect(wrapper.state('topicType')).toEqual(Constants.topicType.standard);
	});
});