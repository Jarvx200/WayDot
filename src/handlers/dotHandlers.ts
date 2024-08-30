import * as vscode from 'vscode';
import { Dot } from "../Dot";

const addDotHandler = (newDot: Dot, context: vscode.ExtensionContext) : boolean => {
    let updatedDots : Dot[] | undefined = context.globalState.get<Dot[]>("waydot.Dots");

    if(updatedDots){
        updatedDots.push(newDot);
    } else {
        console.error("Could not get dots from storage!");
        return false;
    }
    
    context.globalState.update("wayDot.dots", updatedDots);

    return true;
};

const getDotHandler = (context:vscode.ExtensionContext, uuid: string) : Dot | null => {
    const allDots : Dot[] | undefined = context.globalState.get<Dot[]>("waydot.Dots");
    
    if (!allDots){
        return null;
    }

    const dot : Dot | undefined = allDots.find((dot:Dot) => dot.dotId === uuid);

    return dot || null;
};

const listDotsHandler = (context: vscode.ExtensionContext) :  Dot[] | null => {
    let dots : Dot[] | undefined = context.globalState.get<Dot[]>("waydot.Dots");
    return dots || null;
};

const removeDotHandler = (context: vscode.ExtensionContext, uuid: string) : boolean => {
    const allDots : Dot[] | undefined = context.globalState.get<Dot[]>("waydot.Dots");
    
    if (!allDots){
        return false;
    }

    const dots : Dot[] | undefined = allDots.filter((dot:Dot) => dot.dotId !== uuid);

    context.globalState.update("waydot.Dots", dots);

    return true;
};

export const DotHandlers = {
    getDotHandler,
    removeDotHandler,
    listDotsHandler,
    addDotHandler
};



