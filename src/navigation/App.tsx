import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../screens/Main';
import Settings from '../screens/Settings';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getTheme } from '../store/asyncStore';
import { Appearance, useColorScheme } from 'react-native';
import { colors } from '../theme/colors';

const Drawer = createDrawerNavigator();

function RootStack() {
	const { t } = useTranslation();
	const colorScheme = useColorScheme() || 'light';

	useEffect(() => {
		getTheme().then((theme) => {
			Appearance.setColorScheme(theme as 'light' | 'dark');
		});
	}, []);

	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: colors[colorScheme].background,
				},
				headerTintColor: colors[colorScheme].text,
				drawerStyle: {
					backgroundColor: colors[colorScheme].background,
				},
				drawerActiveBackgroundColor: colors[colorScheme].activeDrawerBackground,
				drawerActiveTintColor: colors[colorScheme].text,
				drawerInactiveTintColor: colors[colorScheme].text,
			}}
		>
			<Drawer.Screen name="AI Chat" component={Main} />
			<Drawer.Screen name={t('settings')} component={Settings} />
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<RootStack />
		</NavigationContainer>
	);
}
