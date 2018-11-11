import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../img/avatar.png';

const Avatar = ({addedClass, source}) => {
	const avatar = (source) ? source : defaultAvatar;
	return (
		<img className={"avatar " + addedClass} src={avatar} />
	)
};

Avatar.propTypes = {
	addedClass: PropTypes.string,
	src: PropTypes.string,
}

export default Avatar;