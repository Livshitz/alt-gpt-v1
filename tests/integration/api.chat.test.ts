import { server } from '../../src/api';

describe('/v1/chat endpoint', () => {
	it('should return a mock response', async () => {
		const req = new Request('http://localhost/v1/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] })
		});
		const res = await server(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.response).toBe('This is a mock response.');
		expect(data.usage).toBeDefined();
	});
}); 