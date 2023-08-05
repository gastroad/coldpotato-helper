import * as vscode from 'vscode';
import { createComponent } from "./command/createComponent"

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.createComponent', createComponent));
}




