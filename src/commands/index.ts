import addDotCommand from "./addDotCommand";
import listDotsCommand from "./listDotsCommand";
import removeDotsCommand from "./removeDotsCommand";

export type DotCommand = {
    id: string,
    function: Function
}

const DotCommands : DotCommand[] = [
    {id:"waydot.addDot", function:addDotCommand},
    {id:"waydot.listDots", function:listDotsCommand},
    {id:"waydot.removeDots", function:removeDotsCommand},
];

export default DotCommands;