import * as vscode from 'vscode';
import createDot, { DotConstructorArgs, Dot } from '../Dot';
import Handlers from '../handlers';

type EmojiSelectionType = {
    label: string,
};



const addDotCommand = async(context: vscode.ExtensionContext) => {

    let newDotInfo: DotConstructorArgs  = {
        dotFilePath: "",
        dotIcon:"",
        dotLine:-1,
        dotName:"",
        dotWorkspace: ""
    };

    const waydotName = await vscode.window.showInputBox({
        prompt: "Enter waydot name:",
        placeHolder: "Default: dot-<idx> "
    });

    waydotName ? 
    newDotInfo.dotName = waydotName
    :
    newDotInfo.dotName = `dot-${(context.globalState.get<Dot[]>("waydot.Dots")?.length)}` || "dot-x";


    const emojiOptions : EmojiSelectionType[] = [
        {label: "🐛 Bug"},
        {label: "💡 Idea"},
        {label: "⚙️ Refactor"},
        {label: "🧑‍🔬 Test"},
        {label: "📑 Default"}
        //TODO: more to be added + custom user settings
    ];

    const waydotIcon = await vscode.window.showQuickPick(emojiOptions, {
        canPickMany: false,
        ignoreFocusOut: true,
        placeHolder: "Select one option!"
    });

    const activeEditor = vscode.window.activeTextEditor;

    let filePath : string | undefined;
    let lineNumber : number | undefined;
    if (activeEditor){
        filePath = vscode.window.activeTextEditor?.document.uri.fsPath;
        lineNumber = activeEditor?.selection.active.line;
    }

    let workspaceFolderName : string | undefined = vscode.workspace.workspaceFolders?.at(0)?.name;


    
    newDotInfo.dotIcon = waydotIcon ? waydotIcon.label : "📑";
    newDotInfo.dotLine = lineNumber || 0;
    newDotInfo.dotWorkspace = workspaceFolderName || "";
    newDotInfo.dotFilePath = filePath || "no file";


    let newDot:Dot = createDot(newDotInfo);

    Handlers.DotHandlers.addDotHandler(newDot, context);

    if(waydotIcon?.label.split(" ")[0] && lineNumber){
        Handlers.addDecoration(context, newDot);
    }

};


export default addDotCommand;