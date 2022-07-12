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

import { createTailwindConfig } from "@stitches/tailwind";
import * as utils from "@stitches/tailwind/utils";
import * as theme from "@stitches/tailwind/theme";

const config = createTailwindConfig({
  screens: {
    tablet: (cssRule: any) => `@media (min-width: 768px) { ${cssRule} }`,
    laptop: (cssRule: any) => `@media (min-width: 1024px) { ${cssRule} }`,
  },
  theme: {
    ...theme,
    container: {
      center: false,
    },
  },
  utils: utils,
});

export const tailwind = createStitches(config);