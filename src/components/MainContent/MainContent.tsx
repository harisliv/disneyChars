import { usePaginatedCharacters } from '@/hooks';
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
    <CharacterModalProvider>
      <MainContentContainer>
        <MaxWidthFlexContainer>
          <HalfWidthContainer>
            <DisneyCharacterTable
              characters={characters}
              totalCount={totalCount}
            />
          </HalfWidthContainer>
          <HalfWidthContainer>
            <CharacterFilmsPieChart characters={characters} />
          </HalfWidthContainer>
        </MaxWidthFlexContainer>
      </MainContentContainer>
    </CharacterModalProvider>
  );
}
