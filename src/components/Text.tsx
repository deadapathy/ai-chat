import React, { ReactElement } from 'react';
import { Text as CustomText, StyleSheet, useColorScheme } from 'react-native';
import { colors, fontSize } from '../theme/colors';

interface Props {
	children: string | string[] | ReactElement;
	size?: 'body' | 'small' | 'normal' | 'large' | 'extra';
	bold?: '100' | '200' | '300' | '400' | '500' | '600' | 'normal';
	color?: string;
	center?: boolean;
}

export default function Text({
	children,
	size = 'normal',
	bold,
	color,
	center,
}: Props) {
	const currentTheme = useColorScheme() || 'light';
	const styles = StyleSheet.create({
		main: {
			fontWeight: bold,
			fontSize: fontSize[size],
			textAlign: center ? 'center' : 'left',
			justifyContent: 'center',
			alignItems: 'center',
			color: color ? color : colors[currentTheme].text,
		},
	});

	return <CustomText style={styles.main}>{children}</CustomText>;
}
