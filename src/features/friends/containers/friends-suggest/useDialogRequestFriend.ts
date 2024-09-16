import {useState } from "react"

export const useDialogRequestFriend = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [message, setMessage] = useState<string>("");
    const SetValueDialog = (message: string) => {
        setShowDialog(true);
        setMessage(message);
    }

    return {
        showDialog, setShowDialog,
        message,
        SetValueDialog
    }
}
