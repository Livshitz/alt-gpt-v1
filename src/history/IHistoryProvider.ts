export interface IHistoryProvider {
	saveHistory(userId: string, conversation: any): Promise<void>;
	getHistory(userId: string): Promise<any[]>;
} 