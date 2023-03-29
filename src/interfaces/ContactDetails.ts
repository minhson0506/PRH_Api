import {RowDataPacket} from "mysql2";
import BaseInformation from "./BaseInformation";

interface ContactDetails extends BaseInformation {
    version: number | null;
    value: string | null;
    type: string | null;
}

interface ContactDetailsWithId extends ContactDetails {
    businessId: string;
}

interface GetContactDetail extends RowDataPacket, ContactDetailsWithId {}

export {ContactDetails, ContactDetailsWithId, GetContactDetail};
