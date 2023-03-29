import {RowDataPacket} from "mysql2";

interface Name {
    order: number | null;
    version: number | null;
    name: string | null;
    registrationDate: Date | null;
    endDate: Date | null;
    source: number | null;
}

interface NameWithId extends Name {
    businessId: string;
}

interface GetName extends RowDataPacket, NameWithId {}

export {Name, NameWithId, GetName};