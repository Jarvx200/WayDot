import { DotSelectionType } from "../commands/listDotsCommand";
import { Dot } from "../Dot";
import Handlers from "../handlers";
import * as vscode from "vscode"

const dotsToSelections = (context: vscode.ExtensionContext) : DotSelectionType[] => {
    let allDotsObjects : Dot[] | null = Handlers.listDotsHandler(context);

    if(!allDotsObjects){
        return [];
    }


    let dotList : DotSelectionType[] = [];

    for(let dot of allDotsObjects){
        dotList.push({
            label: `${dot.dotIcon} - ${dot.dotName}`,
            detail: `${dot.dotFilePath} at ${dot.dotTime}`,
            id: dot.dotId,
            link: dot.dotFilePath
        });
    }

    if(dotList.length === 0){
        dotList.push({
            label: "No Dots Created",
            detail: "Use Add Dot command to create one!",
        });
    }

    return dotList;
};

export default dotsToSelections