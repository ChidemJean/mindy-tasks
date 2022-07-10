import React, { useEffect, useRef, useState } from 'react';
import { styled } from "../styles/utils";

const ResultsArea = styled('div', {
	position: 'relative',
	display: 'flex',
   flexDirection: 'column',
	width: '100%',
	padding: '15px',
	zIndex: 1,
	color: 'white',
	userSelect: 'none',
	borderRadius: 4,
	backgroundColor: 'red',//'rgba(0,0,0,0.98)',
	boxShadow: `0 0 0 0px rgba(0,0,0,1)`,
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