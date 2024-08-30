import {v4} from "uuid";
export interface DotConstructorArgs{
    dotFilePath : string;
    dotWorkspace : string;
    dotLine : number;
    dotName : string;
    dotIcon : string;
};


export interface Dot extends DotConstructorArgs{
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