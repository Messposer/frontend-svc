import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />

const Loading = (props) => {
	const { align, cover } = props
	return (
		<div className={`loading mt-5 text-${align} cover-${cover}`}>
			<Spin indicator={Icon} /> Loading Layout...
		</div>
	)
}

Loading.propTypes = {
	size: PropTypes.string,
	cover: PropTypes.string
}

Loading.defaultProps = {
	align: 'center',
	cover: 'inline'
};

export default Loading