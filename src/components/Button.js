import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Button = ({addedClass, buttonType = "button", onClick, text}) => {
	return (
		<button className={ 'button ' + addedClass } type={ buttonType } onClick={ onClick }>{text}</button>
	)
}

Button.propTypes = {
	addedClass: PropTypes.string,
	buttonType: PropTypes.string,
	onClick: PropTypes.func,
	text: PropTypes.string.isRequired,
};

export default Button;