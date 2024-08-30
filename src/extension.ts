import * as vscode from 'vscode';
import Dot from './Dot';
import DotCommands, { DotCommand } from './commands';

// Runs on vs code startup
export function activate(context: vscode.ExtensionContext) {

	context.globalState.update("waydot.Dots", []);

	for (let c of DotCommands){
		const disposable = vscode.commands.registerCommand(c.id, async () => {
			await c.function(context);
		});

		context.subscriptions.push(disposable);
	}

}


export function deactivate() {}
