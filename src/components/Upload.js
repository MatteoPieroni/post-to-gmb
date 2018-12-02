import React from 'react';
import PropTypes from 'prop-types';

const Upload = ({addedClass, uploadValue, onChange, error}) => {
	const uploadText = (uploadValue) ? uploadValue : 'Click the button to upload a picture';
	const errorMessage = function() {
		if (error) {
			return (<span className="error upload__error">{error}</span>);
		}
	};
	return (
		<div className={"upload " + addedClass}>
			<span className="upload__label">{uploadText}</span>
			<label>Upload</label>
			<input type="file" id="file-upload" className="upload__input" onChange={onChange}></input>
			{errorMessage()}
		</div>
	)
};

Upload.propTypes = {
	addedClass: PropTypes.string,
	uploadValue: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
}

export default Upload;