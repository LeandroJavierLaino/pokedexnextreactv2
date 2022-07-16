import React, { useState } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import { theme } from '../../styles/theme'
import LightButton from '../lightButton/LightButton'
import { Screen } from '../screen/Screen'
import PokemonDisplay from '../pokemonDisplay/PokemonDisplay'

const pokemons = [
  {
    name: 'Pikachu',
    imageSrc:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  {
    name: 'Ditto',
    imageSrc:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
  },
  {
    name: 'Bulbasaur',
    imageSrc:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
]

export default function Layout() {
  const [pokemonIndex, setPokemonIndex] = useState<number>(0)

  const upPokemon = () => {
    if (pokemonIndex > 0) {
      setPokemonIndex(pokemonIndex - 1)
    }
  }

  const downPokemon = () => {
    if (pokemonIndex < pokemons.length) {
      setPokemonIndex(pokemonIndex + 1)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: theme.spacing(120),
        }}
      >
        <Grid xs={2}>
          <LightButton />
        </Grid>
        <Grid sx={{ zIndex: 2 }} item container direction="column" xs={8}>
          <Grid item xs={0.5} sx={{ zIndex: 3 }}></Grid>
          <Box
            className="screen"
            sx={{
              boxShadow: '0px 0px 5px black',
            }}
          >
            <Screen theme={theme}>
              <PokemonDisplay
                theme={theme}
                src={pokemons[pokemonIndex].imageSrc}
                name={pokemons[pokemonIndex].name}
                top={pokemonIndex === 0}
                bottom={pokemonIndex === pokemons.length - 1}
                up={upPokemon}
                down={downPokemon}
              />
            </Screen>
          </Box>

          <Grid item sx={{ marginBlock: theme.spacing(2), zIndex: 1 }}>
            <Input
              sx={{
                width: '80%',
                borderRadius: theme.spacing(10),
                backgroundColor: '#fff59e',
                boxShadow: 'inset 0px 0px 15px black',
                fontFamily: 'monospace',
                fontWeight: 700,
                paddingInline: theme.spacing(2),
                '&:before': {
                  borderBottom: '0px solid #fff',
                },
              }}
            />
            <IconButton>
              <SearchRoundedIcon
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: theme.spacing(3),
                  padding: theme.spacing(0.5),
                  color: theme.palette.common.white,
                  boxShadow: '0px 0px 10px black',
                }}
                fontSize="large"
              />
            </IconButton>
          </Grid>
          <Grid sx={{ zIndex: 1 }}>
            <Box
              className="screen"
              sx={{
                boxShadow: '0px 0px 5px black',
              }}
            >
              <Screen theme={theme}>
                <Box
                  sx={{
                    padding: theme.spacing(2),
                    backgroundColor: '#fff59e',
                  }}
                >
                  <Typography fontFamily={'monospace'} fontWeight={700}>
                    {`Tipo : electrico`}
                  </Typography>
                  <Typography fontFamily={'monospace'} fontWeight={700}>
                    {`Ataques : `}
                  </Typography>
                  <Typography fontFamily={'monospace'} fontWeight={700}>
                    {`Debilidades : `}
                  </Typography>
                </Box>
              </Screen>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={2} sx={{ zIndex: 1 }} />
      </Grid>
    </ThemeProvider>
  )
}
