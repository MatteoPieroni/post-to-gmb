import React from 'react';
import { shallow } from 'enzyme';
import PostText from '../PostText';

describe('PostText', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
				<PostText
					onChange={jest.fn()}
				/>
			);
	});

	it('should render a wrapper <div />', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
	it('should render a <label />', () => {
		expect(wrapper.find('label').length).toEqual(1);
	});
	it('should render a <textarea />', () => {
		expect(wrapper.find('textarea').length).toEqual(1);
	});
	it('should have the class passed as prop', () => {
		wrapper.setProps({addedClass: 'test-class'});
		expect(wrapper.find('div').hasClass('test-class')).toEqual(true);
	});
	it('should have the function passed as prop onChange', () => {
		const passedFunction = jest.fn();
		wrapper.setProps({onChange: passedFunction});
	    wrapper.find('textarea').simulate('change');
	    expect(passedFunction).toHaveBeenCalledTimes(1);
	});
	it('shouldn\'t display the number of characters if no number of characters or max number of characters is passed as prop', () => {
		expect(wrapper.find('.number-char').length).toEqual(0);
	});
	it('shouldn\'t display the number of characters if only number of characters is passed as prop', () => {
		wrapper.setProps({numberChar: 45});
		expect(wrapper.find('.number-char').length).toEqual(0);
	});
	it('shouldn\'t display the number of characters if only max number of characters is passed as prop', () => {
		wrapper.setProps({numberCharMax: 45});
		expect(wrapper.find('.number-char').length).toEqual(0);
	});
	it('should display the number of characters if both number and max number of characters are passed as prop', () => {
		wrapper.setProps({numberChar: 1, numberCharMax: 2});
		expect(wrapper.find('.number-char').length).toEqual(1);
	});
	it('should display the error message if it is passed as prop', () => {
		wrapper.setProps({numberChar: 1, numberCharMax: 2});
		expect(wrapper.find('.number-char').text()).toEqual('1/2');
	});
	it('shouldn\'t display an error if no error is passed as prop', () => {
		expect(wrapper.find('.error').length).toEqual(0);
	});
	it('should display an error if it is passed as prop', () => {
		wrapper.setProps({error: 'test-error'});
		expect(wrapper.find('.error').length).toEqual(1);
	});
	it('should display the error message if it is passed as prop', () => {
		wrapper.setProps({error: 'test-error'});
		expect(wrapper.find('.error').text()).toEqual('test-error');
	});
});