export const openApiSpec = {
	openapi: '3.0.0',
	info: {
		title: 'Alt-GPT',
		version: '1.0.0',
		description: 'API documentation for alt-gpt-v1 backend.'
	},
	paths: {
		'/v1/ping': {
			get: {
				summary: 'Ping',
				responses: { 200: { description: 'pong' } }
			}
		},
		'/v1/health': {
			get: {
				summary: 'Health check',
				responses: { 200: { description: 'ok' } }
			}
		},
		'/v1/chat': {
			post: {
				summary: 'Chat with LLM',
				requestBody: {
					required: true,
					content: {
						'application/json': {
							example: {
								messages: [
									{ role: 'user', content: 'Hello, who are you?' }
								],
								options: { model: 'gpt-3.5-turbo' }
							}
						}
					}
				},
				responses: {
					200: {
						description: 'LLM response',
						content: {
							'application/json': {
								example: {
									id: 'chatcmpl-abc123',
									object: 'chat.completion',
									created: 1680000000,
									model: 'gpt-3.5-turbo',
									choices: [
										{
											index: 0,
											message: { role: 'assistant', content: 'I am an AI developed by OpenAI.' },
											finish_reason: 'stop'
										}
									],
									usage: { prompt_tokens: 9, completion_tokens: 12, total_tokens: 21 }
								}
							}
						}
					}
				}
			}
		},
		'/v1/models': {
			get: {
				summary: 'List LLM models',
				responses: { 200: { description: 'Model list' } }
			}
		},
		'/v1/auth/login': {
			post: {
				summary: 'Login',
				requestBody: { required: true, content: { 'application/json': {} } },
				responses: { 200: { description: 'Token and user' } }
			}
		},
		'/v1/auth/user': {
			get: {
				summary: 'Get user info',
				parameters: [{ in: 'header', name: 'Authorization', required: true, schema: { type: 'string' } }],
				responses: { 200: { description: 'User info' } }
			}
		},
		'/v1/auth/logout': {
			post: {
				summary: 'Logout',
				parameters: [{ in: 'header', name: 'Authorization', required: true, schema: { type: 'string' } }],
				responses: { 200: { description: 'Success' } }
			}
		},
		'/v1/history': {
			get: {
				summary: 'Get chat history',
				parameters: [{ in: 'query', name: 'userId', required: true, schema: { type: 'string' } }],
				responses: { 200: { description: 'History list' } }
			},
			post: {
				summary: 'Save chat history',
				requestBody: { required: true, content: { 'application/json': {} } },
				responses: { 200: { description: 'Success' } }
			}
		}
	}
};

export function handleOpenApiRequest() {
	return new Response(JSON.stringify(openApiSpec, null, 2), {
		headers: { 'Content-Type': 'application/json' }
	});
} 