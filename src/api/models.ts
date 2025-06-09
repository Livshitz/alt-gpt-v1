import { RouterWrapper } from 'edge.libx.js/src/modules/RouterWrapper.js';
import { json, IRequest } from 'itty-router';
import ai from '../ai';

export default function getModelsRouter(base = '') {
	const routerWrapper = RouterWrapper.getNew(base);
	routerWrapper.router.get('/', async (req: IRequest) => {
		const models = ai.listProvidersModels();
		return json({ models });
	});
	routerWrapper.router.post('/set-key', async (req: IRequest) => json({ endpoint: 'set api key' }));
	return routerWrapper;
} 