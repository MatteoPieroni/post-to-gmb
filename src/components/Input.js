import React from 'react';
import PropTypes from 'prop-types';

const Input = ({addedClass, inputName, inputId, labelText, inputType, onChange, error}) => {
	const addedClassName = (addedClass) ? addedClass : '';
	const errorMessage = function() {
		if (error)
			return (<span className="error upload__error">{error}</span>);
	};
	return (
		<div className={addedClassName}>
			<label htmlFor="post-text">{labelText}</label>
			<input type={inputType} name={inputName} id={inputId} onChange={onChange} />
			{errorMessage()}
		</div>
	)
}

Input.propTypes = {
	addedClass: PropTypes.string,
	inputType: PropTypes.string.isRequired,
	inputName: PropTypes.string,
	inputId: PropTypes.string,
	labelText: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string,
}

export default Input;