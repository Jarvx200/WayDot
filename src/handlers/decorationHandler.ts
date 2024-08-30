import * as vscode from 'vscode';
import { Dot, DotConstructorArgs } from '../Dot';

const addDecoration = (context: vscode.ExtensionContext, dot: DotConstructorArgs) : boolean => {
    
    const newDecoration = vscode.window.createTextEditorDecorationType({
        before:{
            contentText: dot.dotIcon + dot.dotName,
            margin: "0 0 0 0",
            backgroundColor: "#FFFFF"
        },
        
        isWholeLine: true,
    });

    const decRange = new  vscode.Range(dot.dotLine, 0, dot.dotLine, 0);

    if(vscode.window.activeTextEditor){
        vscode.window.activeTextEditor.setDecorations(newDecoration, [decRange]);
    }
    
    return true;
};

export {addDecoration};