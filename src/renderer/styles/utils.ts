import { createStitches } from "@stitches/react";
import { createTailwindConfig } from "@stitches/tailwind";
import * as utilsTailwind from "@stitches/tailwind/utils";
import * as themeTailwind from "@stitches/tailwind/theme";
import colors from "./colors";

export const { styled, css } = createStitches({
	utils: {
		m: (value: any) => ({
			margin: value,
		}),
		mt: (value: any) => ({
			marginTop: value,
		}),
		mr: (value: any) => ({
			marginRight: value,
		}),
		mb: (value: any) => ({
			marginBottom: value,
		}),
		ml: (value: any) => ({
			marginLeft: value,
		}),
		mx: (value: any) => ({
			marginLeft: value,
			marginRight: value,
		}),
		my: (value: any) => ({
			marginTop: value,
			marginBottom: value,
		}),

		size: (value: any) => ({
			width: value,
			height: value,
		}),

		linearGradient: (value: any) => ({
			backgroundImage: `linear-gradient(${value})`,
		}),

		br: (value: any) => ({
			borderRadius: value,
		}),
	},
	theme: {
		colors: colors,
	},
	media: {
		bp1: '(min-width: 480px)',
	},
});

// const config = createTailwindConfig({
// 	screens: {
// 		tablet: (cssRule: any) => `@media (min-width: 768px) { ${cssRule} }`,
// 		laptop: (cssRule: any) => `@media (min-width: 1024px) { ${cssRule} }`,
// 	},
// 	theme: {
// 		...theme,
// 		container: {
// 			center: false,
// 		},
// 	},
// 	utils: utils,
// });

// export const tailwind = createStitches(config);