import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { type ApiGamesRes } from "~/src/server";
import { getGameNames } from "../api";

const theme = createTheme({ palette: { mode: "dark" } });

export default () => {
  const navi = useNavigate();

  const [response, setResponse] = React.useState<ApiGamesRes>();
  React.useEffect(() => {
    getGameNames()
      .then((res) => {
        setResponse(res);
      })
      .catch(() => {});
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box>
          {response?.games.map((game, index) => (
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
