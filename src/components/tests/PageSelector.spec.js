import React from 'react';
import { shallow } from 'enzyme';
import PageSelector from '../PageSelector';
import Avatar from '../Avatar';

describe('PageSelector', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
				<PageSelector 
					onChange={jest.fn()}
					pageId={1234}
					pageName="test"
					isSelected={false}
				/>
			);
	});

	it('should render a <div />', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
	it('should have a "page-selector" wrapper class', () => {
		expect(wrapper.find('div').hasClass('page-selector'));
	});
	it('should have the class passed as prop', () => {
		wrapper.setProps({addedClass: 'test-class'});
		expect(wrapper.find('div').hasClass('test-class')).toEqual(true);
	});
	it('should render a <Avatar />', () => {
		expect(wrapper.containsMatchingElement(<Avatar />)).toEqual(true);
	});
	it('should render a <label />', () => {
		expect(wrapper.find('label').length).toEqual(1);
	});
	it('should render an <input />', () => {
		expect(wrapper.find('input').length).toEqual(1);
	});
	it('should contain a label with the text passed as prop', () => {
		expect(wrapper.find('label').text()).toEqual('test');
	});
	it('should render an <input /> with type checkbox', () => {
		expect(wrapper.find('input[type="checkbox"]').length).toEqual(1);
	});
	it('should render an unchecked <input />', () => {
		expect(wrapper.find('input').props().checked).toEqual('');
	});
	it('should have the function passed as prop', () => {
		const passedFunction = jest.fn();
		wrapper.setProps({onChange: passedFunction});
	    wrapper.find('input').simulate('change');
	    expect(passedFunction).toHaveBeenCalledTimes(1);
	});
});