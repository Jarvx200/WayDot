import {v4} from "uuid";
import { PersistentDecoration } from "./handlers/decorationHandler";

export interface DotConstructorArgs{
    dotFilePath : string;
    dotWorkspace : string;
    dotLine : number;
    dotName : string;
    dotIcon : string;
};


export interface Dot extends DotConstructorArgs, PersistentDecoration{
    dotId: string;
    dotTime: Date;
}

const createDot = (args: DotConstructorArgs) : Dot => {
    let dot : Dot = {
        ...args,
        dotId: v4(),
        dotTime: new Date(),
    };
    return dot;
};


export default createDot;