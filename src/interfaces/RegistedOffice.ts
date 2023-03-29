import {RowDataPacket} from "mysql2";
import BaseInformation from "./BaseInformation";

interface RegistedOffices extends BaseInformation {
    order: number | null;
    version: number | null;
    name: string | null;
}

interface RegistedOfficesWithId extends RegistedOffices {
    businessId: string;
}

interface GetRegistedOffice extends RowDataPacket, RegistedOfficesWithId {}

export {RegistedOffices, RegistedOfficesWithId, GetRegistedOffice};