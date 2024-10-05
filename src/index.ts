import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { basicAuth } from 'hono/basic-auth';
import { getFileList } from './utils/FileList';

import config from '../config.json';

const app = new Hono();

app.use('/assets/*', serveStatic({ root: './' }));

app.use(
	'/private/*',
	basicAuth({
		username: config.auth.user,
		password: config.auth.password,
	})
);

app.use(
	'/*',
	serveStatic({
		root: './files',
	})
);

app.get('/', async (c) => {
	const result = await getFileList('./');
	return c.json(result);
});

app.get('/:path', async (c) => {
	const result = await getFileList(c.req.param('path'));
	console.log(result);
	return c.json(result);
});

app.get('/favicon.ico', async (c) => {
	return app.request('/assets/favicon.ico');
});

app.notFound(async (c) => {
	return app.request('/assets/404.html');
});

console.log('Ready.');

export default {
	port: config.port,
	fetch: app.fetch,
};
