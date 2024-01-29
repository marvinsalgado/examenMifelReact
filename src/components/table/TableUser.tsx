import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { useUsersStore } from "../../hooks/users/useUsersStore";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useUiStore } from "../../hooks/ui/useUiStore";
import Swal from "sweetalert2";

export const TableUser = () => {
  const { lstUsers, startGetUsers, setUser, deleteUser, changeModalMap } = useUsersStore();
  const { setModal } = useUiStore();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    website: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    if (!lstUsers.length) {
      startGetUsers();
    } /* eslint-disable-next-line */
  }, [lstUsers]);
  const renderHeader = () => {
    return (
      <div className="flex justify-content-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Buscar"
          />
        </span>
        <Button
          icon="pi pi-plus"
          className="p-button-success ml-5"
          label="Nuevo"
          onClick={() => {
            setModal(true);
          }}
        />
      </div>
    );
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return (
    <div className="card">
      {renderHeader()}
      <DataTable
        value={lstUsers}
        tableStyle={{ minWidth: "50rem" }}
        removableSort
        emptyMessage="No se pudieron localizar usuarios"
        filterLocale="es"
        globalFilter={globalFilterValue}
        filters={filters}
        className="mt-1"
      >
        <Column field="id" header="ID" sortable></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="website" header="WebSite" sortable></Column>
        <Column
          header="Acciones"
          body={(rowData) => {
            return (
              <div className="flex justify-content-center">
                <Button
                  icon="pi pi-pencil"
                  tooltip="Editar"
                  tooltipOptions={{ position: "top" }}
                  className="p-button-warning"
                  onClick={() => {
                    setUser(rowData);
                    setModal(true);
                  }}
                />
                <Button
                  icon="pi pi-trash"
                  className="delete-button  ml-2"
                  tooltip="Eliminar"
                  tooltipOptions={{ position: "top" }}
                  onClick={() => {
                    Swal.fire({
                      title: "¿Está seguro?",
                      text: "¡No podrás revertir esto!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Sí, borrarlo!",
                      cancelButtonText: "Cancelar",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteUser(rowData.id);
                        Swal.fire(
                          "¡Eliminado!",
                          "El registro ha sido eliminado.",
                          "success"
                        );
                      }
                    });
                  }}
                />
                <Button
                  icon="pi pi-eye"
                  tooltip="Ver Dirección"
                  tooltipOptions={{ position: "top" }}
                  className="p-button-info ml-2"
                  type="button"
                  onClick={() => {
                    setUser(rowData);
                    changeModalMap(true);
                  }}
                />
              </div>
            );
          }}
        ></Column>
      </DataTable>
    </div>
  );
};
