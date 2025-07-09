import { Dimensions } from 'react-native';

export type TTheme = 'light' | 'dark';
const { height } = Dimensions.get('screen');

export const fontSize = {
	small: height * 0.014,
	body: height * 0.016,
	normal: height * 0.018,
	large: height * 0.022,
	extra: height * 0.024,
};

export const colors = {
	light: {
		background: '#FEFEFE',
		text: '#242424',
		input: '#FEFEFE',
		activeDrawerBackground: '#F4F4F4',
		backgroundUserMessage: '#F4F4F4',
	},
	dark: {
		background: '#242424',
		text: '#FFF',
		input: '#303030',
		activeDrawerBackground: '#303030',
		backgroundUserMessage: '#303030',
	},
};
