import { useContext } from 'react';
import { CharacterModalContext } from '@/context';

export function useCharacterModal() {
  const context = useContext(CharacterModalContext);
  if (context === undefined) {
    throw new Error(
      'useCharacterModal must be used within a CharacterModalProvider'
    );
  }
  return context;
}
