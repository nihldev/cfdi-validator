import { createClientAsync } from "soap";

const url =
  "https://consultaqr.facturaelectronica.sat.gob.mx/ConsultaCFDIService.svc?wsdl";

const validateCFDI = async (
  issuerRFC: string,
  receiverRFC: string,
  totalAmount: number,
  invoiceID: string
) => {
  const printedExpresion = `re=${issuerRFC}&rr=${receiverRFC}&tt=${totalAmount}&id=${invoiceID}`;
  const args = {
    expresionImpresa: printedExpresion
  };

  let client, response;
  try {
    client = await createClientAsync(url);
  } catch (error) {
    console.error(error);
    throw "Error creating a client for the given url";
  }
  try {
    response = await client.ConsultaAsync(args);
    console.debug(response);
    return "test";
  } catch (error) {
    console.error(error);
    throw "There was an error while querying with the given parameters";
  }
};

export default validateCFDI;
