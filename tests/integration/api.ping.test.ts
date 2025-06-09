import { server } from '../../src/api';

const fetch = globalThis.fetch || require('node-fetch');

describe('/v1/ping endpoint', () => {
	it('should return pong', async () => {
		// Simulate a request to the handler
		const req = new Request('http://localhost/v1/ping');
		const res = await server(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data).toEqual({ message: 'pong' });
	});
}); 