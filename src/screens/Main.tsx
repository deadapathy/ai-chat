import React, { useState } from 'react';
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	useColorScheme,
	View,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Text from '../components/Text';
import { colors } from '../theme/colors';
import SendIcon from '../assets/send.svg';
import { sendMessageToAI } from '../services';

type Message = {
	id: string;
	role: 'user' | 'ai';
	text: string;
};

const Main = () => {
	const { t } = useTranslation();
	const colorScheme = useColorScheme() || 'light';

	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSend = async () => {
		const userMessage: Message = {
			id: Date.now().toString(),
			role: 'user',
			text: input.trim(),
		};

		setMessages((prev) => [userMessage, ...prev]);
		const userText = input.trim();
		setInput('');
		setIsLoading(true);

		try {
			const aiReply = await sendMessageToAI(userText);
			const responseText = aiReply.data.choices[0].message.content;

			setMessages((prev) => [
				{
					id: (Date.now() + 1).toString(),
					role: 'ai',
					text: responseText,
				},
				...prev,
			]);
		} catch (error) {
			console.log(error);
			setMessages((prev) => [
				{
					id: (Date.now() + 2).toString(),
					role: 'ai',
					text: t('error'),
				},
				...prev,
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			style={[
				styles.container,
				{ backgroundColor: colors[colorScheme].background },
			]}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<View style={styles.content}>
				{messages.length === 0 ? (
					<View style={styles.welcomeContainer}>
						<Text bold="600" size="large" center>
							{t('welcome')}{' '}
						</Text>
					</View>
				) : (
					<FlatList
						data={
							isLoading
								? [{ id: 'loading', role: 'ai', text: '' }, ...messages]
								: messages
						}
						inverted
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => {
							if (item.id === 'loading') {
								return (
									<View style={[styles.message]}>
										<ActivityIndicator
											size="small"
											color={colors[colorScheme].text}
											style={styles.loader}
										/>
									</View>
								);
							}

							const isUser = item.role === 'user';
							return (
								<View
									style={[
										styles.message,
										// eslint-disable-next-line react-native/no-inline-styles
										{
											alignSelf: isUser ? 'flex-end' : 'flex-start',
											backgroundColor: isUser
												? colors[colorScheme].backgroundUserMessage
												: 'transparent',
											borderRadius: 10,
										},
									]}
								>
									<Text>{item.text}</Text>
								</View>
							);
						}}
					/>
				)}
			</View>

			<View
				style={[
					styles.chatContainer,
					{ backgroundColor: colors[colorScheme].input },
				]}
			>
				<TextInput
					value={input}
					onChangeText={setInput}
					placeholder={t('enterRequest')}
					placeholderTextColor={colors[colorScheme].text}
					style={[
						styles.input,
						{
							backgroundColor: colors[colorScheme].input,
							color: colors[colorScheme].text,
						},
					]}
				/>
				{input.trim() !== '' && !isLoading && (
					<View style={styles.sendBtnContainer}>
						<TouchableOpacity
							style={styles.sendBtn}
							onPress={handleSend}
							disabled={isLoading}
						>
							<SendIcon
								width={30}
								height={30}
								fill={colors[colorScheme].text}
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	welcomeContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 20,
	},
	chatContainer: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		elevation: 5,
	},
	input: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		fontSize: 16,
	},
	sendBtnContainer: {
		position: 'absolute',
		right: 20,
		bottom: 15,
	},
	sendBtn: {
		width: 50,
		alignItems: 'flex-end',
	},
	message: {
		maxWidth: '70%',
		borderRadius: 12,
		padding: 10,
		marginBottom: 10,
	},
	loader: {
		alignSelf: 'center',
	},
});

export default Main;
