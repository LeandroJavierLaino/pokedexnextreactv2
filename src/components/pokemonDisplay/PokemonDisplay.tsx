import React from 'react'
import Image from 'next/image'
import { Box, Grid, IconButton, Theme, Typography } from '@mui/material'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'

type PokemonDisplayProps = {
  theme: Theme
  src: string
  name: string
  top: boolean
  bottom: boolean
  up(): void
  down(): void
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({
  theme,
  src,
  name,
  top,
  bottom,
  up,
  down,
}) => {
  return (
    <Grid container>
      <Grid item xs={10}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff59e',
          }}
        >
          <Image loader={() => src} src={src} width={300} height={300} alt="" />
          <Typography
            fontFamily={'monospace'}
            fontWeight={700}
            sx={{ marginBottom: theme.spacing(2) }}
          >
            {name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            backgroundColor: '#fff59e',
          }}
        >
          <IconButton onClick={up} disabled={top}>
            <ArrowDropUpRoundedIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={down} disabled={bottom}>
            <ArrowDropDownRoundedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PokemonDisplay
