import * as vscode from 'vscode';
import Handlers from '../handlers';
import {Dot} from '../Dot';
import dotsToSelections from '../utils/dotsToSelection';

export type DotSelectionType = {
    label: string,
    detail: string,
    id?: string,
    link?: string
};

const listDotsCommand = async (context: vscode.ExtensionContext) : Promise<boolean> => {
    
    let dotList : DotSelectionType[] = dotsToSelections(context);

    const waydotList = await vscode.window.showQuickPick(dotList, {
        canPickMany: false,
    });

    if(waydotList?.link && waydotList?.id){
        const dot : Dot | null = Handlers.DotHandlers.getDotHandler(context, waydotList.id);
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