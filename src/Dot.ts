
export type DotConstructorArgs = {
    dotFilePath : string;
    dotWorkspace : string;
    dotLine : number;
    dotName : string;
    dotIcon : string;
};

class Dot{
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
    }


}


export default Dot;