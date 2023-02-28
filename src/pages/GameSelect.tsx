import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { type ApiGamesPayload } from "~/server";
import { getGameList } from "../api";

const theme = createTheme({ palette: { mode: "dark" } });

export default () => {
  const [games, setGames] = React.useState<ApiGamesPayload["games"]>([]);
  const navi = useNavigate();

  React.useEffect(() => {
    getGameList()
      .then((res) => {
        setGames(res.games);
      })
      .catch(() => {});
  }, [games]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
          {games.map((game, index) => (
            <Box key={index} sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  navi(`/${game}`);
                }}
              >
                {game}
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
