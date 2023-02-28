import axios from "axios";
import { type ApiGamesPayload } from "~/server";

const API = "http://localhost:3000";

export const getGameList = async () =>
  (await axios.get<ApiGamesPayload>(`${API}/games`)).data;
