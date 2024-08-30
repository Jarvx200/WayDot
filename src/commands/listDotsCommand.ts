import * as vscode from 'vscode';
import Handlers from '../handlers';
import {Dot} from '../Dot';
import dotsToSelections from '../utils/dotsToSelection';



export interface DefaultSelectionType{
    label: string,
    detail: string,
};

export interface DotSelectionType extends DefaultSelectionType {
   
    id?: string,
    link?: string
};


const listDotsCommand = async (context: vscode.ExtensionContext) : Promise<boolean> => {
    
    let dotList : DotSelectionType[] = dotsToSelections(context);

    const waydotItem = await vscode.window.showQuickPick(dotList, {
        canPickMany: false,
    });

    if(waydotItem?.link && waydotItem?.id){
        const dot : Dot | null = Handlers.DotHandlers.getDotHandler(context, waydotItem.id);
        if(dot){
            const documnet = await vscode.workspace.openTextDocument(vscode.Uri.file(dot.dotFilePath));
            vscode.window.showTextDocument(documnet);
            
            const linePosition : vscode.Position = new vscode.Position(dot.dotLine, 0);
            if(vscode.window.activeTextEditor){
                vscode.window.activeTextEditor.selection = new vscode.Selection(linePosition, linePosition);
                vscode.window.activeTextEditor.revealRange(new vscode.Range(linePosition, linePosition), vscode.TextEditorRevealType.InCenter);
            }
        }
        
    }
    return true;

};

export default listDotsCommand;