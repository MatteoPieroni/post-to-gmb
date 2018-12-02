import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Button = ({addedClass, buttonType = "button", onClick, text, disabled = true}) => {
	return (
		<button className={ 'button ' + addedClass } type={ buttonType } onClick={ onClick } disabled={disabled}>{text}</button>
	)
}

Button.propTypes = {
	addedClass: PropTypes.string,
	buttonType: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	text: PropTypes.string.isRequired,
};

export default Button;