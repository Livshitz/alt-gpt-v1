import { DependencyInjector } from 'di.libx.js';
import { mockLlmProvider } from '../llm/mockLlmProvider';
import { mockAuthProvider } from '../auth/mockAuthProvider';
import { mockHistoryProvider } from '../history/mockHistoryProvider';
import * as api from '../api';
import { openRouterLlmProvider } from '../llm/openRouterLlmProvider';

const di = new DependencyInjector();

di.register('llm', openRouterLlmProvider);
// di.register('llm', mockLlmProvider);
di.register('auth', mockAuthProvider);
di.register('history', mockHistoryProvider);
// TODO: Register actual API module when implemented

// To use OpenRouter, comment out the mock and uncomment the following line:

export default di; 