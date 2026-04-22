import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { CharacterModal } from '@/components/CharacterModal';

interface ICharacterModalProviderProps {
  children: ReactNode;
}
export interface ICharacterModalContextType {
  openCharacterDetails: (characterId: number) => void;
}

export const CharacterModalContext = createContext<
  ICharacterModalContextType | undefined
>(undefined);

export function CharacterModalProvider({
  children
}: ICharacterModalProviderProps) {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCharacterDetails = useCallback((characterId: number) => {
    setSelectedCharacterId(characterId);
    setIsModalOpen(true);
  }, []);

  const closeCharacterDetails = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const clearSelectedCharacter = useCallback(() => {
    setSelectedCharacterId(null);
  }, []);

  const contextValue = useMemo(
    () => ({ openCharacterDetails }),
    [openCharacterDetails]
  );

  return (
    <CharacterModalContext.Provider value={contextValue}>
      {children}
      <CharacterModal
        open={isModalOpen}
        onClose={closeCharacterDetails}
        onExited={clearSelectedCharacter}
        characterId={selectedCharacterId?.toString() || null}
      />
    </CharacterModalContext.Provider>
  );
}
