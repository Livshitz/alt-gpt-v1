import server from '../../src/api';

describe('/v1/auth/login endpoint', () => {
	it('should return a mock token and user', async () => {
		const req = new Request('http://localhost/v1/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ credentials: { username: 'test', password: 'test' } })
		});
		const res = await server(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.token).toBe('mock-token');
		expect(data.user).toEqual({ id: 'mock-user', name: 'Mock User' });
	});
});

describe('/v1/auth/user endpoint', () => {
	it('should return the mock user info with valid token', async () => {
		const req = new Request('http://localhost/v1/auth/user', {
			method: 'GET',
			headers: { 'Authorization': 'Bearer mock-token' }
		});
		const res = await server(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.user).toEqual({ id: 'mock-user', name: 'Mock User' });
	});
	it('should return 401 if Authorization header is missing', async () => {
		const req = new Request('http://localhost/v1/auth/user', { method: 'GET' });
		const res = await server(req);
		expect(res.status).toBe(401);
	});
});

describe('/v1/auth/logout endpoint', () => {
	it('should return success with valid token', async () => {
		const req = new Request('http://localhost/v1/auth/logout', {
			method: 'POST',
			headers: { 'Authorization': 'Bearer mock-token' }
		});
		const res = await server(req);
		expect(res.status).toBe(200);
		const data = await res.json();
		expect(data.success).toBe(true);
	});
	it('should return 401 if Authorization header is missing', async () => {
		const req = new Request('http://localhost/v1/auth/logout', { method: 'POST' });
		const res = await server(req);
		expect(res.status).toBe(401);
	});
}); 