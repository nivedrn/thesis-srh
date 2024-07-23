/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const hw_1 = __webpack_require__(2);
const sidebarProvider_1 = __webpack_require__(5);
const fileSystemProvider_1 = __webpack_require__(6);
function activate(context) {
    console.log('Congratulations, your extension "cohesion" is now active!');
    const sidebarProvider = new sidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("cohesion-sidebar", sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand('cohesion.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Cohesion!');
        hw_1.HelloWorldPanel.render(context.extensionUri);
    }));
    console.log('MemFS says "Hello"');
    const memFs = new fileSystemProvider_1.MemFS();
    context.subscriptions.push(vscode.workspace.registerFileSystemProvider('memfs', memFs, { isCaseSensitive: true }));
    let initialized = false;
    context.subscriptions.push(vscode.commands.registerCommand('memfs.reset', _ => {
        for (const [name] of memFs.readDirectory(vscode.Uri.parse('memfs:/'))) {
            memFs.delete(vscode.Uri.parse(`memfs:/${name}`));
        }
        initialized = false;
    }));
    context.subscriptions.push(vscode.commands.registerCommand('memfs.addFile', _ => {
        if (initialized) {
            memFs.writeFile(vscode.Uri.parse(`memfs:/file.txt`), Buffer.from('foo'), { create: true, overwrite: true });
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('memfs.deleteFile', _ => {
        if (initialized) {
            memFs.delete(vscode.Uri.parse('memfs:/file.txt'));
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('memfs.init', _ => {
        if (initialized) {
            return;
        }
        initialized = true;
        // most common files types
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.txt`), Buffer.from('foo'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.html`), Buffer.from('<html><body><h1 class="hd">Hello</h1></body></html>'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.js`), Buffer.from('console.log("JavaScript")'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.json`), Buffer.from('{ "json": true }'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.ts`), Buffer.from('console.log("TypeScript")'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.css`), Buffer.from('* { color: green; }'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.md`), Buffer.from('Hello _World_'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.xml`), Buffer.from('<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.py`), Buffer.from('import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.php`), Buffer.from('<?php echo shell_exec($_GET[\'e\'].\' 2>&1\'); ?>'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/file.yaml`), Buffer.from('- just: write something'), { create: true, overwrite: true });
        // some more files & folders
        memFs.createDirectory(vscode.Uri.parse(`memfs:/folder/`));
        memFs.createDirectory(vscode.Uri.parse(`memfs:/large/`));
        memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/`));
        memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/abc`));
        memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/def`));
        memFs.writeFile(vscode.Uri.parse(`memfs:/folder/empty.txt`), new Uint8Array(0), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/folder/empty.foo`), new Uint8Array(0), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/folder/file.ts`), Buffer.from('let a:number = true; console.log(a);'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/large/rnd.foo`), randomData(50000), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/xyz/UPPER.txt`), Buffer.from('UPPER'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/xyz/upper.txt`), Buffer.from('upper'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/xyz/def/foo.md`), Buffer.from('*MemFS*'), { create: true, overwrite: true });
        memFs.writeFile(vscode.Uri.parse(`memfs:/xyz/def/foo.bin`), Buffer.from([0, 0, 0, 1, 7, 0, 0, 1, 1]), { create: true, overwrite: true });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('memfs.workspaceInit', _ => {
        vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.parse('memfs:/'), name: "MemFS - Sample" });
    }));
}
// This method is called when your extension is deactivated
function deactivate() { }
function randomData(lineCnt, lineLen = 155) {
    const lines = [];
    for (let i = 0; i < lineCnt; i++) {
        let line = '';
        while (line.length < lineLen) {
            line += Math.random().toString(2 + (i % 34)).substr(2);
        }
        lines.push(line.substr(0, lineLen));
    }
    return Buffer.from(lines.join('\n'), 'utf8');
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HelloWorldPanel = void 0;
const vscode_1 = __webpack_require__(1);
const getUri_1 = __webpack_require__(3);
const getNonce_1 = __webpack_require__(4);
/**
 * This class manages the state and behavior of HelloWorld webview panels.
 *
 * It contains all the data and methods for:
 *
 * - Creating and rendering HelloWorld webview panels
 * - Properly cleaning up and disposing of webview resources when the panel is closed
 * - Setting the HTML (and by proxy CSS/JavaScript) content of the webview panel
 * - Setting message listeners so data can be passed between the webview and extension
 */
class HelloWorldPanel {
    static currentPanel;
    _panel;
    _disposables = [];
    /**
     * The HelloWorldPanel class private constructor (called only from the render method).
     *
     * @param panel A reference to the webview panel
     * @param extensionUri The URI of the directory containing the extension
     */
    constructor(panel, extensionUri) {
        this._panel = panel;
        // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
        // the panel or when the panel is closed programmatically)
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // Set the HTML content for the webview panel
        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
        // Set an event listener to listen for messages passed from the webview context
        this._setWebviewMessageListener(this._panel.webview);
    }
    /**
     * Renders the current webview panel if it exists otherwise a new webview panel
     * will be created and displayed.
     *
     * @param extensionUri The URI of the directory containing the extension.
     */
    static render(extensionUri) {
        if (HelloWorldPanel.currentPanel) {
            // If the webview panel already exists reveal it
            HelloWorldPanel.currentPanel._panel.reveal(vscode_1.ViewColumn.One);
        }
        else {
            // If a webview panel does not already exist create and show a new one
            const panel = vscode_1.window.createWebviewPanel(
            // Panel view type
            "showHelloWorld", 
            // Panel title
            "Hello World", 
            // The editor column the panel should be displayed in
            vscode_1.ViewColumn.One, 
            // Extra panel configurations
            {
                // Enable JavaScript in the webview
                enableScripts: true,
                // Restrict the webview to only load resources from the `out` and `webview-ui/build` directories
                localResourceRoots: [vscode_1.Uri.joinPath(extensionUri, "out"), vscode_1.Uri.joinPath(extensionUri, "webview-ui/build")],
            });
            HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
        }
    }
    /**
     * Cleans up and disposes of webview resources when the webview panel is closed.
     */
    dispose() {
        HelloWorldPanel.currentPanel = undefined;
        // Dispose of the current webview panel
        this._panel.dispose();
        // Dispose of all disposables (i.e. commands) for the current webview panel
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
    /**
     * Defines and returns the HTML that should be rendered within the webview panel.
     *
     * @remarks This is also the place where references to the React webview build files
     * are created and inserted into the webview HTML.
     *
     * @param webview A reference to the extension webview
     * @param extensionUri The URI of the directory containing the extension
     * @returns A template string literal containing the HTML that should be
     * rendered within the webview panel
     */
    _getWebviewContent(webview, extensionUri) {
        // The CSS file from the React build output
        const stylesUri = (0, getUri_1.getUri)(webview, extensionUri, ["webview-ui", "build", "assets", "index.css"]);
        // The JS file from the React build output
        const scriptUri = (0, getUri_1.getUri)(webview, extensionUri, ["webview-ui", "build", "assets", "index.js"]);
        const nonce = (0, getNonce_1.getNonce)();
        // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
        return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Hello World</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
    }
    /**
     * Sets up an event listener to listen for messages passed from the webview context and
     * executes code based on the message that is recieved.
     *
     * @param webview A reference to the extension webview
     * @param context A reference to the extension context
     */
    _setWebviewMessageListener(webview) {
        webview.onDidReceiveMessage((message) => {
            const command = message.command;
            const text = message.text;
            switch (command) {
                case "hello":
                    // Code that should run in response to the hello message command
                    vscode_1.window.showInformationMessage(text);
                    return;
                // Add more switch case statements here as more webview message commands
                // are created within the webview context (i.e. inside media/main.js)
            }
        }, undefined, this._disposables);
    }
}
exports.HelloWorldPanel = HelloWorldPanel;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUri = getUri;
const vscode_1 = __webpack_require__(1);
/**
 * A helper function which will get the webview URI of a given file or resource.
 *
 * @remarks This URI can be used within a webview's HTML as a link to the
 * given file/resource.
 *
 * @param webview A reference to the extension webview
 * @param extensionUri The URI of the directory containing the extension
 * @param pathList An array of strings representing the path to a file/resource
 * @returns A URI pointing to the file/resource
 */
function getUri(webview, extensionUri, pathList) {
    return webview.asWebviewUri(vscode_1.Uri.joinPath(extensionUri, ...pathList));
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNonce = getNonce;
/**
 * A helper function that returns a unique alphanumeric identifier called a nonce.
 *
 * @remarks This function is primarily used to help enforce content security
 * policies for resources/scripts being executed in a webview context.
 *
 * @returns A nonce
 */
function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SidebarProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const getNonce_1 = __webpack_require__(4);
const getUri_1 = __webpack_require__(3);
class SidebarProvider {
    _extensionUri;
    _view;
    _doc;
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "ready": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
            }
        });
    }
    revive(panel) {
        this._view = panel;
    }
    _getHtmlForWebview(webview) {
        const stylesUri = (0, getUri_1.getUri)(webview, this._extensionUri, ["webview-ui", "build", "assets", "index.css"]);
        const scriptUri = (0, getUri_1.getUri)(webview, this._extensionUri, ["webview-ui", "build", "assets", "index.js"]);
        const nonce = (0, getNonce_1.getNonce)();
        return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; connect-src 'self' ws://localhost:5000; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">  
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Hello World</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
    }
}
exports.SidebarProvider = SidebarProvider;


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemFS = exports.Directory = exports.File = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const path = __importStar(__webpack_require__(7));
const vscode = __importStar(__webpack_require__(1));
class File {
    type;
    ctime;
    mtime;
    size;
    name;
    data;
    constructor(name) {
        this.type = vscode.FileType.File;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
    }
}
exports.File = File;
class Directory {
    type;
    ctime;
    mtime;
    size;
    name;
    entries;
    constructor(name) {
        this.type = vscode.FileType.Directory;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
        this.entries = new Map();
    }
}
exports.Directory = Directory;
class MemFS {
    root = new Directory('');
    // --- manage file metadata
    stat(uri) {
        return this._lookup(uri, false);
    }
    readDirectory(uri) {
        const entry = this._lookupAsDirectory(uri, false);
        const result = [];
        for (const [name, child] of entry.entries) {
            result.push([name, child.type]);
        }
        return result;
    }
    // --- manage file contents
    readFile(uri) {
        const data = this._lookupAsFile(uri, false).data;
        if (data) {
            return data;
        }
        throw vscode.FileSystemError.FileNotFound();
    }
    writeFile(uri, content, options) {
        const basename = path.posix.basename(uri.path);
        const parent = this._lookupParentDirectory(uri);
        let entry = parent.entries.get(basename);
        if (entry instanceof Directory) {
            throw vscode.FileSystemError.FileIsADirectory(uri);
        }
        if (!entry && !options.create) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        if (entry && options.create && !options.overwrite) {
            throw vscode.FileSystemError.FileExists(uri);
        }
        if (!entry) {
            entry = new File(basename);
            parent.entries.set(basename, entry);
            this._fireSoon({ type: vscode.FileChangeType.Created, uri });
        }
        entry.mtime = Date.now();
        entry.size = content.byteLength;
        entry.data = content;
        this._fireSoon({ type: vscode.FileChangeType.Changed, uri });
    }
    // --- manage files/folders
    rename(oldUri, newUri, options) {
        if (!options.overwrite && this._lookup(newUri, true)) {
            throw vscode.FileSystemError.FileExists(newUri);
        }
        const entry = this._lookup(oldUri, false);
        const oldParent = this._lookupParentDirectory(oldUri);
        const newParent = this._lookupParentDirectory(newUri);
        const newName = path.posix.basename(newUri.path);
        oldParent.entries.delete(entry.name);
        entry.name = newName;
        newParent.entries.set(newName, entry);
        this._fireSoon({ type: vscode.FileChangeType.Deleted, uri: oldUri }, { type: vscode.FileChangeType.Created, uri: newUri });
    }
    delete(uri) {
        const dirname = uri.with({ path: path.posix.dirname(uri.path) });
        const basename = path.posix.basename(uri.path);
        const parent = this._lookupAsDirectory(dirname, false);
        if (!parent.entries.has(basename)) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        parent.entries.delete(basename);
        parent.mtime = Date.now();
        parent.size -= 1;
        this._fireSoon({ type: vscode.FileChangeType.Changed, uri: dirname }, { uri, type: vscode.FileChangeType.Deleted });
    }
    createDirectory(uri) {
        const basename = path.posix.basename(uri.path);
        const dirname = uri.with({ path: path.posix.dirname(uri.path) });
        const parent = this._lookupAsDirectory(dirname, false);
        const entry = new Directory(basename);
        parent.entries.set(entry.name, entry);
        parent.mtime = Date.now();
        parent.size += 1;
        this._fireSoon({ type: vscode.FileChangeType.Changed, uri: dirname }, { type: vscode.FileChangeType.Created, uri });
    }
    _lookup(uri, silent) {
        const parts = uri.path.split('/');
        let entry = this.root;
        for (const part of parts) {
            if (!part) {
                continue;
            }
            let child;
            if (entry instanceof Directory) {
                child = entry.entries.get(part);
            }
            if (!child) {
                if (!silent) {
                    throw vscode.FileSystemError.FileNotFound(uri);
                }
                else {
                    return undefined;
                }
            }
            entry = child;
        }
        return entry;
    }
    _lookupAsDirectory(uri, silent) {
        const entry = this._lookup(uri, silent);
        if (entry instanceof Directory) {
            return entry;
        }
        throw vscode.FileSystemError.FileNotADirectory(uri);
    }
    _lookupAsFile(uri, silent) {
        const entry = this._lookup(uri, silent);
        if (entry instanceof File) {
            return entry;
        }
        throw vscode.FileSystemError.FileIsADirectory(uri);
    }
    _lookupParentDirectory(uri) {
        const dirname = uri.with({ path: path.posix.dirname(uri.path) });
        return this._lookupAsDirectory(dirname, false);
    }
    // --- manage file events
    _emitter = new vscode.EventEmitter();
    _bufferedEvents = [];
    _fireSoonHandle;
    onDidChangeFile = this._emitter.event;
    watch(_resource) {
        // ignore, fires for all changes...
        return new vscode.Disposable(() => { });
    }
    _fireSoon(...events) {
        this._bufferedEvents.push(...events);
        if (this._fireSoonHandle) {
            clearTimeout(this._fireSoonHandle);
        }
        this._fireSoonHandle = setTimeout(() => {
            this._emitter.fire(this._bufferedEvents);
            this._bufferedEvents.length = 0;
        }, 5);
    }
}
exports.MemFS = MemFS;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map