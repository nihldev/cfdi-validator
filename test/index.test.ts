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
import { createClientAsync } from "soap";
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

  it("Throws an error when failed to create a soap client", async () => {
    const createClientMock: jest.Mock<
      typeof createClientAsync
    > = createClientAsync as any;
    createClientMock.mockImplementation((..._: any[]) => {
      throw new Error("Some client error");
    });
    await expect(
      validateCFDI(
        "XAXX010101000",
        "XAXX010101000",
        5800.0,
        "8E4B62EE-3CD3-4874-B75E-F6C0C443A0FB"
      )
    ).rejects.toEqual("Error creating a client for the given url");
  });

  it("Throws an error failed to query the web service", async () => {
    const createClientMock: jest.Mock<
      typeof createClientAsync
    > = createClientAsync as any;
    createClientMock.mockImplementation((..._: any[]): any => {
      return {
        ConsultaAsync: jest.fn((..._: any[]): any => {
          throw new Error("Request error");
        })
      };
    });
    await expect(
      validateCFDI(
        "XAXX010101000",
        "XAXX010101000",
        5800.0,
        "8E4B62EE-3CD3-4874-B75E-F6C0C443A0FB"
      )
    ).rejects.toEqual(
      "There was an error while querying with the given parameters"
    );
  });
});
