import * as vscode from 'vscode';
import {Dot} from "../Dot";

const listDotsHandler = (context: vscode.ExtensionContext) :  Dot[] | null => {
    let dots : Dot[] | undefined = context.globalState.get<Dot[]>("waydot.Dots");
    return dots || null;
};

export default listDotsHandler;