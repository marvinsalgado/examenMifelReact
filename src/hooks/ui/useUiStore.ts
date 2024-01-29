import { useAppDispatch, useAppSelector } from "../../store/rootStore";
import { onChangeDialog } from "../../reducers/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.uiSlice);
  const setModal = (modal: boolean) => {
    dispatch(onChangeDialog(modal));
  };
  return {
    modal,
    setModal,
  };
};
