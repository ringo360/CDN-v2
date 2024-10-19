import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { basicAuth } from 'hono/basic-auth';
import { getFileList } from './utils/FileList';

import config from '../config.json';

const app = new Hono();

app.use('/assets/*', serveStatic({ root: './' }));
app.use(
	'/favicon.ico',
	serveStatic({
		root: './assets/',
		onNotFound: (path, c) => {
			console.log(`${path} is not found, you access ${c.req.path}`);
		},
	})
);
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
	let q = c.req.query('offset');
	let offset = undefined;
	if (q) {
		offset = parseInt(q);
	}
	let files = await getFileList('./');
	if (offset) {
		files = files.slice(offset, offset + 10);
	}
	return c.json(files);
});

app.get('/:path', async (c) => {
	let files = await getFileList(c.req.param('path'));
	return c.json(files);
});

app.notFound(async (c) => {
	return app.request('/assets/404.html');
});

console.log('Ready.');

export default {
	port: config.port,
	fetch: app.fetch,
};
