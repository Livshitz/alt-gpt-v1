import { server } from '../../src/api';

describe('/v1/history endpoints', () => {
	const userId = 'test-user';
	const conversation = { id: 1, messages: [{ role: 'user', content: 'Hi' }] };

	it('should save a conversation', async () => {
		const req = new Request('http://localhost/v1/history', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId, conversation })
		});
		const res = await server(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
	});

	it('should retrieve history for a user', async () => {
		const req = new Request(`http://localhost/v1/history?userId=${userId}`);
		const res = await server(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(Array.isArray(data.history)).toBe(true);
		expect(data.history.some((c: any) => c.id === conversation.id)).toBe(true);
	});
}); 