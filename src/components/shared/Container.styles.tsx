import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const CenteredContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const CenteredColumnContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

export const FullHeightCenteredContainer = styled(CenteredContainer)({
  height: '100vh'
});

export const FullHeightContainer = styled(Box)({
  height: '100vh',
  overflow: 'hidden',
  boxSizing: 'border-box'
});

export const FullHeightFlexContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

export const FlexCenteredContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const DividerBorderTop = styled(Box)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.palette.divider
}));

export const DividerBorderBottom = styled(Box)(({ theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.divider
}));

export const PaddedContainer = styled(Box)({
  padding: 16
});

export const PaddedContainerSmall = styled(Box)({
  padding: 8
});

export const FlexRowSpaceBetween = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

export const FlexRowGap = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'center'
});

export const FlexRowCentered = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const CenteredContainerWithPadding = styled(CenteredContainer)({
  padding: 16
});

export const CenteredContainerWithVerticalPadding = styled(CenteredContainer)({
  paddingTop: 32,
  paddingBottom: 32
});

export const FullHeightGridContainer = styled(Grid)({
  height: '100%'
});

export const FlexCenteredContainerWithPadding = styled(FlexCenteredContainer)({
  padding: 16
});

export const CenteredColumnContainerTextCenter = styled(
  CenteredColumnContainer
)({
  textAlign: 'center'
});

export const MaxWidthFlexContainer = styled(Box)({
  display: 'flex',
  gap: 16,
  width: '100%',
  maxWidth: 1500,
  margin: '0 auto',
  height: '100%'
});

export const HalfWidthContainer = styled(Box)({
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});
