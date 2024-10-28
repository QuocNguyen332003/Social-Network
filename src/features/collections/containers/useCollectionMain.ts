import { useEffect, useState } from "react";
import { Article, Collection } from "../../../interface/interface";
import axios from "axios";

const useCollectionMain = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const token = sessionStorage.getItem('token');
    const currentUserId = sessionStorage.getItem('userId') || '';
    const [error, setError] = useState<string | null>(null);

    const [currCollection, setCurrCollections] = useState<Collection | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(()=> {
        getAllNameCollection();
    }, []);

    useEffect(()=> {
        if (collections.length > 0){
            setCurrCollections(collections[0]);
        }
    }, [collections]);
    
    useEffect(() => {
      if (currCollection !== null) {
          fetchArticles(currCollection._id);
      }
    }, [currCollection]);

    const getAllNameCollection = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/collections/name/${currentUserId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCollections(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        setError('Lỗi khi tải bài viết. Vui lòng thử lại sau.');
      } finally {
      }
    }
    const fetchArticles = async (collectionId: string) => {
      if (currCollection) {
        try {
          const response = await axios.get(`http://localhost:3000/v1/user/${currentUserId}/collections/${collectionId}/articles`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header
              },
            }
          );
          setArticles(response.data);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error('Error fetching articles:', error.message);
          } else {
            console.error('Unknown error:', error);
          }
        }
      }
    };

    return {
      collections, error, setCollections,
      articles, currCollection, setCurrCollections,
    }
}

export default useCollectionMain;