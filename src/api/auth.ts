import { RouterWrapper } from 'edge.libx.js/src/modules/RouterWrapper.js';
import { json, IRequest } from 'itty-router';

export default function getAuthRouter(base = '') {
	const routerWrapper = RouterWrapper.getNew(base);
	routerWrapper.router.post('/signup', async (req: IRequest) => json({ endpoint: 'signup' }));
	routerWrapper.router.post('/login', async (req: IRequest) => json({ endpoint: 'login' }));
	return routerWrapper;
} 