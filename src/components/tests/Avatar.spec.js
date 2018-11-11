import React from 'react';
import { shallow } from 'enzyme';
import Avatar from '../Avatar';
import testImage from './src/test.png';

import defaultAvatar from '../../img/avatar.png';

describe('Avatar', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Avatar />);
	})

	it('renders and <img> element', () => {
		expect(wrapper.find('img').length).toEqual(1);
	});
	it('has class "avatar"', () => {
		expect(wrapper.find('img').hasClass('avatar')).toEqual(true);
	});
	it('has the class passed as prop as well', () => {
		wrapper.setProps({addedClass: 'test-class'});
		expect(wrapper.find('img').some('.test-class')).toEqual(true);
	});
	it('has source default src if no prop is passed', () => {
		expect(wrapper.find('img').props().src).toEqual(defaultAvatar);
	});
	it('has source src passed as prop', () => {
		wrapper.setProps({source: testImage});
		expect(wrapper.find('img').props().src).toEqual(testImage);
	});
});