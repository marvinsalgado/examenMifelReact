import { DialogMaps } from "./components/Map/Dialog";
import { DialogFormUser } from "./components/form/DialogFormUser";
import { TableUser } from "./components/table/TableUser";

function App() {
  return (
    <>
      <TableUser />
      <DialogFormUser />
      <DialogMaps />
    </>
  );
}

export default App;
