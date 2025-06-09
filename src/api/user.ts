import { RouterWrapper } from 'edge.libx.js/src/modules/RouterWrapper.js';
import { json, IRequest } from 'itty-router';

export default function getUserRouter(base = '') {
	const routerWrapper = RouterWrapper.getNew(base);
	routerWrapper.router.get('/settings', async (req: IRequest) => json({ endpoint: 'get settings' }));
	routerWrapper.router.put('/settings', async (req: IRequest) => json({ endpoint: 'update settings' }));
	routerWrapper.router.get('/profile', async (req: IRequest) => json({ endpoint: 'get user profile' }));
	routerWrapper.router.put('/profile', async (req: IRequest) => json({ endpoint: 'update user profile' }));
	routerWrapper.router.post('/avatar', async (req: IRequest) => json({ endpoint: 'upload avatar' }));
	return routerWrapper;
} 