import {RowDataPacket} from "mysql2";

interface RegisterEntries {
    authority: number | null;
    register: number | null;
    status: number | null;
    registrationDate: Date | null;
    endDate: Date | null;
    statusDate: Date | null;
    language: string | null;
    description: string | null;
}

interface RegisterentriesWithId extends RegisterEntries {
    businessId: string;
}

interface GetRegisterEntry extends RowDataPacket, RegisterentriesWithId {}

export {RegisterEntries, RegisterentriesWithId, GetRegisterEntry};