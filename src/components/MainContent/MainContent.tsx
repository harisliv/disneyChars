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

export default function MainContent() {
  const { isLoading } = usePaginatedCharacters();

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
          <DisneyCharacterTable />
        </HalfWidthContainer>
        <HalfWidthContainer>
          <CharacterFilmsPieChart />
        </HalfWidthContainer>
      </MaxWidthFlexContainer>
    </MainContentContainer>
  );
}
