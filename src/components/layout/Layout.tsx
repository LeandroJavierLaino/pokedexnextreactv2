import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Input,
  ThemeProvider,
  Typography,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import { theme } from '../../styles/theme'
import LightButton from '../lightButton/LightButton'
import { Screen } from '../screen/Screen'
import PokemonDisplay from '../pokemonDisplay/PokemonDisplay'
import { getPokemon, getPokemons } from '../../lib/api'

export default function Layout() {
  const [pokemonIndex, setPokemonIndex] = useState<number>(0)
  const [pokemonLinks, setPokemonLinks] = useState<Array<LinkPokemon>>([])
  const [pokemonDataDisplay, setPokemonDataDisplay] = useState<PokemonData>({
    height: 0,
    moves: [],
    name: '',
    sprites: {
      back_default: '',
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    stats: [],
    types: [],
    weight: 0,
    abilities: [],
  })
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await getPokemons('')

      setPokemonLinks(response)
    }
    fetchPokemons()
  }, [])

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonURL = pokemonLinks[pokemonIndex]?.url
      if (!!pokemonURL) {
        const response = await getPokemon(pokemonURL)

        setPokemonDataDisplay(response)
      }
    }

    fetchPokemon()
  }, [pokemonIndex, pokemonLinks])

  const upPokemon = () => {
    if (pokemonIndex > 0) {
      setPokemonIndex(pokemonIndex - 1)
    }
  }

  const downPokemon = () => {
    if (pokemonIndex < pokemonLinks.length) {
      setPokemonIndex(pokemonIndex + 1)
    }
  }

  function onSearchUpdate(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchValue(event.target.value)
  }

  async function onSearchClick() {
    const response = await getPokemons(searchValue)
    setPokemonLinks(response)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: theme.spacing(106.5),
          boxShadow: 'inset 0px 0px 25px black',
          borderRadius: theme.spacing(1),
        }}
      >
        <Grid item xs={2}>
          <LightButton />
        </Grid>
        <Grid item container direction="column" xs={8}>
          <Grid item xs={0.5} sx={{ zIndex: 3 }}></Grid>
          <Box
            className="screen"
            sx={{
              boxShadow: '0px 0px 5px black',
              borderRadius: theme.spacing(0.5),
            }}
          >
            <Screen theme={theme}>
              <PokemonDisplay
                theme={theme}
                src={pokemonDataDisplay?.sprites.front_default ?? ''}
                name={
                  `${pokemonDataDisplay?.name
                    .charAt(0)
                    .toUpperCase()}${pokemonDataDisplay?.name.slice(1)}` ??
                  'NO DATA'
                }
                top={pokemonIndex === 0}
                bottom={pokemonIndex === pokemonLinks.length - 1}
                up={upPokemon}
                down={downPokemon}
              />
            </Screen>
          </Box>

          <Grid
            item
            container
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBlock: theme.spacing(1),
            }}
          >
            <Grid
              item
              sx={{
                marginBlock: theme.spacing(2),
                width: '80%',
                zIndex: 1,
                borderRadius: theme.spacing(1),
                boxShadow: '0px 0px 15px black',
              }}
            >
              <Input
                sx={{
                  width: '100%',
                  borderRadius: theme.spacing(1),
                  backgroundColor: '#fff59e',
                  boxShadow: 'inset 0px 0px 15px black',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  paddingInline: theme.spacing(2),
                  '&:before': {
                    borderBottom: '0px solid #fff',
                  },
                }}
                onChange={onSearchUpdate}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={onSearchClick}>
                <SearchRoundedIcon
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: theme.spacing(0.5),
                    padding: theme.spacing(0.5),
                    width: theme.spacing(4.5),
                    color: theme.palette.common.white,
                    boxShadow: '0px 0px 5px black',
                  }}
                  fontSize="large"
                />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item sx={{ zIndex: 1 }}>
            <Box
              className="screen"
              sx={{
                boxShadow: '0px 0px 5px black',
                borderRadius: theme.spacing(0.5),
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
                    {`Altura : ${pokemonDataDisplay.height}`}
                  </Typography>
                  <Typography fontFamily={'monospace'} fontWeight={700}>
                    {`Peso : ${pokemonDataDisplay.weight}`}
                  </Typography>
                  <Typography fontFamily={'monospace'} fontWeight={700}>
                    {`Tipo(s) : `}
                  </Typography>
                  {pokemonDataDisplay.types.map((pokemonType) => {
                    return (
                      <Typography
                        fontFamily={'monospace'}
                        fontWeight={700}
                        key={`type_pokemon_${pokemonType.type.name}`}
                      >{`- ${pokemonType.type.name
                        .charAt(0)
                        .toUpperCase()}${pokemonType.type.name.slice(
                        1
                      )}`}</Typography>
                    )
                  })}
                  <Typography fontFamily={'monospace'} fontWeight={700}>
                    {`Habilidades : `}
                  </Typography>
                  {pokemonDataDisplay.abilities
                    .filter((_, index) => index < 6)
                    .map((pokemonAbility) => {
                      return (
                        <Typography
                          fontFamily={'monospace'}
                          fontWeight={700}
                          key={`type_pokemon_${pokemonAbility.ability.name}`}
                        >{`- ${pokemonAbility.ability.name
                          .charAt(0)
                          .toUpperCase()}${pokemonAbility.ability.name.slice(
                          1
                        )}`}</Typography>
                      )
                    })}
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
