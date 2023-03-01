export type RouteParams = "game";

export const API_URL = {
  GET$PING: () => "/",
  GET$GAME_NAMES: () => "/games",
  GET$GAME_META: (game = ":game") => `/games/${game}`,
};

export const getLinks = ({ game = ":game" } = {}) => ({
  META: { text: "メタデータ", icon: "🌏", href: `/${game}/` },
  ACTORS: { text: "アクター", icon: "⚔️", href: `/${game}/actor` },
  SYSTEM: { text: "システム", icon: "📐", href: `/${game}/system` },
  CE: { text: "コモンイベント", icon: "📝", href: `/${game}/ce` },
});
