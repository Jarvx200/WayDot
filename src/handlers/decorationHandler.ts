import * as vscode from 'vscode';
import { Dot} from '../Dot';

export type PersistentDecoration = {
    decoration?: vscode.TextEditorDecorationType,
    range?: vscode.Range[]
};

const addDecoration = (context: vscode.ExtensionContext, dot: Dot) : boolean => {
    
    const newDecoration = vscode.window.createTextEditorDecorationType({
        before:{
            contentText: dot.dotIcon,
            margin: "0 0.5em 0 0",
            backgroundColor: "#000000",
        },
        after:{
            contentText: dot.dotIcon,
            margin: "0 0 0 0.5em",
            backgroundColor: "#000000",
        },

        isWholeLine: true,
    });

    const decRange = new  vscode.Range(dot.dotLine, 0, dot.dotLine, 0);

    if(vscode.window.activeTextEditor){
        vscode.window.activeTextEditor.setDecorations(newDecoration, [decRange]);
    }
    
    dot.decoration = newDecoration;
    dot.range = [decRange];
    return true;
};

export {addDecoration};