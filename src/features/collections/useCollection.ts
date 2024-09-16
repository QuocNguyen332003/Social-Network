import { createContext, useContext } from 'react';

export interface CollectionContextType {
  currCollection: number;
  setCurrCollection: (index: number) => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

const useCollectionContext = () => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCollectionContext must be used within a CollectionProvider');
  }
  return context;
};

export { CollectionContext, useCollectionContext };
