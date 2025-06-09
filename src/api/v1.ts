import { Route, Router, RouterType, error, json, cors, text } from 'itty-router';
// import { libx } from "libx.js/build/bundles/essentials";
import { RouterWrapper } from 'edge.libx.js';
import { handleChatRequest } from './chat';
import { handleModelsRequest } from './models';
import { handleLoginRequest, handleGetUserRequest, handleLogoutRequest } from './auth';
import { handleGetHistoryRequest, handleSaveHistoryRequest } from './history';
import { handleOpenApiRequest } from './openapi';
import _cors from "edge.libx.js/src/modules/cors.js";

export const prefix = '/v1';
const apiRouter = RouterWrapper.getNew(prefix);

// baseRouterWrapper.registerRoute('/v1', v1Routes);

apiRouter.router.get('/ping', async (req) =>
	await _cors(
		req,
		new Response(JSON.stringify({ message: 'pong' }), {
			headers: { 'Content-Type': 'application/json' }
		})
	)
);
apiRouter.router.get('/health', async (req) =>
	await _cors(
		req,
		new Response(JSON.stringify({ status: 'ok' }), {
			headers: { 'Content-Type': 'application/json' }
		})
	)
);

apiRouter.router.post('/chat', async (req) => await _cors(req, await handleChatRequest(req)));
apiRouter.router.get('/models', async (req) => await _cors(req, await handleModelsRequest(req)));
apiRouter.router.post('/auth/login', async (req) => await _cors(req, await handleLoginRequest(req)));
apiRouter.router.get('/auth/user', async (req) => await _cors(req, await handleGetUserRequest(req)));
apiRouter.router.post('/auth/logout', async (req) => await _cors(req, await handleLogoutRequest(req)));
apiRouter.router.get('/history', async (req) => await _cors(req, await handleGetHistoryRequest(req)));
apiRouter.router.post('/history', async (req) => await _cors(req, await handleSaveHistoryRequest(req)));
apiRouter.router.get('/openapi.json', async (req) => await _cors(req, await handleOpenApiRequest()));

// Handle preflight OPTIONS requests
apiRouter.router.options('/*', async (req) =>
	await _cors(
		req,
		new Response(null, {
			status: 204,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type,Authorization',
			},
		})
	)
);

apiRouter.router.all('/ping', async (req) => {
	return json({ message: 'pong' });
});
apiRouter.router.all('/*', async (req) => {
	return json({ message: 'pong2' });
});
apiRouter.catchNotFound();

const ittyServer = apiRouter.createServerAdapter();
export default ittyServer.handle;
export const router = apiRouter.router;
export const server = ittyServer;
export const handler = ittyServer.handle;
