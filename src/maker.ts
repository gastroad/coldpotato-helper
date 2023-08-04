import * as vscode from 'vscode';
import * as fs from 'fs';

export function createFile(fileName: string, content: string): void {
  if (vscode.workspace.workspaceFolders) {
    const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const filePath = vscode.Uri.joinPath(vscode.Uri.file(rootPath), fileName);

    fs.writeFile(filePath.fsPath, content, (err) => {
      if (err) {
        vscode.window.showErrorMessage(`Failed to create the file: ${err.message}`);
      } else {
        vscode.window.showInformationMessage(`File "${fileName}" created successfully!`);
      }
    });
  } else {
    vscode.window.showErrorMessage('No workspace folder found. Cannot create the file.');
  }
}
