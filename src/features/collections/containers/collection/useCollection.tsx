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
    const currentUserId = sessionStorage.getItem('userId') || '';
    
    useEffect(() => {
        getAllPhotos();
    }, []);

    const getAllPhotos = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/v1/collections/photo/${currentUserId}`, 
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

    }
}

export default useCollection;