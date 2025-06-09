// To run local debug against staging: NODE_ENV=preview bun run debug

import { Route, Router, RouterType, error, json, cors, text } from 'itty-router';
import { libx } from "libx.js/build/bundles/essentials";
import { RouterWrapper } from 'edge.libx.js/src/modules/RouterWrapper.js';
import v1Routes from "./v1";
libx.log.isDebug = true;
libx.log.isBrowser = false;
libx.log.isShowPrefix = false;
libx.log.isShowTime = false;
libx.log.isConsole = false;

export const config = {
	runtime: 'edge',
};

export const prefix = '';

const baseRouterWrapper = RouterWrapper.getNew(prefix);
baseRouterWrapper.registerRoute('/v1', v1Routes);

baseRouterWrapper.router.all('/ping', async (req) => {
	return json({ message: 'pong' });
});
baseRouterWrapper.router.all('/', (req, env, ctx) => {
	return json(`ok - ${process.env.VERCEL_ENV ?? process.env.NODE_ENV} - 1`);
});
baseRouterWrapper.catchNotFound();

const ittyServer = baseRouterWrapper.createServerAdapter();
export default ittyServer.handle;
export const router = baseRouterWrapper.router;
export const server = ittyServer;
export const handler = ittyServer.handle;