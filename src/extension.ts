import * as vscode from 'vscode';


// Runs on vs code startup
export function activate(context: vscode.ExtensionContext) {


	const disposable = vscode.commands.registerCommand('waydot.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Waydot!');
	});

	context.subscriptions.push(disposable);
}


export function deactivate() {}
