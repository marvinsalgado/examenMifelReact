export interface ResponseGetUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

/* Interfaz para formulario  */
export interface FormValues {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  curp: string;
  rfc: string;
  cp: string;
  calle: string;
  numExt: string;
  numInt: string;
  estado: string;
  municipio: string;
  colonia: string;
}

/* Interfaz del request de guardado */
export interface RequestSaveUser {
  infoUsuario: InfoUsuario;
  Domicilio: Domicilio;
}

export interface Domicilio {
  Calle: string;
  NumeroExterior: string;
  NumeroInterior: string;
  CodigoPostal: string;
  Estado: string;
  Municipio: string;
  Colonia: string;
}

export interface InfoUsuario {
  Nombre: string;
  PrimerApellido: string;
  SegundoApellido: string;
  CURP: string;
  RFC: string;
}

/* Interfaz de respuesta de guardado */
export interface ResponseSaveUser {
  args: Args;
  data: string;
  files: Args;
  form: Args;
  headers: Headers;
  json: JSON;
  origin: string;
  url: string;
}

export interface Args {}

export interface Headers {
  Accept: string;
  "Accept-Encoding": string;
  "Content-Length": string;
  "Content-Type": string;
  Host: string;
  "Postman-Token": string;
  "User-Agent": string;
  "X-Amzn-Trace-Id": string;
}

export interface JSON {
  Domicilio: Domicilio;
  infoUsuario: InfoUsuario;
}

export interface Domicilio {
  Calle: string;
  CodigoPostal: string;
  Colonia: string;
  Estado: string;
  Municipio: string;
  NumeroExterior: string;
  NumeroInterior: string;
}

export interface InfoUsuario {
  CURP: string;
  Nombre: string;
  PrimerApellido: string;
  RFC: string;
  SegundoApellido: string;
}
