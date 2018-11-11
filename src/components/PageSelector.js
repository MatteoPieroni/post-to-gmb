import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import './PageSelector.css';

const PageSelector = ({addedClass, avatarSource, pageName, pageId, onChange}) => {
	const classToAdd = addedClass ? addedClass : '';

	return (
		<div className={"page-selector " + classToAdd} tabIndex="0" key={pageId}>
			<Avatar source={avatarSource} htmlFor={"check" + pageId} />
			<label htmlFor={pageId}>{pageName}</label>
			<input type="checkbox" id={pageId} onChange={onChange} checked=""></input>
		</div>
	)
};

PageSelector.propTypes = {
	addedClass: PropTypes.string,
	avatarSource: PropTypes.string,
	pageName: PropTypes.string.isRequired,
	pageId: PropTypes.string.isRequired,
}

export default PageSelector;