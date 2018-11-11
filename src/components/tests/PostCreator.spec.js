import React from 'react';
import { shallow } from 'enzyme';
import PostCreator from '../PostCreator';

import Select from 'react-select';

import {button} from '../../constants';
import Upload from '../Upload';
import PostText from '../PostText';
import Button from '../Button';

describe('PostCreator', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
				<PostCreator
					uploadImage={jest.fn()}
				/>
			);
	});

	it('should render a <div />', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
	it('should render a <form />', () => {
		expect(wrapper.find('form').length).toEqual(1);
	});
	it('should render an <Upload /> element', () => {
		expect(wrapper.containsMatchingElement(<Upload />)).toEqual(true);
	});
	it('should render a <PostText /> element', () => {
		expect(wrapper.containsMatchingElement(<PostText />)).toEqual(true);
	});
	it('should render a <Select /> element', () => {
		expect(wrapper.containsMatchingElement(<Select />)).toEqual(true);
	});
	it('should render a <Button /> element', () => {
		expect(wrapper.containsMatchingElement(<Button />)).toEqual(true);
	});
	it('should initiate with no selected option in the state', () => {
		expect(wrapper.state('selectedOption')).toEqual({value: button.notSpecified,label: 'Choose button (optional)'});
	});
	it('should trigger its method when <Select> changes', () => {
	    const selectMethod = jest.spyOn(wrapper.instance(), "onChangeSelect");
	    wrapper.instance().forceUpdate();
	    wrapper.find(Select).simulate('change');
	    expect(selectMethod).toHaveBeenCalledTimes(1); 
  		selectMethod.mockRestore();
	});
	it('should change selected option in state when <Select> changes', () => {
	    const selectMethod = jest.spyOn(wrapper.instance(), "onChangeSelect");
	    wrapper.instance().forceUpdate();
	    wrapper.find(Select).simulate('change', "none");
		expect(wrapper.state('selectedOption')).toEqual("none");
  		selectMethod.mockRestore();
	});
	it('should trigger the form method onSubmit', () => {
		const passedFunction = jest.fn();
		wrapper.setProps({onSubmit: passedFunction});
		wrapper.find('form').simulate('submit');
		expect(passedFunction).toHaveBeenCalledTimes(1);
	});
});