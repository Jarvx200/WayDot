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

const changeDotField = <T extends keyof Dot>(context: vscode.ExtensionContext, uuid: string, propertyName: T, propertyUpdateValue: Dot[T]) : boolean => {
    const dotToBeFound : Dot | null= getDotHandler(context, uuid);

    const updateDots : Dot[] | undefined = context.globalState.get<Dot[]>("waydot.Dots");

    let dotIndex = 0;
    if(dotToBeFound && updateDots){
        dotIndex = updateDots.indexOf(dotToBeFound);
        updateDots[dotIndex][propertyName] = propertyUpdateValue;
    }

    context.globalState.update("waydot.Dots", updateDots);

    
    return true;
};


export const DotHandlers = {
    getDotHandler,
    removeDotHandler,
    listDotsHandler,
    addDotHandler,
    changeDotField
};



