import { createBrowserRouter } from "react-router-dom";
import GameSelect from "./pages/GameSelect";
import Top from "./pages/Top";

export type RouteParams = "game";

export const getLinks = ({ game = ":game" } = {}) => ({
  TOP: { text: "トップ", icon: "🌏", href: `/${game}/` },
  ACTORS: { text: "アクター", icon: "⚔️", href: `/${game}/actor` },
  SYSTEM: { text: "システム", icon: "📐", href: `/${game}/system` },
  CE: { text: "コモンイベント", icon: "📝", href: `/${game}/ce` },
});

export default createBrowserRouter([
  {
    path: "/",
    element: <GameSelect />,
  },
  {
    path: getLinks().TOP.href,
    element: <Top />,
  },
  {
    path: getLinks().ACTORS.href,
    element: <Top />,
  },
  {
    path: getLinks().SYSTEM.href,
    element: <Top />,
  },
  {
    path: getLinks().CE.href,
    element: <Top />,
  },
]);
