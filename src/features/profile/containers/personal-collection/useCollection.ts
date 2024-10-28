import { useEffect, useState } from "react";
import { MyPhoto } from "../../../../interface/interface";
import axios from "axios";
interface AllPhoto {
    img: MyPhoto[];
    video: MyPhoto[];
}
const useCollection = () => {
    const [photos, setPhotos] = useState<AllPhoto>({img: [], video: []});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = sessionStorage.getItem('token');
    const [idUserView, setIdUserView] = useState<string | null>(null);
    
    useEffect(()=> {
        const updateUserIdFromUrl = () => {
          const params = new URLSearchParams(location.search);
          const userId = params.get("id");
          if (userId !== null){
            getAllPhotos(userId);
          }
          setIdUserView(userId);
        };
      
        updateUserIdFromUrl();
      
        window.addEventListener("popstate", updateUserIdFromUrl);
      
        return () => {
          window.removeEventListener("popstate", updateUserIdFromUrl);
        };
      }, []);

    const getAllPhotos = async (userId: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/v1/collections/photo/${userId}`, 
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setPhotos(response.data);
          } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
          } finally {
            setIsLoading(false); 
          }
    }

    return {
        photos, isLoading, error,
        idUserView
    }
}

export default useCollection;