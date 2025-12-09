import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Skeleton,
  Fade
} from '@mui/material';
import { useState } from 'react';
import { useCharacter } from '@/hooks/useCharacter';

interface ICharacterDetailsModalProps {
  open: boolean;
  onClose: () => void;
  characterId: string | null;
}

interface ICharacterImageProps {
  imageUrl: string;
  name: string;
}

function CharacterImage({ imageUrl, name }: ICharacterImageProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Box sx={{ position: 'relative' }}>
      {imageLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ borderRadius: 2 }}
        />
      )}
      <Box
        component="img"
        src={imageUrl}
        alt={name}
        onLoad={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          display: imageLoading ? 'none' : 'block'
        }}
      />
    </Box>
  );
}

export function CharacterDetailsModal({
  open,
  onClose,
  characterId
}: ICharacterDetailsModalProps) {
  const { data: character, isLoading, error } = useCharacter(characterId || '');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      keepMounted
      slots={{ transition: Fade }}
      slotProps={{
        transition: {
          timeout: 500
        }
      }}
    >
      <DialogTitle>Character Details</DialogTitle>
      <DialogContent>
        {isLoading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box py={2}>
            <Typography color="error">
              Failed to load character details. Please try again.
            </Typography>
          </Box>
        )}

        {character && (
          <Box>
            {/* Character Name */}
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              {character.name}
            </Typography>

            <Grid container spacing={3}>
              {/* Character Image */}
              <Grid size={{ xs: 12, md: 5 }}>
                {character.imageUrl ? (
                  <CharacterImage
                    imageUrl={character.imageUrl}
                    name={character.name}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: 300,
                      borderRadius: 2,
                      bgcolor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography color="text.secondary">
                      No image available
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Details Section */}
              <Grid size={{ xs: 12, md: 7 }}>
                {/* TV Shows */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    TV Shows
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  {character.tvShows && character.tvShows.length > 0 ? (
                    <List dense>
                      {character.tvShows.map((show: string, index: number) => (
                        <ListItem key={index}>
                          <ListItemText primary={show} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography color="text.secondary" sx={{ py: 1 }}>
                      No TV shows available
                    </Typography>
                  )}
                </Box>

                {/* Video Games */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Video Games
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  {character.videoGames && character.videoGames.length > 0 ? (
                    <List dense>
                      {character.videoGames.map(
                        (game: string, index: number) => (
                          <ListItem key={index}>
                            <ListItemText primary={game} />
                          </ListItem>
                        )
                      )}
                    </List>
                  ) : (
                    <Typography color="text.secondary" sx={{ py: 1 }}>
                      No video games available
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
