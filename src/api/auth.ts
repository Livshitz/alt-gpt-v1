import di from '../di/container';
import { IAuthProvider } from '../auth/IAuthProvider';

export async function handleLoginRequest(req: Request): Promise<Response> {
	if (req.method !== 'POST') {
		return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
	}
	let body: any;
	try {
		body = await req.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
	const { credentials } = body;
	const auth = di.get<IAuthProvider>('auth');
	const result = await auth.login(credentials);
	return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
}

export async function handleGetUserRequest(req: Request): Promise<Response> {
	const authHeader = req.headers.get('authorization');
	if (!authHeader) {
		return new Response(JSON.stringify({ error: 'Missing Authorization header' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
	}
	const token = authHeader.replace(/^Bearer /i, '');
	const auth = di.get<IAuthProvider>('auth');
	const user = await auth.getUser(token);
	return new Response(JSON.stringify({ user }), { headers: { 'Content-Type': 'application/json' } });
}

export async function handleLogoutRequest(req: Request): Promise<Response> {
	if (req.method !== 'POST') {
		return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
	}
	const authHeader = req.headers.get('authorization');
	if (!authHeader) {
		return new Response(JSON.stringify({ error: 'Missing Authorization header' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
	}
	const token = authHeader.replace(/^Bearer /i, '');
	const auth = di.get<IAuthProvider>('auth');
	await auth.logout(token);
	return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
}
