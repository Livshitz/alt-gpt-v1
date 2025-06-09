import { RouterWrapper } from 'edge.libx.js/src/modules/RouterWrapper.js';
import { json, IRequest } from 'itty-router';

export default function getThreadsRouter(base = '') {
	const routerWrapper = RouterWrapper.getNew(base);
	routerWrapper.router.get('/', async (req: IRequest) => json({ endpoint: 'list threads' }));
	routerWrapper.router.get('/:id', async (req: IRequest) => json({ endpoint: 'get thread', id: req.params.id }));
	routerWrapper.router.post('/:id/message', async (req: IRequest) => json({ endpoint: 'post message', id: req.params.id }));
	routerWrapper.router.put('/:id/message/:msgId', async (req: IRequest) => json({ endpoint: 'edit message', id: req.params.id, msgId: req.params.msgId }));
	routerWrapper.router.delete('/:id/message/:msgId', async (req: IRequest) => json({ endpoint: 'delete message', id: req.params.id, msgId: req.params.msgId }));
	routerWrapper.router.post('/:id/message/:msgId/react', async (req: IRequest) => json({ endpoint: 'react to message', id: req.params.id, msgId: req.params.msgId }));
	routerWrapper.router.post('/:id/share', async (req: IRequest) => json({ endpoint: 'share thread', id: req.params.id }));
	routerWrapper.router.get('/search', async (req: IRequest) => json({ endpoint: 'search threads' }));
	return routerWrapper;
} 