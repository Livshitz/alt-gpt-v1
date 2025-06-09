import di from '../di/container';
import { ILlmProvider } from '../llm/ILlmProvider';

export async function handleChatRequest(req: Request): Promise<Response> {
	if (req.method !== 'POST') {
		return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
	}
	let body: any;
	try {
		body = await req.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
	}
	const { messages, options } = body;
	const llm = di.get<ILlmProvider>('llm');
	const result = await llm.chat(messages, options);
	return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
} 