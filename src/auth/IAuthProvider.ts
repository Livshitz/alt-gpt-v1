export interface IAuthProvider {
	login(credentials: Record<string, any>): Promise<{ token: string; user: any }>;
	logout(token: string): Promise<void>;
	getUser(token: string): Promise<any>;
} 