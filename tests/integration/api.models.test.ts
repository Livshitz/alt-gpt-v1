import server from '../../src/api';

describe('/v1/models endpoint', () => {
	it('should return a list of mock models', async () => {
		const req = new Request('http://localhost/v1/models', { method: 'GET' });
		const res = await server(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(Array.isArray(data.models)).toBe(true);
		expect(data.models).toContain('mock-model-1');
		expect(data.models).toContain('mock-model-2');
	});
}); 