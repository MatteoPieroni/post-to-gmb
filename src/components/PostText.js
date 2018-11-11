import React from 'react';
import PropTypes from 'prop-types';

const PostText = ({addedClass, labelText, onChange, error, numberChar, numberCharMax}) => {
	const countChars = function() {
		if (numberChar && numberCharMax)
			return (<span className="number-char">{numberChar}/{numberCharMax}</span>);
	};
	const errorMessage = function() {
		if (error)
			return (<span className="error upload__error">{error}</span>);
	};
	return (
		<div className={addedClass}>
			<label htmlFor="post-text">{labelText}</label>
			<textarea name="post-text" id="post-textarea" onChange={onChange}></textarea>
			{countChars()}
			{errorMessage()}
		</div>
	)
};

PostText.propTypes = {
	addedClass: PropTypes.string,
	labelText: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	numberChar: PropTypes.number,
	numberCharMax: PropTypes.number,
	error: PropTypes.string,
}

export default PostText;