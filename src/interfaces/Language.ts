import {RowDataPacket} from "mysql2";
import BaseInformation from "./BaseInformation";

interface Languages extends BaseInformation {
    version: number | null;
    name: string | null;
}

interface LanguagesWithId extends Languages {
    businessId: string;
}

interface GetLanguage extends RowDataPacket, LanguagesWithId {}

export {Languages, LanguagesWithId, GetLanguage};
