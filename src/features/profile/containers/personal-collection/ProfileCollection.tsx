import { Box} from "@mui/material";
import CollectionCard from "../../../../shared/components/collection-card/CollectionCard";
import useCollection from "./useCollection";

const ProfileCollection = () => {
  const {photos} = useCollection();
  
  return (
    <Box sx={{
      backgroundColor: '#e9e9e9',
      padding: '20px'
    }}>
      <CollectionCard title={"Ảnh"} data={photos.img} id={'collection-image'} type={"img"}/>
      <CollectionCard title={"Video"} data={photos.video} id={'collection-video'} type={"video"}/>
      
    </Box>
  );
};

export default ProfileCollection;
