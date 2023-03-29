import {RowDataPacket} from "mysql2";
import BaseInformation from "./BaseInformation";

interface Address extends BaseInformation {
    careOf: string | null;
    street: string | null;
    postCode: string | null;
    type: number | null;
    version: number | null;
    city: string | null;
    country: string | null;
}

interface AddressWithId extends Address {
    businessId: string;
}

interface GetAddress extends RowDataPacket, AddressWithId {}

export {Address, AddressWithId, GetAddress};