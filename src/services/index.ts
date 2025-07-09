import axios from 'axios';
import { TOGETHER_API_KEY } from '@env';

export const sendMessageToAI = async (message: string) => {
	const response = await axios.post(
		'https://api.together.xyz/v1/chat/completions',
		{
			model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
			messages: [
				{
					role: 'user',
					content: message,
				},
			],
		},
		{
			headers: {
				Authorization: `Bearer ${TOGETHER_API_KEY}`,
				'Content-Type': 'application/json',
			},
		}
	);

	return response;
};
