import * as vscode from 'vscode';
import { Dot} from '../Dot';
import Handlers from '.';

export type PersistentDecoration = {
    decoration?: vscode.TextEditorDecorationType,
    range?: vscode.Range
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
    dot.range = decRange;
    return true;
};



const showDecorationsOfFile = (context: vscode.ExtensionContext, filePath: string, editor:vscode.TextEditor):boolean=>{
    let dots = Handlers.DotHandlers.listDotsHandler(context);

    if(!dots){
        return false;
    }

    
    dots.forEach((dot)=>{
        if(dot.dotFilePath === filePath){
            console.log(dot.range);
            if(dot.decoration && dot.range){
                addDecoration(context, dot);
            }
        }
    });

    return true;;
};

export const DecorationHandlers =  {addDecoration, showDecorationsOfFile};