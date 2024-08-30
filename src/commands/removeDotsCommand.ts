import * as vscode from "vscode";
import dotsToSelections from "../utils/dotsToSelection";
import { DotSelectionType } from "./listDotsCommand";
import Handlers from "../handlers";

const removeDotsCommand = async (context:vscode.ExtensionContext) : Promise<boolean> => {
    const dotList:DotSelectionType[] = dotsToSelections(context);
    const waydotList = await vscode.window.showQuickPick(dotList, {
        canPickMany: true,
    });

    waydotList?.forEach((dot)=>{
        if(dot.id){
            Handlers.DotHandlers.removeDotHandler(context, dot.id);
        }
    });

    return true;
};

export default removeDotsCommand;