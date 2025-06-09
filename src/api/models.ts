import di from '../di/container';
import { ILlmProvider } from '../llm/ILlmProvider';

export async function handleModelsRequest(req: Request): Promise<Response> {
	if (req.method !== 'GET') {
		return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
	}
	const llm = di.get<ILlmProvider>('llm');
	if (!llm.listModels) {
		return new Response(JSON.stringify({ models: [] }), { headers: { 'Content-Type': 'application/json' } });
	}
	const models = await llm.listModels();
	return new Response(JSON.stringify({ models }), { headers: { 'Content-Type': 'application/json' } });
} 