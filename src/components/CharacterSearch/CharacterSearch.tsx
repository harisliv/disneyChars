import { useState } from 'react';
import { Autocomplete, TextField, CircularProgress, Box } from '@mui/material';
import { useSearchCharacters, useDebounceInputValue } from '@/hooks';
import type { TDisneyCharacter } from '@/types';

interface ICharacterSearchProps {
  onCharacterSelect: (character: TDisneyCharacter | null) => void;
}

export function CharacterSearch({ onCharacterSelect }: ICharacterSearchProps) {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounceInputValue(inputValue, 500);
  const { data: characters = [], isLoading } =
    useSearchCharacters(debouncedSearchTerm);

  return (
    <Autocomplete
      options={characters}
      getOptionLabel={(option) => option.name}
      loading={isLoading}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, value) => onCharacterSelect(value)}
      sx={{ minWidth: 300 }}
      noOptionsText={
        inputValue.length === 0
          ? 'Start typing to search...'
          : 'No characters found'
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search characters..."
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
  );
}
