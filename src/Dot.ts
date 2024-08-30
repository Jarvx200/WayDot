import {v4} from "uuid"
export type DotConstructorArgs = {
    dotFilePath : string;
    dotWorkspace : string;
    dotLine : number;
    dotName : string;
    dotIcon : string;
};

//TODO: file path link

class Dot{
    dotId: string;
    dotFilePath : string;
    dotWorkspace : string;
    dotLine : number;
    dotName : string;
    dotIcon : string;
    dotTime: Date;

    constructor({dotFilePath, dotWorkspace, dotLine, dotName, dotIcon}: DotConstructorArgs){
        this.dotFilePath=dotFilePath;
        this.dotWorkspace=dotWorkspace;
        this.dotLine=dotLine;
        this.dotName = dotName;
        this.dotIcon = dotIcon;
        this.dotTime = new Date();
        this.dotId = v4();
    }


}


export default Dot;