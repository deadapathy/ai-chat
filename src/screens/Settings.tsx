import {
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
	View,
	Appearance,
} from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import Text from '../components/Text';
import { colors } from '../theme/colors';
import { setTheme } from '../store/asyncStore';

const Settings = () => {
	const { t } = useTranslation();
	const colorScheme = useColorScheme() || 'light';
	const [checked, setChecked] = useState(false);

	const handleCheckboxPress = async () => {
		const newTheme = checked ? 'light' : 'dark';
		setChecked(!checked);
		Appearance.setColorScheme(newTheme);
		setTheme(newTheme);
	};

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors[colorScheme].background },
			]}
		>
			<View style={styles.content}>
				<TouchableOpacity onPress={handleCheckboxPress} style={styles.checkbox}>
					<Text size="large" bold="500">
						{t('darkMode')}
					</Text>
					<AnimatedCheckbox
						checked={checked}
						highlightColor="#0285FE"
						checkmarkColor="#ffffff"
						boxOutlineColor="#0285FE"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 20,
	},
	checkbox: {
		height: 34,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 30,
	},
});

export default Settings;
