import { useParams } from "react-router-dom";
import { type RouteParams } from "../router";

export const useRouteParams = () => useParams<RouteParams>();
