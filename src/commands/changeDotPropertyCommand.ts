import Handlers from "../handlers";
import dotsToSelections from "../utils/dotsToSelection";
import * as vscode from 'vscode';
import { DefaultSelectionType, DotSelectionType } from "./listDotsCommand";
import { Dot } from "../Dot";

const changeDotPropertyCommand =  async (context: vscode.ExtensionContext) : Promise<boolean> => {
    
    let dotList : DotSelectionType[] = dotsToSelections(context);

    const waydotItem = await vscode.window.showQuickPick(dotList, {
        canPickMany: false,
    });

    if(!waydotItem) {return false;}

    interface DefaultSelectionPlusId extends DefaultSelectionType {id:keyof Dot};

    const propertiesList : DefaultSelectionPlusId[]  = [
        {label: "Name", detail: "Change dot's name!", id: "dotName"},
        {label: "Icon", detail: "Change dot's icon!", id: "dotIcon"},
    ];

    let selectedProperty  : DefaultSelectionPlusId | undefined = await vscode.window.showQuickPick(propertiesList,{
        canPickMany: false,
    });

    if(!selectedProperty) {return false;}

    let updatedValue = await vscode.window.showInputBox({
        title: `Updated ${selectedProperty.detail}`,
    });
    
    if(!waydotItem.id || !waydotItem.label || !updatedValue || !selectedProperty.id) {return false;}
    Handlers.DotHandlers.changeDotField(context, waydotItem?.id, selectedProperty.id, updatedValue);


    
    return true;
};



export default changeDotPropertyCommand;