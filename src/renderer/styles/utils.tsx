import { createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
	utils: {
		m: (value) => ({
			margin: value,
		}),
		mt: (value) => ({
			marginTop: value,
		}),
		mr: (value) => ({
			marginRight: value,
		}),
		mb: (value) => ({
			marginBottom: value,
		}),
		ml: (value) => ({
			marginLeft: value,
		}),
		mx: (value) => ({
			marginLeft: value,
			marginRight: value,
		}),
		my: (value) => ({
			marginTop: value,
			marginBottom: value,
		}),

		size: (value) => ({
			width: value,
			height: value,
		}),

		linearGradient: (value) => ({
			backgroundImage: `linear-gradient(${value})`,
		}),

		br: (value) => ({
			borderRadius: value,
		}),
	},
});