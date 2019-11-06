import { validateCFDI, CFDIValidationResponse } from "../src";

const successMessage = "S - Comprobante obtenido satisfactoriamente.";
const dummyResponse = {
  ConsultaResult: {
    CodigoEstatus: successMessage,
    EsCancelable: null,
    Estado: null,
    EstatusCancelacion: null
  }
};

jest.mock("soap", () => {
  return {
    createClientAsync: jest.fn((..._: any[]): any => {
      return {
        ConsultaAsync: jest.fn((..._: any[]): any => {
          return [dummyResponse];
        })
      };
    })
  };
});

describe("validateCFDI", () => {
  it("Parses web service response", async () => {
    const result = await validateCFDI(
      "XAXX010101000",
      "XAXX010101000",
      5800.0,
      "8E4B62EE-3CD3-4874-B75E-F6C0C443A0FB"
    );
    const expected: CFDIValidationResponse = {
      responseStatus: successMessage,
      cfdiStatus: undefined,
      isCancellable: undefined,
      cancellationStatus: undefined
    };
    expect(result).toStrictEqual(expected);
  });
});
