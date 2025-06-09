import di from '../di/container';
import { IHistoryProvider } from '../history/IHistoryProvider';

export async function handleGetHistoryRequest(req: Request): Promise<Response> {
	const url = new URL(req.url);
	const userId = url.searchParams.get('userId');
	if (!userId) {
		return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
	const history = di.get<IHistoryProvider>('history');
	const data = await history.getHistory(userId);
	return new Response(JSON.stringify({ history: data }), { headers: { 'Content-Type': 'application/json' } });
}

export async function handleSaveHistoryRequest(req: Request): Promise<Response> {
	if (req.method !== 'POST') {
		return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
	}
	let body: any;
	try {
		body = await req.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
	const { userId, conversation } = body;
	if (!userId || !conversation) {
		return new Response(JSON.stringify({ error: 'Missing userId or conversation' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
	const history = di.get<IHistoryProvider>('history');
	await history.saveHistory(userId, conversation);
	return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
} 