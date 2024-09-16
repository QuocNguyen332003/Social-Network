import {useState } from "react"

export const useDialogFriend = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [currUserID, setCurrUserID] = useState<string | null>(null);
    const [currName, setCurrName] = useState<string | null>(null);

    const askDeleteFriend = (userID: string, name: string) => {
        setShowDialog(true);
        setCurrUserID(userID);
        setCurrName(name);
    }

    return {
        showDialog, setShowDialog,
        currUserID, currName,
        askDeleteFriend,
    }
}
