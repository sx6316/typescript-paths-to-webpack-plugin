const fs = require("fs");
const path = require("path");
const sjc = require("strip-json-comments");
const root = "../../";

// TODO: 目录处理
function pathResolve(...addrs) {
	return path.resolve(__dirname, root, ...addrs);
}
// TODO: index文件处理
function index(name, path) {
	path = path.replace(/\/index(\.[^\/]+)?\/?$/, "");
	if (path.match(/.*\/?.*\*[^\/]*\/?$/) && name.match(/^.*\/[^\/]*\*[^\/]*$/)) {
		name = name === "/*" ? name : name.replace(/\/(?=[^\/]*\*[^\/]*$)/, "");

		toAdd(name.replace(/\*\/?/, ""), path.replace(/\*/, ""));
		return;
	}
	toAdd(name.replace(/\/?\*\/?/, ""), path.replace(/\*/, ""));
	getAddir(path).forEach((em) => {
		toAdd(name.replace(/\*/, em), path.replace(/\*/g, em));
	});
}
// TODO: 获取 * 上级目录
function getAddir(path) {
	let name = path.match(/[^\/]+(?=\/?\*)/);
	let addirs = fs.readdirSync(pathResolve(name[0]));
	if (!addirs.length) return [];

	let addiStr = "{" + addirs.join("}{") + "}";
	addiStr = addiStr.replace(/\{[^\{\}]*\.[^\{\}]+\}/g, "");
	addirs = addiStr.match(/[^\{\}]+/g);

	return addirs;
}
// TODO: 规则添加
function toAdd(name, path) {
	path = pathResolve(_ts_baseUrl, path);
	alias[name] = alias[name] || [];
	alias[name][0] != path && alias[name].push(path);
}

function run() {
	for (const name in _ts_paths) {
		let paths = _ts_paths[name];
		if (!name.match(/\*/)) {
			alias[name] = paths.map((path) => pathResolve(_ts_baseUrl, path));
			continue;
		}
		paths.forEach((path) => index(name, path));
	}
}

const tsconfig = fs.readFileSync(pathResolve("tsconfig.json"), "utf8");
const _ts_o = JSON.parse(sjc(tsconfig));
const _ts_paths = _ts_o.compilerOptions.paths || {};
const _ts_baseUrl = _ts_o.compilerOptions.baseUrl || "./";
let alias = {};

class resolveAliasFromTsPaths {
	constructor({ aliasLog = false }) {
		run();
		if (aliasLog) {
			console.log("The 'resolve.alias' will be replaced with the following:");
			console.log(alias);
		}
	}
	apply(compiler) {
		compiler.options.resolve.alias = alias;
	}
	static getAlias() {
		run();
		return alias;
	}
}

module.exports = resolveAliasFromTsPaths;
