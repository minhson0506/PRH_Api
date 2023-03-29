import {RowDataPacket} from "mysql2";
import BaseInformation from "./BaseInformation";

interface BusinessLines extends BaseInformation {
    order: number | null;
    version: number | null;
    code: string | null;
    name: string | null;
}

interface BusinessLinesWithId extends BusinessLines {
    businessId: string;
}

interface GetBusinessLine extends RowDataPacket, BusinessLinesWithId {}


export {BusinessLines, BusinessLinesWithId, GetBusinessLine};