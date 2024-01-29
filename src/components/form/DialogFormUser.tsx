import { Dialog } from "primereact/dialog";
import { useUiStore } from "../../hooks/ui/useUiStore";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "../general/formInputText";
import { Button } from "primereact/button";
import { useEffect, useRef } from "react";
import { FormValues } from "../../interface/users/usersInterface";
import { formatBodySave } from "./helper";
import Swal from "sweetalert2";
import { useUsersStore } from "../../hooks/users/useUsersStore";

export const DialogFormUser = () => {
  const { modal, setModal } = useUiStore();
  const { user, startSaveUser, setUser, editUser } = useUsersStore();
  const formActions = useForm<FormValues>();
  const submitRef = useRef(null);
  const onSubmit = (data: FormValues) => {
    const body = formatBodySave(data);
    Swal.fire({
      title: "Correcto",
      text: "El formulario se ha validado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#4caf50",
      didClose: () => {
        if (user) {
          editUser(body, user.id);
        } else {
          startSaveUser(body);
        }
      },
      html: `<style>.swal2-container{z-index: 9999;}</style>
      <span>
      El formulario se ha validado correctamente
      </span>
      `,
    });
  };
  const allowedKeys = /^[a-zA-Z\s]*$/;
  const allowedKeysWNumbers = /^[a-zA-Z0-9\s]*$/;
  useEffect(() => {
    if (user) {
      formActions.setValue("nombre", user.name);
      formActions.setValue("primerApellido", user.username);
      formActions.setValue("segundoApellido", user.username);
      formActions.setValue("curp", user.username);
      formActions.setValue("rfc", user.username);
      formActions.setValue("cp", user.address.zipcode);
      formActions.setValue("calle", user.address.street);
      formActions.setValue("numExt", user.address.suite);
      formActions.setValue("numInt", user.address.suite);
      formActions.setValue("estado", user.address.city);
      formActions.setValue("municipio", user.address.city);
      formActions.setValue("colonia", user.address.city);
    } 
    return () => {
      formActions.reset(
        {
          nombre: "",
          primerApellido: "",
          segundoApellido: "",
          curp: "",
          rfc: "",
          cp: "",
          calle: "",
          numExt: "",
          numInt: "",
          estado: "",
          municipio: "",
          colonia: "",
        },
        { keepValues: false, keepDirty: false
        }
      );
    };
    /* eslint-disable-next-line */
  }, [user]);

  return (
    <Dialog
      visible={modal}
      onHide={() => {
        setModal(false);
        setUser(null);
        formActions.reset();
      }}
      closable={false}
      style={{ width: "80vw", height: "70vh" }}
      header="Nuevo usuario"
      draggable={false}
      headerStyle={{
        backgroundColor: "#f2f2f2",
        color: "#000",
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
      footer={
        <>
          <Button
            label="Guardar"
            className="p-button-success"
            type="button"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              submitRef.current.click();
            }}
          />
          <Button
            label="Cancelar"
            className="p-button-danger"
            style={{
              backgroundColor: "#f2f2f2",
              color: "#000",
            }}
            type="button"
            onClick={() => {
              setModal(false);
              setUser(null);
              formActions.reset();
            }}
          />
        </>
      }
    >
      <FormProvider {...formActions}>
        <form
          onSubmit={formActions.handleSubmit(onSubmit)}
          className="grid p-fluid col-12 mt-3"
          style={{ marginTop: "20px" }}
        >
          <div className="col-4 mt-3">
            <FormInputText
              name="nombre"
              label="Nombre"
              isrequired={true}
              keyfilter={allowedKeys}
              rules={{
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
                pattern: {
                  value: allowedKeys,
                  message: "Nombre no válido",
                },
              }}
            />
          </div>
          <div className="col-4 mt-3">
            <FormInputText
              name="primerApellido"
              label="Primer Apellido"
              isrequired={true}
              keyfilter={allowedKeys}
              rules={{
                required: {
                  value: true,
                  message: "El primer apellido es requerido",
                },
                pattern: {
                  value: allowedKeys,
                  message: "Primer apellido no válido",
                },
              }}
            />
          </div>
          <div className="col-4 mt-3">
            <FormInputText
              name="segundoApellido"
              label="Segundo Apellido"
              isrequired={true}
              keyfilter={allowedKeys}
              rules={{
                required: {
                  value: true,
                  message: "El segundo apellido es requerido",
                },
                pattern: {
                  value: allowedKeys,
                  message: "Segundo apellido no válido",
                },
              }}
            />
          </div>
          <div className="col-6 mt-3">
            <FormInputText
              name="curp"
              label="CURP"
              keyfilter={"alphanum"}
              isrequired={true}
              maxLength={18}
              rules={{
                required: {
                  value: true,
                  message: "El CURP es requerido",
                },
                pattern: {
                  value:
                    /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
                  message: "CURP no válido",
                },
              }}
            />
          </div>
          <div className="col-6 mt-3">
            <FormInputText
              name="rfc"
              label="RFC(con homoclave)"
              keyfilter={"alphanum"}
              isrequired={true}
              rules={{
                required: {
                  value: true,
                  message: "El RFC es requerido",
                },
                pattern: {
                  value:
                    /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                  message: "RFC no válido",
                },
              }}
            />
          </div>
          <div className="col-2 mt-3">
            <FormInputText
              name="cp"
              label="Código Postal"
              keyfilter={"pint"}
              isrequired={true}
              maxLength={5}
              rules={{
                required: {
                  value: true,
                  message: "El código postal es requerido",
                },
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Código postal no válido",
                },
              }}
            />
          </div>
          <div className="col-10 mt-3">
            <FormInputText
              name="calle"
              label="Calle"
              keyfilter={allowedKeysWNumbers}
              isrequired={true}
              rules={{
                required: {
                  value: true,
                  message: "La calle es requerida",
                },
                pattern: {
                  value: allowedKeysWNumbers,
                  message: "Calle no válida",
                },
              }}
            />
          </div>
          <div className="col-3 mt-3">
            <FormInputText
              name="numExt"
              label="Número Exterior"
              keyfilter={"pint"}
              isrequired={true}
              maxLength={5}
              rules={{
                required: {
                  value: true,
                  message: "El número exterior es requerido",
                },
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Número exterior no válido",
                },
              }}
            />
          </div>
          <div className="col-3 mt-3">
            <FormInputText
              name="numInt"
              label="Número Interior"
              keyfilter={allowedKeysWNumbers}
              maxLength={10}
            />
          </div>
          <div className="col-6 mt-3">
            <FormInputText
              name="estado"
              label="Estado"
              isrequired={true}
              maxLength={10}
              keyfilter={allowedKeys}
              rules={{
                required: {
                  value: true,
                  message: "El estado es requerido",
                },
                pattern: {
                  value: allowedKeys,
                  message: "Estado no válido",
                },
              }}
            />
          </div>
          <div className="col-6 mt-3">
            <FormInputText
              name="municipio"
              label="Delegación / Municipio"
              isrequired={true}
              keyfilter={allowedKeys}
              rules={{
                required: {
                  value: true,
                  message: "El municipio es requerido",
                },
                pattern: {
                  value: allowedKeys,
                  message: "Municipio no válido",
                },
              }}
            />
          </div>
          <div className="col-6 mt-3">
            <FormInputText
              name="colonia"
              label="Colonia"
              isrequired={true}
              keyfilter={allowedKeys}
              rules={{
                required: {
                  value: true,
                  message: "La colonia es requerida",
                },
                pattern: {
                  value: allowedKeys,
                  message: "Colonia no válida",
                },
              }}
            />
          </div>
          <Button
            label="Guardar"
            className="p-button-success hidden"
            type="submit"
            ref={submitRef}
          />
        </form>
      </FormProvider>
    </Dialog>
  );
};
