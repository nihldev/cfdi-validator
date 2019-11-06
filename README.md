# cfdi-validator

Validates a CFDI v3.3 against SAT's SOAP web service

## Installation

```
npm install @nihldev/cfdi-validator
```

## Usage

```javascript
import { validateCFDI } from "@nihldev/cfdi-validator";

validateCFDI("LSO1306189R5", "GACJ940911ASA", 4999.99, "e7df3047-f8de-425d-b469-37abe5b4dabb")
//=> {
//       responseStatus: "S - Comprobante obtenido satisfactoriamente.",
//       cfdiStatus: "Vigente",
//       isCancellable: "Cancelable sin aceptación",
//       cancellationStatus: undefined
//   }
```
