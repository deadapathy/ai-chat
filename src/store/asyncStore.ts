import AsyncStorage from '@react-native-async-storage/async-storage';

const setTheme = async (value: string) => {
	try {
		await AsyncStorage.setItem('theme', value);
	} catch (e) {
		console.error('Error saving theme:', e);
	}
};

const getTheme = async () => {
	try {
		const value = await AsyncStorage.getItem('theme');
		return value;
	} catch (e) {
		console.error('Error getting theme:', e);
	}
};

export { setTheme, getTheme };
