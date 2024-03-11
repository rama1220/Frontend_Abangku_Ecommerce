import { TableHead, TableRow, Skeleton, TableCell } from "@mui/material";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BigContainer from "../components/BigContainer";

const AllOrders = () => {
  const [useOrder, setOrder] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/order").then((response) => {
      setOrder(response.data);
    });
  }, []);
  return (
    <div>
      <h3>All Orders</h3>
      <BigContainer>
        <TableHead sx={{ width: "100%", padding: "10px", alignContent: "center" }}>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        {setOrder.length !== 0 ? (
          <Skeleton animation="wave" variant="rectangular" width="44%" height={350} />
        ) : (
          <tbody>
            {useOrder.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.order_date}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        )}
      </BigContainer>
    </div>
  );
};

export default AllOrders;
