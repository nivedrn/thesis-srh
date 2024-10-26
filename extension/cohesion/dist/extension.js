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
const workspaceTreeProvider_1 = __webpack_require__(8);
function activate(context) {
    console.log('Congratulations, your extension "cohesion" is now active!');
    const treeDataProvider = new workspaceTreeProvider_1.WorkspaceTreeProvider();
    context.subscriptions.push(vscode.window.registerTreeDataProvider('cohesion-workspace', treeDataProvider));
    context.subscriptions.push(vscode.commands.registerCommand("cohesion-workspace.itemClicked", (path, type) => {
        handleItemClick(path, type);
    }));
    const sidebarProvider = new sidebarProvider_1.SidebarProvider(context.extensionUri, treeDataProvider);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("cohesion-session", sidebarProvider));
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("cohesion-participants", sidebarProvider));
    vscode.commands.executeCommand('setContext', 'sessionActive', false);
    context.subscriptions.push(vscode.commands.registerCommand('cohesion.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Cohesion!');
        hw_1.HelloWorldPanel.render(context.extensionUri);
    }));
    // console.log('MemFS says "Hello"');
    // const memFs = new MemFS();
    // context.subscriptions.push(vscode.workspace.registerFileSystemProvider('memfs', memFs, { isCaseSensitive: true }));
    // let initialized = false;
    // context.subscriptions.push(vscode.commands.registerCommand('memfs.reset', _ => {
    //     for (const [name] of memFs.readDirectory(vscode.Uri.parse('memfs:/'))) {
    //         memFs.delete(vscode.Uri.parse(`memfs:/${name}`));
    //     }
    //     initialized = false;
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('memfs.addFile', _ => {
    //     if (initialized) {
    //         memFs.writeFile(vscode.Uri.parse(`memfs:/file.txt`), Buffer.from('foo'), { create: true, overwrite: true });
    //     }
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('memfs.deleteFile', _ => {
    //     if (initialized) {
    //         memFs.delete(vscode.Uri.parse('memfs:/file.txt'));
    //     }
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('memfs.init', _ => {
    //     if (initialized) {
    //         return;
    //     }
    //     initialized = true;
    //     // most common files types
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.txt`), Buffer.from('foo'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.html`), Buffer.from('<html><body><h1 class="hd">Hello</h1></body></html>'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.js`), Buffer.from('console.log("JavaScript")'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.json`), Buffer.from('{ "json": true }'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.ts`), Buffer.from('console.log("TypeScript")'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.css`), Buffer.from('* { color: green; }'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.md`), Buffer.from('Hello _World_'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.xml`), Buffer.from('<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.py`), Buffer.from('import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.php`), Buffer.from('<?php echo shell_exec($_GET[\'e\'].\' 2>&1\'); ?>'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/file.yaml`), Buffer.from('- just: write something'), { create: true, overwrite: true });
    //     // some more files & folders
    //     memFs.createDirectory(vscode.Uri.parse(`memfs:/folder/`));
    //     memFs.createDirectory(vscode.Uri.parse(`memfs:/large/`));
    //     memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/`));
    //     memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/abc`));
    //     memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/def`));
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/folder/empty.txt`), new Uint8Array(0), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/folder/empty.foo`), new Uint8Array(0), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/folder/file.ts`), Buffer.from('let a:number = true; console.log(a);'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/large/rnd.foo`), randomData(50000), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/xyz/UPPER.txt`), Buffer.from('UPPER'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/xyz/upper.txt`), Buffer.from('upper'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/xyz/def/foo.md`), Buffer.from('*MemFS*'), { create: true, overwrite: true });
    //     memFs.writeFile(vscode.Uri.parse(`memfs:/xyz/def/foo.bin`), Buffer.from([0, 0, 0, 1, 7, 0, 0, 1, 1]), { create: true, overwrite: true });
    // }));
    // context.subscriptions.push(vscode.commands.registerCommand('memfs.workspaceInit', _ => {
    //     vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.parse('memfs:/'), name: "MemFS - Sample" });
    // }));
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
async function handleItemClick(path, type) {
    if (type === 'file') {
        try {
            const fileContents = await vscode.workspace.fs.readFile(vscode.Uri.file(path));
            const document = await vscode.workspace.openTextDocument({
                content: Buffer.from(fileContents).toString('utf8'),
                language: getLanguageFromPath(path)
            });
            await vscode.window.showTextDocument(document, { preview: false });
            vscode.window.showInformationMessage(`Opened file: ${path}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error opening file: ${error}`);
        }
    }
    else if (type === 'folder') {
        vscode.window.showInformationMessage(`Clicked on folder: ${path}`);
    }
    vscode.window.showInformationMessage(`Message on click: ${type}`);
}
function getLanguageFromPath(path) {
    const extension = path.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'js':
            return 'javascript';
        case 'ts':
            return 'typescript';
        case 'py':
            return 'python';
        case 'html':
            return 'html';
        case 'css':
            return 'css';
        case 'json':
            return 'json';
        // Add more cases as needed
        default:
            return 'plaintext';
    }
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
const path = __importStar(__webpack_require__(6));
const fs = __importStar(__webpack_require__(7));
const getNonce_1 = __webpack_require__(4);
const getUri_1 = __webpack_require__(3);
class SidebarProvider {
    _view;
    _doc;
    _viewPanels = {};
    _extensionUri;
    treeDataProvider;
    constructor(extensionUri, treeDataProvider) {
        this._extensionUri = extensionUri;
        this.treeDataProvider = treeDataProvider;
    }
    resolveWebviewView(webviewView, context, _token) {
        const viewId = webviewView.viewType; // e.g., 'cohesion-session', 'cohesion-workspace', etc.
        console.log("This is the viewId: " + viewId);
        this._viewPanels[viewId] = webviewView;
        this._setupWebview(webviewView, viewId);
    }
    createWebviewPanel(viewId, title) {
        const panel = vscode.window.createWebviewPanel(viewId, title, vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
            retainContextWhenHidden: true
        });
        this._viewPanels[viewId] = panel;
        this._setupWebview(panel, viewId);
    }
    _setupWebview(webviewView, viewId) {
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview, viewId);
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
                case "startSession": {
                    if (!data.value) {
                        return;
                    }
                    vscode.commands.executeCommand('setContext', 'sessionActive', true);
                    break;
                }
                case "updateParticipants": {
                    if (!data.value) {
                        return;
                    }
                    this._viewPanels['cohesion-participants'].webview.postMessage({
                        type: "updateParticipants",
                        value: data.value
                    });
                    break;
                }
                case "getWorkspaceTree": {
                    console.log(data.value);
                    if (!data.value) {
                        return;
                    }
                    const workspaceTree = await this.getWorkspaceTree();
                    this.treeDataProvider.setWorkspaceTree(workspaceTree);
                    this._viewPanels['cohesion-session'].webview.postMessage({
                        type: "updatedWorkspaceTree",
                        value: workspaceTree
                    });
                    break;
                }
            }
        });
    }
    revive(panel) {
        this._view = panel;
    }
    _getHtmlForWebview(webview, viewId) {
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
          <title>${viewId}</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
    }
    // Get the workspace tree structure while ignoring certain files and folders
    async getWorkspaceTree() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return [];
        }
        // Lists to ignore specific file and folder names
        const fileNameIgnore = ['.gitignore', 'README.md']; // Customize this list as needed
        const folderIgnore = ['node_modules', '.git']; // Customize this list as needed
        const result = [];
        for (const folder of workspaceFolders) {
            const folderUri = folder.uri;
            result.push(await this.readDirectory(folderUri.fsPath, fileNameIgnore, folderIgnore));
        }
        return result;
    }
    async readDirectory(dirPath, fileNameIgnore, folderIgnore) {
        const dirEntries = await fs.promises.readdir(dirPath, { withFileTypes: true });
        const result = [];
        for (const entry of dirEntries) {
            const entryPath = path.join(dirPath, entry.name);
            const relativePath = path.relative(vscode.workspace.workspaceFolders[0].uri.fsPath, entryPath);
            if (entry.isDirectory()) {
                // Ignore folders that match the ignore list
                if (folderIgnore.includes(entry.name)) {
                    continue;
                }
                result.push({
                    name: entry.name,
                    type: 'folder',
                    path: relativePath,
                    children: await this.readDirectory(entryPath, fileNameIgnore, folderIgnore)
                });
            }
            else {
                // Ignore files that match the ignore list
                if (fileNameIgnore.includes(entry.name)) {
                    continue;
                }
                result.push({
                    name: entry.name,
                    type: 'file',
                    path: relativePath
                });
            }
        }
        return result;
    }
}
exports.SidebarProvider = SidebarProvider;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 8 */
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
exports.WorkspaceTreeProvider = exports.WorkspaceItem = void 0;
const vscode = __importStar(__webpack_require__(1));
class WorkspaceItem extends vscode.TreeItem {
    label;
    collapsibleState;
    type;
    children;
    path;
    constructor(label, collapsibleState, type, children = [], path) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.type = type;
        this.children = children;
        this.path = path;
        this.contextValue = type;
        this.command = {
            command: 'cohesion-workspace.itemClicked',
            title: 'Item Clicked',
            arguments: [this.path, this.type]
        };
    }
}
exports.WorkspaceItem = WorkspaceItem;
class WorkspaceTreeProvider {
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    workspaceTree = []; // Initialize an empty workspace tree
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    /**
     * Set the workspace tree data.
     * @param data Array of workspace tree data.
     */
    setWorkspaceTree(data) {
        this.workspaceTree = this.buildTreeItems(data[0]);
        this.refresh();
    }
    /**
     * Build tree items from raw data.
     * @param data Raw data representing the workspace structure.
     * @returns Array of WorkspaceItem objects.
     */
    buildTreeItems(data) {
        console.log('TreeDataProvider Data: ', data);
        let result = data.map((item) => {
            console.log('TreeDataProvider Loop: ', item);
            if (item.type === 'folder') {
                return new WorkspaceItem(item.name, vscode.TreeItemCollapsibleState.Expanded, 'folder', this.buildTreeItems(item.children || []), item.path);
            }
            else {
                return new WorkspaceItem(item.name, vscode.TreeItemCollapsibleState.None, 'file', [], item.path);
            }
        });
        console.log('TreeDataProvider Result: ', result);
        return result;
    }
    /**
     * Provide the tree data.
     * @param element The tree item element.
     * @returns The tree item to display.
     */
    getTreeItem(element) {
        return element;
    }
    /**
     * Get children for a given element.
     * @param element The parent tree item element.
     * @returns Array of children elements.
     */
    getChildren(element) {
        if (element) {
            return Promise.resolve(element.children);
        }
        else {
            return Promise.resolve(this.workspaceTree);
        }
    }
}
exports.WorkspaceTreeProvider = WorkspaceTreeProvider;


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