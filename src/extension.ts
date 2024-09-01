import * as vscode from 'vscode';
import Dot from './Dot';
import DotCommands, { DotCommand } from './commands';
import Handlers from './handlers';

// Runs on vs code startup
export function activate(context: vscode.ExtensionContext) {

	context.globalState.update("waydot.Dots", []);

	for (let c of DotCommands){
		const disposable = vscode.commands.registerCommand(c.id, async () => {
			await c.function(context);
		});

		context.subscriptions.push(disposable);
	}
	

	// Events

	const onEditorFileCHange = vscode.window.onDidChangeActiveTextEditor((e:vscode.TextEditor | undefined) => {
		if(e){
			const filePath = e.document.uri.fsPath;
			Handlers.DecorationHandlers.showDecorationsOfFile(context, filePath, e);
		}
	});


	context.subscriptions.push(onEditorFileCHange);

}


export function deactivate() {}
