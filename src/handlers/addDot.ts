import * as vscode from 'vscode';
import { DotConstructorArgs, Dot} from "../Dot";
import createDot from '../Dot';

const addDot = (args: DotConstructorArgs, context: vscode.ExtensionContext) : boolean => {
    let newDot = createDot(args);
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