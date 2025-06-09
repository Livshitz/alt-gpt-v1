import { RouterWrapper } from 'edge.libx.js/src/modules/RouterWrapper.js';
import { json, IRequest } from 'itty-router';

export default function getFilesRouter(base = '') {
	const routerWrapper = RouterWrapper.getNew(base);
	routerWrapper.router.post('/upload', async (req: IRequest) => json({ endpoint: 'upload file' }));
	routerWrapper.router.get('/:id/preview', async (req: IRequest) => json({ endpoint: 'file/media preview', id: req.params.id }));
	routerWrapper.router.get('/:id/download', async (req: IRequest) => json({ endpoint: 'file/media download', id: req.params.id }));
	routerWrapper.router.post('/voice', async (req: IRequest) => json({ endpoint: 'upload voice note' }));
	return routerWrapper;
} 