import React from 'react';
import { shallow } from 'enzyme';

import LoginOnGoogle from '../LoginOnGoogle';
import Button from '../Button';

describe('LoginOnGoogle', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(
				<LoginOnGoogle 
					clientReady={jest.fn()}
					clientNotReady={jest.fn()}
				/>
			);
	});

	it('should return true by default', () => {
		expect(wrapper.html()).toEqual(null);
	});
	it('if state is logged in is false it should render a <Button /> element', () => {
		wrapper.setState({loggedIn: false});
		expect(wrapper.containsMatchingElement(<Button />)).toEqual(true);
	});
});