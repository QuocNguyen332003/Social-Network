import { useState } from "react";

const useDialogFollow = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [first, setFirst] = useState<number>(0);

    const handleClickOpenDialog = (value: number) => {
        setOpenDialog(true);
        setFirst(value);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return {
        openDialog, first,
        handleClickOpenDialog, handleCloseDialog,
    }
}

export default useDialogFollow;