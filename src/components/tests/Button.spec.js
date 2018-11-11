import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

describe('Button', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
				<Button 
					onClick={jest.fn()}
					text="test"
				/>
			);
	});

	it('should render a <button />', () => {
		expect(wrapper.find('button').length).toEqual(1);
	});
	it('should have a "button" class', () => {
		expect(wrapper.find('button').hasClass('button'));
	});
	it('should have the class passed as prop', () => {
		wrapper.setProps({addedClass: 'test-class'});
		expect(wrapper.find('button').hasClass('test-class')).toEqual(true);
	});
	it('should be of type "button" if a type is not passed as prop', () => {
		expect(wrapper.find('button[type="button"]').length).toEqual(1);
	});
	it('should be of the type passed as prop', () => {
		wrapper.setProps({buttonType: 'submit'});
		expect(wrapper.find('button[type="submit"]').length).toEqual(1);
	});
	it('should have the function passed as prop', () => {
		const passedFunction = jest.fn();
		wrapper.setProps({onClick: passedFunction});
	    wrapper.find('button').simulate('click');
	    expect(passedFunction).toHaveBeenCalledTimes(1);
	});
});