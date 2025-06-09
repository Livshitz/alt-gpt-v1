import { IAuthProvider } from './IAuthProvider';

export const mockAuthProvider: IAuthProvider = {
	async login(credentials) {
		return { token: 'mock-token', user: { id: 'mock-user', name: 'Mock User' } };
	},
	async logout(token) {
		// No-op for mock
	},
	async getUser(token) {
		return { id: 'mock-user', name: 'Mock User' };
	},
}; 