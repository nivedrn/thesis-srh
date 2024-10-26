import * as vscode from 'vscode';
import { HelloWorldPanel } from './panels/hw';
import { SidebarProvider } from './providers/sidebarProvider';
import { WorkspaceItem, WorkspaceTreeProvider } from './providers/workspaceTreeProvider';
import { MemFS } from './providers/fileSystemProvider';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "cohesion" is now active!');

    const treeDataProvider = new WorkspaceTreeProvider();
    context.subscriptions.push(
        vscode.window.registerTreeDataProvider(
            'cohesion-workspace',
            treeDataProvider)
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("cohesion-workspace.itemClicked", (path: string, type: string)  => {
            handleItemClick(path, type);
        })
    );

    const sidebarProvider = new SidebarProvider(context.extensionUri, treeDataProvider);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "cohesion-session",
            sidebarProvider
        )
    );
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "cohesion-participants",
            sidebarProvider
        )
    );

    vscode.commands.executeCommand('setContext', 'sessionActive', false);
    
    context.subscriptions.push(vscode.commands.registerCommand('cohesion.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Cohesion!');
        HelloWorldPanel.render(context.extensionUri);
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
export function deactivate() { }

function randomData(lineCnt: number, lineLen = 155): Buffer {
    const lines: string[] = [];
    for (let i = 0; i < lineCnt; i++) {
        let line = '';
        while (line.length < lineLen) {
            line += Math.random().toString(2 + (i % 34)).substr(2);
        }
        lines.push(line.substr(0, lineLen));
    }
    return Buffer.from(lines.join('\n'), 'utf8');
}

async function handleItemClick(path: string, type: string) {
    if (type === 'file') {
        try {
            const fileContents = await vscode.workspace.fs.readFile(vscode.Uri.file(path));
            const document = await vscode.workspace.openTextDocument({
                content: Buffer.from(fileContents).toString('utf8'),
                language: getLanguageFromPath(path)
            });
            await vscode.window.showTextDocument(document, { preview: false });
            vscode.window.showInformationMessage(`Opened file: ${path}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Error opening file: ${error}`);
        }
    } else if (type === 'folder') {
        vscode.window.showInformationMessage(`Clicked on folder: ${path}`);
    }

    vscode.window.showInformationMessage(`Message on click: ${type}`);
}

function getLanguageFromPath(path: string): string {
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