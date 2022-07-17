type BasicPokemon = {
  name: string
  imageSrc: string
}

type LinkPokemon = {
  name: string
  url: string
}

type PokemonData = {
  name: string
  height: number
  weight: number
  stats: Array<PokemonStat>
  types: Array<PokemonType>
  moves: Array<PokemonMove>
  sprites: PokemonSprites
  abilities: Array<PokemonAbility>
}

type PokemonStat = {
  base_stat: number
  stat: {
    name: string
    url: string
  }
}

type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type PokemonMove = {
  move: {
    name: string
    url: string
  }
}

type PokemonSprites = {
  front_default: string
  back_default: string
}

type PokemonAbility = {
  ability: PokemonAbilityDetail
  is_hidden: boolean
}

type PokemonAbilityDetail = {
  name: string
  url: string
}
