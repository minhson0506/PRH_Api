import {RowDataPacket} from "mysql2";

interface BusinessIdChanges {
    source: number | null;
    description: string | null;
    changeDate: Date | null;
    change: string | null;
    oldBusinessId: string | null;
    newBusinessId: string | null;
    language: string | null;
}

interface BusinessIdChangesWithId extends BusinessIdChanges {
    businessId: string;
}

interface GetBusinessIdChange extends RowDataPacket, BusinessIdChangesWithId {}

export {BusinessIdChanges, BusinessIdChangesWithId, GetBusinessIdChange};