import * as vscode from 'vscode';
import Handlers from '../handlers';
import {Dot} from '../Dot';

type DotSelectionType = {
    label: string,
    detail: string,
    id?: string,
    link?: string
};

const listDotsCommand = async (context: vscode.ExtensionContext) : Promise<boolean> => {
    let allDotsObjects : Dot[] | null = Handlers.listDotsHandler(context);

    if(!allDotsObjects){
        return false;
    }


    let dotList : DotSelectionType[] = [];

    for(let dot of allDotsObjects){
        dotList.push({
            label: `${dot.dotIcon} - ${dot.dotName}`,
            detail: `${dot.dotFilePath} at ${dot.dotTime}`,
            id: dot.dotId,
            link: dot.dotFilePath
        });
    }

    if(dotList.length === 0){
        dotList.push({
            label: "No Dots Created",
            detail: "Use Add Dot command to create one!",
        });
    }

    const waydotList = await vscode.window.showQuickPick(dotList, {
        canPickMany: false,
    });

    if(waydotList?.link && waydotList?.id){
        const dot : Dot | null = Handlers.getDotHandler(context, waydotList.id);
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