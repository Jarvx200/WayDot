import * as vscode from 'vscode';
import Dot from './Dot';
import DotCommands from './commands';

// Runs on vs code startup
export function activate(context: vscode.ExtensionContext) {

	context.globalState.update("waydot.Dots", []);

	//automate
	const addDotCommandEntry = vscode.commands.registerCommand('waydot.addDot', async () => {
		await DotCommands.addDotCommand(context);
	});

	const listDotsCommandEntry = vscode.commands.registerCommand('waydot.listDots', async () => {
		await DotCommands.listDotsCommand(context);
	});

	context.subscriptions.push(addDotCommandEntry);
	context.subscriptions.push(listDotsCommandEntry);
}


export function deactivate() {}
