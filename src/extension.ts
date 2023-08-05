import * as vscode from 'vscode';
import { createDirectory } from "./createDirectory"

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.createDirectory', createDirectory));
}

