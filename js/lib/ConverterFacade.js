import RisWriter from "./RisWriter.js";
import BdtdConverter from "./BdtdConverter.js";

export default function convertBdtdToRis(input, outputStreamCb, endCb) {
    /*if(typeof(input)==='string') {
        input = JSON.parse(input);
    }*/
    let risWriter = new RisWriter(outputStreamCb);
    let converter = new BdtdConverter(risWriter);
    converter.parse(input, endCb);
}