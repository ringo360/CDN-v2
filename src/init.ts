import consola from 'consola';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

function mkdir(path: string) {
	try {
		if (!existsSync(path)) {
			consola.info(`Creating new directory ${path}...`);
			mkdirSync(path, { recursive: true });
			consola.success(`Successfully created new directory ${path}.`);
		} else {
			consola.success(`${path} is already exists.`);
		}
	} catch (e: any) {
		throw new Error(e);
	}
}

async function definePortNum() {
	const n = await consola.prompt('Port number(default: 3000): ', {
		placeholder: 'Enter port number',
		initial: '3000',
	});
	const i = parseInt(n, 10);
	if (isNaN(i)) {
		consola.fail('Invalid input.');
		return definePortNum();
	}
	return i;
}

async function defineUserName() {
	const user = await consola.prompt('Enter Username (used for auth): ', {
		placeholder: 'Username (Ex: admin)',
	});
	if (!user) {
		consola.fail('Invalid input.');
		return defineUserName();
	}
	return user;
}

async function definePassword(user: string) {
	const pass = await consola.prompt(`Enter password for ${user}: `, {
		placeholder: 'Password (Please make it as strong as possible.)',
	});
	if (!pass) {
		consola.fail('Invalid input.');
		return definePassword(user);
	}
	return pass;
}

interface Config {
	port: number;
	auth: {
		user: string;
		password: string;
	};
}

function writeConfig(json: Config) {
	const json_str = JSON.stringify(json, null, 2);
	const c_path = './config.json';
	try {
		writeFileSync(c_path, json_str);
		return;
	} catch (e: any) {
		throw new Error(e);
	}
}

async function main() {
	const port = await definePortNum();
	const user = await defineUserName();
	const pass = await definePassword(user);
	consola.info('Generating config.json...');
	const json = {
		port: port,
		auth: {
			user: user,
			password: pass,
		},
	} as Config;
	try {
		writeConfig(json);
	} catch (e) {
		consola.error(e);
		consola.info('An internal error occured!');
		consola.info(
			'Please define config.json manually. (you can copy and paste below json)'
		);
		consola.log(json);
		return;
	}
	try {
		await mkdir('files/private');
	} catch (e) {
		consola.error(e);
	}
}

main();
