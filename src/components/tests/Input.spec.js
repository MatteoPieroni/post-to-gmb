import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

describe('Input', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
				<Input
					inputType="text"
				/>
			);
	});

	it('should render a wrapper <div />', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
	it('should render a <label />', () => {
		expect(wrapper.find('label').length).toEqual(1);
	});
	it('should render a <input />', () => {
		expect(wrapper.find('input').length).toEqual(1);
	});
	it('should have the class passed as prop', () => {
		wrapper.setProps({addedClass: 'test-class'});
		expect(wrapper.find('div').some('.test-class')).toEqual(true);
	});
	it('should have the type passed as prop', () => {
		wrapper.setProps({inputType: 'text'});
		expect(wrapper.find('input[type="text"]').length).toEqual(1);
	});
	it('should have the name passed as prop', () => {
		wrapper.setProps({inputName: 'test-name'});
		expect(wrapper.find('input[name="test-name"]').length).toEqual(1);
	});
	it('should have the id passed as prop', () => {
		wrapper.setProps({inputId: 'test-id'});
		expect(wrapper.find('input#test-id').length).toEqual(1);
	});
	it('should render a <label /> with the text passed as prop', () => {
		wrapper.setProps({labelText: 'Test label'});
		expect(wrapper.find('label').text()).toEqual('Test label');
	});
	it('should have the function passed as prop onChange', () => {
		const passedFunction = jest.fn();
		wrapper.setProps({onChange: passedFunction});
	    wrapper.find('input').simulate('change');
	    expect(passedFunction).toHaveBeenCalledTimes(1);
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