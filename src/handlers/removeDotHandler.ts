import * as vscode from 'vscode';
import { Dot } from '../Dot';

const removeDotHandler = (context: vscode.ExtensionContext, uuid: string) : boolean => {
    const allDots : Dot[] | undefined = context.globalState.get<Dot[]>("waydot.Dots");
    
    if (!allDots){
        return false;
    }

    const dots : Dot[] | undefined = allDots.filter((dot:Dot) => dot.dotId !== uuid);

    context.globalState.update("waydot.Dots", dots);

    return true;
};

export default removeDotHandler;