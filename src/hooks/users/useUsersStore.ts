import Swal from "sweetalert2";
import {
  RequestSaveUser,
  ResponseGetUsers,
} from "../../interface/users/usersInterface";
import {
  onAddUser,
  onChangeModalMap,
  onDeleteUser,
  onEditUser,
  onLoadLstUsers,
  onSelectUser,
} from "../../reducers/users/userslice";
import { getUsersService, saveUserService } from "../../service/usersService";
import { useAppDispatch, useAppSelector } from "../../store/rootStore";
import { useUiStore } from "../ui/useUiStore";
import { getNextID } from "../../helpers/helpers";

export const useUsersStore = () => {
  const dispatch = useAppDispatch();
  const { lstUsers, user, modalMap } = useAppSelector(
    (state) => state.usersSlice
  );
  const { setModal } = useUiStore();

  const startGetUsers = () => {
    getUsersService()
      .then(({ data }) => {
        dispatch(onLoadLstUsers(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addUser = (pUser: ResponseGetUsers) => {
    dispatch(onAddUser(pUser));
  };
  const editUser = (pUser: RequestSaveUser, id: number) => {
    const formatApiuser = {
      id: id,
      name: pUser.infoUsuario.Nombre,
      username: pUser.infoUsuario.Nombre,
      email: `${pUser.infoUsuario.Nombre}@example.com`,
      address: {
        street: pUser.Domicilio.Calle,
        suite: pUser.Domicilio.NumeroExterior,
        city: pUser.Domicilio.Municipio,
        zipcode: pUser.Domicilio.CodigoPostal,
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "5454545454",
      website: `${pUser.infoUsuario.Nombre}${pUser.infoUsuario.RFC}.com`,
      company: {
        name: `${pUser.infoUsuario.Nombre} ${pUser.infoUsuario.PrimerApellido} ${pUser.infoUsuario.SegundoApellido} S.A de C.V`,
        catchPhrase: "Pienso luego existo",
        bs: "harness real-time e-markets",
      },
    } as ResponseGetUsers;
    dispatch(onEditUser(formatApiuser));
    Swal.fire({
      title: "Guardado",
      text: "Se actualizó correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#4caf50",
      didClose: () => {
        setModal(false);
        setUser(null);
      },
      html: `<style>.swal2-container{z-index: 9999;}</style>
      <span>
      Uauario actualizado correctamente
      </span>
      `,
    });
  };
  const deleteUser = (pId: number) => {
    dispatch(onDeleteUser(pId));
  };
  const setUser = (pUser: ResponseGetUsers | null) => {
    dispatch(onSelectUser(pUser));
  };
  const changeModalMap = (pModal: boolean) => {
    dispatch(onChangeModalMap(pModal));
  };
  const startSaveUser = (pRequest: RequestSaveUser) => {
    saveUserService(pRequest)
      .then(() => {
        Swal.fire({
          title: "Guardado",
          text: "Se guardó correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#4caf50",
          didClose: () => {
            setModal(false);
          },
          html: `<style>.swal2-container{z-index: 9999;}</style>
          <span>
          Uauario guardado correctamente
          </span>
          `,
        });
        const formatApiuser = {
          id: getNextID(lstUsers),
          name: pRequest.infoUsuario.Nombre,
          username: pRequest.infoUsuario.Nombre,
          email: `${pRequest.infoUsuario.Nombre}@example.com`,
          address: {
            street: pRequest.Domicilio.Calle,
            suite: pRequest.Domicilio.NumeroExterior,
            city: pRequest.Domicilio.Municipio,
            zipcode: pRequest.Domicilio.CodigoPostal,
            geo: {
              lat: "",
              lng: "",
            },
          },
          phone: "5454545454",
          website: `${pRequest.infoUsuario.Nombre}${pRequest.infoUsuario.RFC}.com`,
          company: {
            name: `${pRequest.infoUsuario.Nombre} ${pRequest.infoUsuario.PrimerApellido} ${pRequest.infoUsuario.SegundoApellido} S.A de C.V`,
            catchPhrase: "Pienso luego existo",
            bs: "harness real-time e-markets",
          },
        } as ResponseGetUsers;
        addUser(formatApiuser);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Ocurrio un error al guardar",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };

  return {
    lstUsers,
    user,
    modalMap,
    startGetUsers,
    startSaveUser,
    addUser,
    editUser,
    deleteUser,
    setUser,
    changeModalMap,
  };
};
