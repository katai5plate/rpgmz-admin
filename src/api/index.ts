import axios from "axios";
import { type ApiGamesGameRes, type ApiGamesRes } from "~/src/server";
import { API_URL } from "../router";

const API = "http://localhost:3000";

export const getGameNames = async () =>
  (await axios.get<ApiGamesRes>(`${API}${API_URL.GET$GAME_NAMES()}`)).data;

export const getGameMeta = async (game: string) =>
  (await axios.get<ApiGamesGameRes>(`${API}${API_URL.GET$GAME_META(game)}`))
    .data;

// export const renameGame = async (game: string, name: string) =>
//   axios.put(`${API}/games/${game}/rename`, { name } as ApiGamesGameRenameBody);
