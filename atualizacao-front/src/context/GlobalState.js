import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../atualizacao-front/src/constants/BASE_URL";

function GlobalState() {
  const [pokemons, setPokemons] = useState([]);

  const [pokedex, setPokedex] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [detailPokemon, setDetailPokemon] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [action, setAction] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const [numbMin, setNumbMin] = useState(0);

  const [perPage, setPerPage] = useState(20);

  const [totalPages, setTotalPages] = useState(1);

  const firstPkm = pageNumber * perPage - 21;

  const lastPkm = firstPkm + perPage + 1;

  useEffect(() => {
    browserPokemon();
  }, [pageNumber]);

  const browserPokemon = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/?limit=1008`);
      setTotalPages(Math.ceil(response.data.results.length / perPage) + 1);
      setPokemons(response.data.results);
      setDetailPokemon(response.data.results);
    } catch (error) {
      console.log(`Erro!${error.data.name} não foi adicionado a base.`);
      console.log(error);
    }
    setIsLoading(false);
  };
  function addPokemonPokedex(pokemonAdd) {
    setShowModal(true);
    setAction("add");
    const pokemonOnList = pokemons.filter(
      (pokemon) => pokemon.name !== pokemonAdd.name
    );
    const newBrowserPokedex = [...pokedex, pokemonAdd];
    setPokedex(newBrowserPokedex);
    setPokemons(pokemonOnList);
  }
  function removePokemonPokedex(pokemonAdd) {
    setShowModal(true);
    setAction("remove");
    const pokemonOnPokedex = pokedex.filter(
      (pokemon) => pokemon.name !== pokemonAdd.name
    );
    const newBrowserPokelist = [
      ...pokemons,
      { name: pokemonAdd.name, url: `${BASE_URL}/${pokemonAdd.id}` },
    ];
    setPokedex(pokemonOnPokedex);
    setPokemons(newBrowserPokelist);
  }

  return {
    pokemons,
    setPokemons,
    detailPokemon,
    setDetailPokemon,
    pokedex,
    setPokedex,
    isLoading,
    setIsLoading,
    addPokemonPokedex,
    removePokemonPokedex,
    showModal,
    setShowModal,
    action,
    setAction,
    pageNumber,
    setPageNumber,
    perPage,
    setPerPage,
    totalPages,
    setTotalPages,
    firstPkm,
    lastPkm,
    numbMin,
    setNumbMin,
    browserPokemon,
  };
}

export default GlobalState;
