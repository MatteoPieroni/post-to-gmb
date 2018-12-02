import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import {button} from '../constants';
import Upload from './Upload';
import PostText from './PostText';
import Input from './Input';
import Button from './Button';

class PostCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectOptions: [
				{
					value: button.notSpecified,
					label: 'Choose button (optional)',
				},

				{
					value: button.book,
					label: 'Book',
				},
				{
					value: button.order,
					label: 'Order',
				},
				{
					value: button.shop,
					label: 'Shop',
				},
				{
					value: button.learn,
					label: 'Learn More',
				},
				{
					value: button.signUp,
					label: 'Sign Up',
				},
				{
					value: button.getOffer,
					label: 'Get Offer',
				},
				{
					value: button.call,
					label: 'Call',
				},
			],
			selectedOption: {
					value: button.notSpecified,
					label: 'Choose button (optional)',
				},
		}

		this.onChangeSelect = this.onChangeSelect.bind(this);
	}


	onChangeSelect = (selectedOption) => {
		this.setState({ selectedOption });
	}

	render() {
		const selectedOption = this.state.selectedOption;
		const options = this.state.selectOptions;
		return (
			<div className={"post-creator__container " + this.props.addedClass}>
				<form id="postCreator" onSubmit={this.props.onSubmit}>
					<Upload onChange={this.props.uploadImage} />
					<PostText onChange={this.props.textChanged} />
					<Select
						name="post-button"
						value={selectedOption}
						onChange={this.onChangeSelect}
						options={options}
					/>
					<Input inputType="text" labelText="Button url" name="post-button-url" />
					<Button disabled={false} buttonType="submit" text="Post to your page" />
				</form>
			</div>
		)
	}
};

PostCreator.propTypes = {
	addedClass: PropTypes.string,
	uploadImage: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	textChanged: PropTypes.func,
}

export default PostCreator;