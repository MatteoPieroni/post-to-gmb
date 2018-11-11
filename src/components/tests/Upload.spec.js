import React from 'react';
import { shallow } from 'enzyme';
import Upload from '../Upload';

describe('Upload', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
				<Upload 
					onChange={jest.fn()}
				/>
			);
	});

	it('should render a <div />', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
	it('should have a "upload" wrapper class', () => {
		expect(wrapper.find('div').hasClass('upload'));
	});
	it('should have the class passed as prop', () => {
		wrapper.setProps({addedClass: 'test-class'});
		expect(wrapper.find('div').hasClass('test-class')).toEqual(true);
	});
	it('should render a <span />', () => {
		expect(wrapper.find('span').length).toEqual(1);
	});
	it('should render a <label />', () => {
		expect(wrapper.find('label').length).toEqual(1);
	});
	it('should render an <input />', () => {
		expect(wrapper.find('input').length).toEqual(1);
	});
	it('should contain a span with a default input of "Click the button to upload a picture"', () => {
		expect(wrapper.find('span').text()).toEqual('Click the button to upload a picture');
	});
	it('should render an <input /> with type file', () => {
		expect(wrapper.find('input[type="file"]').length).toEqual(1);
	});
	it('should have the function passed as prop', () => {
		const passedFunction = jest.fn();
		wrapper.setProps({onChange: passedFunction});
	    wrapper.find('input').simulate('change');
	    expect(passedFunction).toHaveBeenCalledTimes(1);
	});
	it('should not return a span.error element if no error is passed as prop', () => {
		expect(wrapper.find('span.error').length).toEqual(0);
	});
	it('should return a span.error element if error is passed as prop', () => {
		wrapper.setProps({error: 'test error'});
		expect(wrapper.find('.error').length).toEqual(1);
	});
	it('should return a span.error element with text equal to error if it is passed as prop', () => {
		wrapper.setProps({error: 'test error'});
		expect(wrapper.find('.error').text()).toEqual('test error');
	});
});