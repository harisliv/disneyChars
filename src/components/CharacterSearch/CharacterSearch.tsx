import { useState } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Paper
} from '@mui/material';
import { useDebounceInputValue, useSearchCharacters } from '@/hooks';
import type { TDisneyCharacter, TSearchType } from '@/types';

interface ICharacterSearchProps {
  onCharacterSelect: (character: TDisneyCharacter | null) => void;
}

function CustomPaper(
  props: React.ComponentProps<typeof Paper> & {
    handleClick: () => void;
    disableMoreButton: boolean;
    showMoreButton: boolean;
    isLoadingMore: boolean;
  }
) {
  const {
    handleClick,
    disableMoreButton,
    showMoreButton,
    isLoadingMore,
    ...paperProps
  } = props;

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleClick();
  };

  return (
    <Paper {...paperProps}>
      {paperProps.children}
      {showMoreButton && (
        <Box
          onMouseDown={(e) => e.preventDefault()}
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            p: 1,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            size="small"
            fullWidth
            onClick={handleButtonClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disableMoreButton || isLoadingMore}
            startIcon={
              isLoadingMore ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {isLoadingMore ? 'Loading...' : 'More'}
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export function CharacterSearch({ onCharacterSelect }: ICharacterSearchProps) {
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState<TSearchType>('name');
  const debouncedSearchTerm = useDebounceInputValue(inputValue, 500);

  const searchParam = { [searchType]: debouncedSearchTerm };

  const {
    data: characters = [],
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useSearchCharacters(searchParam);

  const showHasMore = characters.length > 0;

  const handleSearchTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: TSearchType | null
  ) => {
    if (newValue !== null) {
      setSearchType(newValue);
    }
  };

  const placeholder =
    searchType === 'name'
      ? 'Search by character name...'
      : 'Search by TV show name...';

  const noOptionsText =
    inputValue.length === 0
      ? 'Start typing to search...'
      : 'No characters found';

  const handleMoreClick = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <ToggleButtonGroup
        value={searchType}
        exclusive
        onChange={handleSearchTypeChange}
        size="small"
        aria-label="search type"
      >
        <ToggleButton value="name" aria-label="search by name">
          Name
        </ToggleButton>
        <ToggleButton value="tvShows" aria-label="search by tv show">
          TV Show
        </ToggleButton>
      </ToggleButtonGroup>
      <Autocomplete
        clearOnBlur={false}
        options={characters}
        getOptionLabel={(option) => option.name}
        loading={isLoading}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        onChange={(_, value) => onCharacterSelect(value)}
        filterOptions={(x) => x}
        sx={{ minWidth: 300 }}
        noOptionsText={noOptionsText}
        slots={{
          paper: (props) => (
            <CustomPaper
              {...props}
              handleClick={handleMoreClick}
              disableMoreButton={!hasNextPage}
              showMoreButton={showHasMore}
              isLoadingMore={isFetchingNextPage}
            />
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            size="small"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            key={option._id}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <span>{option.name}</span>
          </Box>
        )}
      />
    </Box>
  );
}
