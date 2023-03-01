import React from "react";
import { type ApiGamesGameRes } from "~/src/server";
import { getGameOverview } from "../api";
import { useRouteParams } from "../hooks/route";
import { getLinks } from "../router";
import Standard from "../templates/Standard";

export default () => {
  const { game } = useRouteParams();

  const [response, setResponse] = React.useState<ApiGamesGameRes>();
  React.useEffect(() => {
    game &&
      getGameOverview(game)
        .then((res) => {
          setResponse(res);
        })
        .catch(() => {});
  }, [game]);

  return (
    <Standard title={game ? getLinks({ game }).META.text : ""}>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      {/* <button onClick={async () => game && renameGame(game, "あいおふぇｗ")}>
        RENAME-TEST
      </button> */}
    </Standard>
  );
};
