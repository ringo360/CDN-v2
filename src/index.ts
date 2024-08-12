import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

app.use('/assets/*', serveStatic({ root: './' }));
app.use(
	'/*',
	serveStatic({
		root: './files',
	})
);

app.get('/', async (c) => {
	return c.text('Hello Sekai!');
});

app.get('/favicon.ico', async (c) => {
	return app.request('/assets/favicon.ico');
});

app.notFound(async (c) => {
	return app.request('/assets/404.html');
});

console.log('Ready.');
export default app;
