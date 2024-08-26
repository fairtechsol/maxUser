import { cardGamesType } from "../constants";

export default class CasinoProjection {
  type = null;
  data = null;
  constructor(type: String, data: any) {
    this.type = type;
    this.data = data;
  }

  switchByType() {
    switch (this.type) {
      case cardGamesType.dragonTiger20:
        return this.dragonTiger20();
      case cardGamesType.casinoWar:
        return this.casinoWar();
      default:
        break;
    }
  }

  dragonTiger20() {
    const result = {
      t1: [
        {
          C1: this.data?.t1?.[0]?.C1,
          C2: this.data?.t1?.[0]?.C2,
          autotime: this.data?.t1?.[0]?.autotime,
          gtype: this.data?.t1?.[0]?.gtype,
          max: this.data?.t1?.[0]?.max,
          mid: this.data?.t1?.[0]?.mid,
          min: this.data?.t1?.[0]?.min,
        },
      ],
      t2: Array.from({ length: 38 }, (_, i) => i)?.map((_, index) => ({
        gstatus: this.data?.t2?.[index]?.gstatus,
        max: this.data?.t2?.[index]?.max,
        mid: this.data?.t2?.[index]?.mid,
        min: this.data?.t2?.[index]?.min,
        nat: this.data?.t2?.[index]?.nat,
        nation: this.data?.t2?.[index]?.nation,
        rate: this.data?.t2?.[index]?.rate,
        sid: this.data?.t2?.[index]?.sid,
      })),
    };

    return result;
  }

  casinoWar() {
    const result = {
      t1: [
        {
          C1: this.data?.t1?.[0]?.C1 || "1",
          C2: this.data?.t1?.[0]?.C2 || "1",
          C3: this.data?.t1?.[0]?.C3 || "1",
          C4: this.data?.t1?.[0]?.C4 || "1",
          C5: this.data?.t1?.[0]?.C5 || "1",
          C6: this.data?.t1?.[0]?.C6 || "1",
          C7: this.data?.t1?.[0]?.C7 || "1",
          autotime: this.data?.t1?.[0]?.autotime,
          mid: this.data?.t1?.[0]?.mid,
        },
      ],
      t2: Array.from({ length: 54 }, (_, i) => i)?.map((_, index) => ({
        b1: this.data?.t2?.[index]?.b1 || "0",
        gstatus: this.data?.t2?.[index]?.gstatus || "0",
        max: this.data?.t2?.[index]?.max,
        mid: this.data?.t2?.[index]?.mid,
        min: this.data?.t2?.[index]?.min,
        nat: this.data?.t2?.[index]?.nat,
        sid: this.data?.t2?.[index]?.sid,
      })),
    };

    return result;
  }
}
