import * as fs from 'fs/promises';
import { join } from 'path';

export interface DirectoryEntry {
	directory: boolean;
	file: boolean;
	name: string;
	size: number;
	sizeStr: string;
}

function formatFileSize(bytes: number) {
	const kilobyte = 1024;
	const megabyte = kilobyte * 1024;
	const gigabyte = megabyte * 1024;

	if (bytes < kilobyte) {
		return bytes + ' bytes';
	} else if (bytes < megabyte) {
		return (bytes / kilobyte).toFixed(2) + ' KB';
	} else if (bytes < gigabyte) {
		return (bytes / megabyte).toFixed(2) + ' MB';
	} else {
		return (bytes / gigabyte).toFixed(2) + ' GB';
	}
}

export async function getFileList(folder: string) {
	try {
		const dirpath = join('files', folder);
		let files = await fs.readdir(dirpath);
		return await Promise.all(
			files.map(async (file) => {
				let stat = await fs.stat(join(dirpath, file));
				return {
					directory: stat.isDirectory(),
					file: stat.isFile(),
					name: file,
					size: stat.size,
					sizeStr: formatFileSize(stat.size),
				};
			})
		);
	} catch (e: any) {
		console.log(e);
		if (e.code == 'ENOENT') {
			return {
				error: '404',
				notfound: true,
			};
		} else {
			return {
				error: `${e}`,
				notfound: false,
			};
		}
	}
}
