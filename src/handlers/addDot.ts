import * as vscode from 'vscode';
import Dot, { DotConstructorArgs } from "../Dot";

const addDot = (args: DotConstructorArgs, context: vscode.ExtensionContext) : boolean => {
    let newDot = new Dot(args);
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

export default addDot;