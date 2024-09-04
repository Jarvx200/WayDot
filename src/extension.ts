import * as vscode from 'vscode';
import {Dot} from './Dot';
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

	const onEditorFileChange = vscode.window.onDidChangeActiveTextEditor((e:vscode.TextEditor | undefined) => {
		if(e){
			const filePath = e.document.uri.fsPath;
			Handlers.DecorationHandlers.showDecorationsOfFile(context, filePath, e);
		}
	});

	const onUpdateLineChange = vscode.workspace.onDidChangeTextDocument((e:vscode.TextDocumentChangeEvent) =>{
		const dots : Dot[] | null = Handlers.DotHandlers.listDotsHandler(context);
		e.contentChanges.forEach((change)=>{
			const linesAdded : number = change.text.split(/\r?\n/).length - 1;
			const linesChangeStart : number = change.range.start.line + 1;

			dots?.forEach((dot)=>{
				if(linesAdded > 0 && dot.dotLine >= linesChangeStart){
					dot.dotLine += linesAdded;	
				}
				else if(linesAdded < 0 && dot.dotLine <= linesChangeStart){
					dot.dotLine += (linesAdded+1);
				}

				Handlers.DotHandlers.changeDotField(context, dot.dotId, 'dotLine', dot.dotLine);
			});

			
		});
	});


	context.subscriptions.push(onEditorFileChange);
	context.subscriptions.push(onUpdateLineChange);

}


export function deactivate() {}
