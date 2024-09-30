import { useState } from "react"
import { MyPhoto } from "../../../interface/interface";


export const useCollectionCard = () => {
    const [photo, setPhoto] = useState<MyPhoto | null>(null);
    const [open, setOpen] = useState(false);

      const openPhoto = (selectedPhoto: MyPhoto) => {
        setPhoto(selectedPhoto); 
        setOpen(true);
      };
    
      const CloseDialogCollectionCard = () => {
        setOpen(false);
        setPhoto(null);
      };
    return {
        photo, setPhoto, open, setOpen,
        openPhoto,
        CloseDialogCollectionCard
    }
}