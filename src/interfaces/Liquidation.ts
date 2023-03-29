import {RowDataPacket} from "mysql2";
import BaseInformation from "./BaseInformation";

interface Liquidation extends BaseInformation {
    version: number | null;
    name: string | null;
    type: number | null;
}

interface LiquidationWithId extends Liquidation {
    businessId: string;
}

interface GetLiquidation extends RowDataPacket, LiquidationWithId {}

export {Liquidation, LiquidationWithId, GetLiquidation};