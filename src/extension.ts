import * as vscode from 'vscode';
import { createFile } from "./maker"

// export function activate(context: vscode.ExtensionContext) {
// 	console.log('Congratulations, your extension "maker" is now active!');
// 	let disposable = vscode.commands.registerCommand('maker.helloWorld', () => {
// 		vscode.window.showInformationMessage('Hello World from maker!');
// 	});
// 	context.subscriptions.push(disposable);
// }

// export function deactivate() { }


export function activate(context: vscode.ExtensionContext) {
	// 다른 활성화 코드들...

	const disposable = vscode.commands.registerCommand('extension.createFile', () => {
		vscode.window.showInputBox({ prompt: 'Enter the file name:' }).then((fileName) => {
			if (fileName) {
				vscode.window.showInputBox({ prompt: 'Enter the file content:' }).then((content) => {
					if (content) {
						createFile(fileName, content);
					}
				});
			}
		});
	});

	context.subscriptions.push(disposable);
}