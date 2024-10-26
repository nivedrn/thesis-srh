import * as vscode from 'vscode';

export class WorkspaceItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly type: 'file' | 'folder',
        public readonly children: WorkspaceItem[] = [],
        public readonly path: string
    ) {
        super(label, collapsibleState);
        this.contextValue = type; 
        this.command = { 
            command: 'cohesion-workspace.itemClicked',
            title: 'Item Clicked',
            arguments: [this.path, this.type]
        };
    }
}

export class WorkspaceTreeProvider implements vscode.TreeDataProvider<WorkspaceItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<WorkspaceItem | undefined | null | void> = new vscode.EventEmitter<WorkspaceItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<WorkspaceItem | undefined | null | void> = this._onDidChangeTreeData.event;

    private workspaceTree: WorkspaceItem[] = []; // Initialize an empty workspace tree

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    /**
     * Set the workspace tree data.
     * @param data Array of workspace tree data.
     */
    setWorkspaceTree(data: any[]): void {
        this.workspaceTree = this.buildTreeItems(data[0]);
        this.refresh();
    }

    /**
     * Build tree items from raw data.
     * @param data Raw data representing the workspace structure.
     * @returns Array of WorkspaceItem objects.
     */
    private buildTreeItems(data: any[]): WorkspaceItem[] {
        console.log('TreeDataProvider Data: ', data);
        let result = data.map((item) => {
            console.log('TreeDataProvider Loop: ', item);
            if (item.type === 'folder') {
                return new WorkspaceItem(
                    item.name,
                    vscode.TreeItemCollapsibleState.Expanded,
                    'folder',
                    this.buildTreeItems(item.children || []),
                    item.path
                );
            } else {
                return new WorkspaceItem(
                    item.name,
                    vscode.TreeItemCollapsibleState.None,
                    'file',
                    [],
                    item.path
                );
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
    getTreeItem(element: WorkspaceItem): vscode.TreeItem {
        return element;
    }

    /**
     * Get children for a given element.
     * @param element The parent tree item element.
     * @returns Array of children elements.
     */
    getChildren(element?: WorkspaceItem): Thenable<WorkspaceItem[]> {
        if (element) {
            return Promise.resolve(element.children);
        } else {
            return Promise.resolve(this.workspaceTree);
        }
    }
}
