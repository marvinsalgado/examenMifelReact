import { Dialog } from "primereact/dialog";

import { DialogMap } from "./DialogMap";
import { useUsersStore } from "../../hooks/users/useUsersStore";

export const DialogMaps = () => {
  const { modalMap, changeModalMap, setUser } = useUsersStore();
  return (
    <Dialog
      visible={modalMap}
      onHide={() => {
        changeModalMap(false);
        setUser(null);
      }}
      style={{ width: "50vw", height: "50vh"}}
    >
      <DialogMap />
    </Dialog>
  );
};
