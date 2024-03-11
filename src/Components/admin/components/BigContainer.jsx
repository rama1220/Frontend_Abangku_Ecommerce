/* eslint-disable react/prop-types */
import { CardContent } from "@mui/material";


const BigContainer = ({ children }) => {
    return (
        <>
            <CardContent className="product-table-container"
        sx={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          height: "auto",
          borderRadius: "10px",
          p: 2,
          borderColor: "#E9E9EA",
          alignItems: 'center'
        }}
      >
                {children}
            </CardContent>
        </>
    );
};
export default BigContainer