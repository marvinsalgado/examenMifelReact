import { FormValues, RequestSaveUser } from "../../interface/users/usersInterface";

export const formatBodySave = (body: FormValues) => {
  return {
    infoUsuario: {
      Nombre: body.nombre,
      PrimerApellido: body.primerApellido,
      SegundoApellido: body.segundoApellido,
      CURP: body.curp,
      RFC: body.rfc,
    },
    Domicilio: {
      Calle: body.calle,
      NumeroExterior: body.numExt,
      NumeroInterior: body.numInt,
      CodigoPostal: body.cp,
      Estado: body.estado,
      Municipio: body.municipio,
      Colonia: body.colonia,
    },
  } as RequestSaveUser;
};
