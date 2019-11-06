import * as soap from "soap";
import { validateCFDI, CFDIValidationResponse } from "../src";
jest.mock("soap");

const successMessage = "S - Comprobante obtenido satisfactoriamente.";
const dummyResponse = {
  ConsultaResult: {
    CodigoEstatus: successMessage,
    EsCancelable: null,
    Estado: null,
    EstatusCancelacion: null
  }
};

describe("validateCFDI", () => {
  it("Parses web service response", async () => {
    Object.defineProperty(soap, "createClientAsync", async (_: any) => {
      return {
        ConsultaAsync: async (_: any) => {
          return dummyResponse;
        }
      };
    });
    const result = await validateCFDI(
      "LAN8507268IA",
      "LAN7008173R5",
      5800.0,
      "8E4B62EE-3CD3-4874-B75E-F6C0C443A0FB"
    );
    const expected: CFDIValidationResponse = {
      responseStatus: successMessage
    };
    expect(result).toBe(expected);
  });
});
