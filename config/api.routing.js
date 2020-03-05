'use strict';
import express from 'express';
import {AppSetting} from '../config';
import fs from 'fs';
const router = express.Router();
class ApiRouting {
	static ConfigureRouters(app) {
		const versions = this.getVersions();
		for (let version of versions) {
			const routes = this.getRoutesByVersion(version);
			for (let route of routes) {
				this.loadRoute(version, route);
			}
		}
		app.use(AppSetting.getConfig().APP.BASE_PATH || '', router);
	}

	static getFile(path) {
		return fs.readdirSync(path).filter(dir => !dir.match(/(^\.)|index/i));
	}
	static getVersions() {
		return this.getFile(`${__dirname}/../app/`);
	}
	static getRoutesByVersion(version) {
		return this.getFile(`${__dirname}/../app/${version}/routes`);
	}
	static loadRoute(version, route) {
		console.log('version is======================== ',route);
		require(`${__dirname}/../app/${version}/routes/${route}`)(router);
	}
}
export default ApiRouting;