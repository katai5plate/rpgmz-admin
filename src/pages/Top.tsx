import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useRouteParams } from "../hooks/route";
import { getLinks } from "../router";
import Standard from "../templates/Standard";

export default () => {
  const { game } = useRouteParams();

  return (
    <Standard title={game ? getLinks({ game }).TOP.text : ""}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          {"<Chart />"}
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          {"<Deposits />"}
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          {"<Orders />"}
        </Paper>
      </Grid>
    </Standard>
  );
};
