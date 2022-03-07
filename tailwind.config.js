module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			transitionProperty: {
				width: 'width',
				height: 'height',
				spacing: 'margin, padding',
			},
		},
	},
	plugins: [],
};
