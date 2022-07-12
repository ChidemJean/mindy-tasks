import React, { useEffect, useRef, useState } from 'react';
import { styled } from "../styles/utils";

const ResultsArea = styled('div', {
	position: 'relative',
	display: 'flex',
   flexDirection: 'column',
	width: '100%',
	padding: '0',
	zIndex: 1,
	color: 'white',
	userSelect: 'none',
	backgroundColor: 'transparent',
	variants: {
		state: {
			open: { transform: 'translateY(0)', transition: '.4s', opacity: 1 },
			close: { transform: 'translateY(-100%)', transition: '.55s', opacity: 0 }
		}
	}
});

export const ResultsBox: React.FC<any> = ({ children, open, css }) => {
	return (
		<ResultsArea state={open ? 'open' : 'close'} css={{...css}}>
			{children}
		</ResultsArea>
	);
}