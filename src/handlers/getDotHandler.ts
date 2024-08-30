import * as vscode from 'vscode';
import { Dot } from "../Dot";

const getDotHandler = (context:vscode.ExtensionContext, uuid: string) : Dot | null => {
    const allDots : Dot[] | undefined = context.globalState.get<Dot[]>("waydot.Dots");
    
    if (!allDots){
        return null;
    }

    const dot : Dot | undefined = allDots.find((dot:Dot) => dot.dotId === uuid);

    return dot || null;
};

export default getDotHandler;