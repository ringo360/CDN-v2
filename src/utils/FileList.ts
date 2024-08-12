import { readdir } from 'fs/promises';
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
	const dirpath = join('files', folder);
	let files = await readdir(dirpath);
}
