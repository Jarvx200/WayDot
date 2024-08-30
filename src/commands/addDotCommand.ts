import * as vscode from 'vscode';
import Dot,{ DotConstructorArgs } from '../Dot';
import addDot from '../handlers/addDot';

type EmojiSelectionType = {
    label: string,
    detail: string
};



const addDotCommand = async(context: vscode.ExtensionContext) => {

    let newDotInfo: DotConstructorArgs = {
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
        {label: "🐛", detail: "Bug"},
        {label: "💡", detail: "Idea"},
        {label: "⚙️", detail: "Refactor"},
        {label: "🧑‍🔬", detail: "Test"},
        {label: "📑", detail: "Default"}
        //TODO: more to be added + custom user settings
    ];

    const waydotIcon = await vscode.window.showQuickPick(emojiOptions, {
        canPickMany: false,
        ignoreFocusOut: true,
        placeHolder: "Select one option!"
    });


    let filePath = vscode.window.activeTextEditor?.document.uri.fsPath;

    let workspaceFoler = vscode.workspace.workspaceFolders?.at(0);

    
    newDotInfo.dotIcon = waydotIcon ? waydotIcon.label : "📑";
    newDotInfo.dotLine = 0;
    newDotInfo.dotWorkspace = "no workspace";
    newDotInfo.dotFilePath = filePath || "no file";

    addDot(newDotInfo,context);

};


export default addDotCommand;