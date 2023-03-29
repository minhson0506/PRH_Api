import {RowDataPacket} from "mysql2";

interface AuxiliaryName {
    order: number | null;
    version: number | null;
    name: string | null;
    registrationDate: Date;
    endDate: Date | null;
    source: number | null;
}

interface AuxiliaryNameWithId extends AuxiliaryName {
    businessId: string;
}

interface GetAuxiliaryName extends RowDataPacket, AuxiliaryNameWithId {}

export {AuxiliaryName, AuxiliaryNameWithId, GetAuxiliaryName};
