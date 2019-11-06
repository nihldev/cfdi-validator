import { createClientAsync } from "soap";

const url =
  "https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc?wsdl";

interface CFDIValidationResponse {
  responseStatus?: string;
  cfdiStatus?: string;
  isCancellable?: string;
  cancellationStatus?: string;
}

/**
 * Returns an object with the status of the given CFDI parameters
 *
 * @remarks
 * This method checks the given invoice against the mexican Tax Administration System (SAT) SOAP Web Service.
 *
 * @param issuerRFC - Fiscal ID of the person or entity issuing the invoice
 * @param receiverRFC - Fiscal ID of the person or entity of the person the invoice is issued to
 * @param totalAmount - Number representing the invoice's total after taxes
 * @param invoiceID - UUID of the invoice to check the status for
 * @returns An object representing the fiscal status of the given invoice
 */
const validateCFDI = async (
  issuerRFC: string,
  receiverRFC: string,
  totalAmount: number,
  invoiceID: string
): Promise<CFDIValidationResponse> => {
  const printedExpresion = `re=${issuerRFC}&rr=${receiverRFC}&tt=${totalAmount}&id=${invoiceID}`;
  const args = {
    expresionImpresa: printedExpresion
  };

  let client;
  try {
    client = await createClientAsync(url);
  } catch (error) {
    console.error(error);
    throw "Error creating a client for the given url";
  }
  try {
    let response = await client.ConsultaAsync(args);
    const [RESULT_POSITION, RESULT_KEY] = [0, "ConsultaResult"];
    response = response[RESULT_POSITION][RESULT_KEY];
    console.debug(response);
    const result: CFDIValidationResponse = {
      responseStatus: response["CodigoEstatus"] || undefined,
      cfdiStatus: response["Estado"] || undefined,
      isCancellable: response["EsCancelable"] || undefined,
      cancellationStatus: response["EstatusCancelacion"] || undefined
    };
    return result;
  } catch (error) {
    console.error(error);
    throw "There was an error while querying with the given parameters";
  }
};

export default validateCFDI;
export { validateCFDI, CFDIValidationResponse };
