import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,
		background: 'transparent',
		fontFamily: "Arial",
		boxSizing: 'border-box'
	},
	"html, body": {
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
	},
	"#root": {
		padding: "20px",
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
	},
});