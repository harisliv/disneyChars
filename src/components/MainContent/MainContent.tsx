import { useCharactersLoading, usePaginatedCharacters } from '@/hooks';
import { CircularProgress } from '@mui/material';
import { DisneyCharacterTable } from '../Table';
import { CharacterFilmsPieChart } from '../CharacterFilmsPieChart';
import {
  FullHeightCenteredContainer,
  HalfWidthContainer,
  MaxWidthFlexContainer
} from '../shared';
import { MainContentContainer } from './MainContent.styles';
import { CharacterModalProvider } from '@/context';

export default function MainContent() {
  const { isLoading, data: characters, totalCount } = usePaginatedCharacters();

  if (isLoading) {
    return (
      <FullHeightCenteredContainer>
        <CircularProgress size={60} />
      </FullHeightCenteredContainer>
    );
  }

  return (
    <MainContentContainer>
      <MaxWidthFlexContainer>
        <HalfWidthContainer>
          <CharacterModalProvider>
            <DisneyCharacterTable
              characters={characters}
              totalCount={totalCount}
            />
          </CharacterModalProvider>
        </HalfWidthContainer>
        <HalfWidthContainer>
          <CharacterFilmsPieChart characters={characters} />
        </HalfWidthContainer>
      </MaxWidthFlexContainer>
    </MainContentContainer>
  );
}
