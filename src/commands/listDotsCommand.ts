import * as vscode from 'vscode';
import Handlers from '../handlers';
import {Dot} from '../Dot';

type DotSelectionType = {
    label: string,
    detail: string,
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

    if(waydotList?.link){
        const documnet = await vscode.workspace.openTextDocument(vscode.Uri.file(waydotList.link));
        vscode.window.showTextDocument(documnet);
    }
    return true;

};

export default listDotsCommand;