import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Card, CardContent, Container } from "@mui/material";
import Charts from "../components/Charts";

const Dashboard = () => {
  return (
    <>
     <Typography variant="h4">Dashboard</Typography>
      <Container
        sx={{ display: "flex", justifyContent: "center", flexDirection: "row", width: "100%" }}
      >
        
        <Container

          sx={{ display: "flex", mt: 2, justifyContent: "center" }}
        >
         
          <Card variant="outlined" sx={{ width: 620, height: 384 }}>
            <Charts />
          </Card>
        </Container>
        <Container

          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <Card
            variant="outlined"
            sx={{ width: 300, height: 125 }}
            className="dashboard-card"
          >
            <CardContent>
              <Typography header variant="h6">
                Total Earnings
              </Typography>
              <Divider />
              <Typography header variant="h3">
                $999999999
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ width: 300, height: 125 }}
            className="dashboard-card"
          >
            <CardContent>
              <Typography header variant="h6">
                Total Orders
              </Typography>
              <Divider />
              <Typography header variant="h3">
                99
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ width: 300, height: 125 }}
            className="dashboard-card"
          >
            <CardContent>
              <Typography header variant="h6">
                Total Sales
              </Typography>
              <Divider />
              <Typography header variant="h3">
                9
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ width: 300, height: 125 }}
            className="dashboard-card"
          >
            <CardContent>
              <Typography header variant="h6">
                Total Products
              </Typography>
              <Divider />
              <Typography header variant="h3">
                99
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Container>
      <Divider sx={{ mt: 2 }} />
    </>
  );
};

export default Dashboard;
