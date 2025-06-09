import { IHistoryProvider } from './IHistoryProvider';

const mockDb: Record<string, any[]> = {};

export const mockHistoryProvider: IHistoryProvider = {
	async saveHistory(userId, conversation) {
		if (!mockDb[userId]) mockDb[userId] = [];
		mockDb[userId].push(conversation);
	},
	async getHistory(userId) {
		return mockDb[userId] || [];
	},
}; 