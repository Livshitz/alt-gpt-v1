import { libx } from "libx.js/build/bundles/essentials";
import { IRequest, Router, json, text } from "itty-router";
import { RouterWrapper } from "edge.libx.js/src/modules/RouterWrapper.js";
import _cors from "edge.libx.js/src/modules/cors.js";
import getAuthRouter from './auth';
import getModelsRouter from './models';
import getThreadsRouter from './threads';
import getFilesRouter from './files';
import getUserRouter from './user';
import getAskRouter from './ask';

export default (base: string) => {
	const router = Router({ base });

	const routerWrapper = RouterWrapper.getNew(base);
	routerWrapper.registerRoute('/auth', getAuthRouter);
	routerWrapper.registerRoute('/models', getModelsRouter);
	routerWrapper.registerRoute('/threads', getThreadsRouter);
	routerWrapper.registerRoute('/files', getFilesRouter);
	routerWrapper.registerRoute('/user', getUserRouter);
	routerWrapper.registerRoute('/ask', getAskRouter);

	routerWrapper.router.all('/x', (req, env, ctx) => {
		return _cors(
			req,
			new Response(JSON.stringify({ message: 'Hello World!' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			})
		)
		return text(routerWrapper.base);
	});

	return { base, router: routerWrapper.router };
};