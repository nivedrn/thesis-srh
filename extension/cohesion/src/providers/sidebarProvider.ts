import * as vscode from "vscode";
import * as path from 'path';
import * as fs from 'fs';
import { getNonce } from "../utilities/getNonce";
import { getUri } from "../utilities/getUri";
import { WorkspaceTreeProvider } from "./workspaceTreeProvider";

export class SidebarProvider implements vscode.WebviewViewProvider {
    _view?: vscode.WebviewView;
    _doc?: vscode.TextDocument;
    private _viewPanels: { [key: string]: vscode.WebviewView | vscode.WebviewPanel } = {};
    private readonly _extensionUri: vscode.Uri;
    private treeDataProvider: WorkspaceTreeProvider;

    constructor(extensionUri: vscode.Uri,  treeDataProvider: WorkspaceTreeProvider) {
        this._extensionUri = extensionUri;
        this.treeDataProvider = treeDataProvider;
    }

    public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken) {
        const viewId = webviewView.viewType; // e.g., 'cohesion-session', 'cohesion-workspace', etc.
        console.log("This is the viewId: " + viewId);
        this._viewPanels[viewId] = webviewView;
        this._setupWebview(webviewView, viewId);
    }

    public createWebviewPanel(viewId: string, title: string) {
        const panel = vscode.window.createWebviewPanel(
            viewId,
            title,
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [this._extensionUri],
                retainContextWhenHidden: true
            }
        );

        this._viewPanels[viewId] = panel;
        this._setupWebview(panel, viewId);
    }

    private _setupWebview(webviewView: vscode.WebviewView | vscode.WebviewPanel, viewId: string) {

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

    public revive(panel: vscode.WebviewView) {
        this._view = panel;
    }

    private _getHtmlForWebview(webview: vscode.Webview, viewId: string) {

        const stylesUri = getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", "index.css"]);
        const scriptUri = getUri(webview, this._extensionUri, ["webview-ui", "build", "assets", "index.js"]);

        const nonce = getNonce();

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
    private async getWorkspaceTree(): Promise<any[]> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            return [];
        }

        // Lists to ignore specific file and folder names
        const fileNameIgnore = ['.gitignore', 'README.md'];  // Customize this list as needed
        const folderIgnore = ['node_modules', '.git'];  // Customize this list as needed

        const result: any[] = [];

        for (const folder of workspaceFolders) {
            const folderUri = folder.uri;
            result.push(await this.readDirectory(folderUri.fsPath, fileNameIgnore, folderIgnore));
        }

        return result;
    }

    private async readDirectory(dirPath: string, fileNameIgnore: string[], folderIgnore: string[]): Promise<any> {
        const dirEntries = await fs.promises.readdir(dirPath, { withFileTypes: true });
        const result: any[] = [];
    
        for (const entry of dirEntries) {
            const entryPath = path.join(dirPath, entry.name);
            const relativePath = path.relative(vscode.workspace.workspaceFolders![0].uri.fsPath, entryPath);
    
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
            } else {
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