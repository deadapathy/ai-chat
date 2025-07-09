import { SafeAreaView, StyleSheet } from 'react-native';
import App from './App';

export default function Navigation() {
	const styles = StyleSheet.create({
		safeArea: {
			flex: 1,
			//   backgroundColor: colors[currentTheme].background,
		},
	});

	return (
		<SafeAreaView style={styles.safeArea}>
			<App />
		</SafeAreaView>
	);
}
