import addDotCommand from "./addDotCommand";
import changeDotPropertyCommand from "./changeDotPropertyCommand";
import listDotsCommand from "./listDotsCommand";
import removeDotsCommand from "./removeDotsCommand";

export type DotCommand = {
    id: string,
    function: Function
};

const DotCommands : DotCommand[] = [
    {id:"waydot.addDot", function:addDotCommand},
    {id:"waydot.listDots", function:listDotsCommand},
    {id:"waydot.removeDots", function:removeDotsCommand},
    {id:"waydot.changeDot", function:changeDotPropertyCommand},
];

export default DotCommands;