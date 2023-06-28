import Btn from "../components/Btn";
import { Grid, Typography, Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import classes from "./ProductElement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/slices/ItemSlice";
import { useEffect } from "react";
const Product = ({ data }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.item.count);
  useEffect(() => {
    dispatch(itemActions.setInitialCount());
  }, []);
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);
  const buyHandler = () => {
    dispatch(itemActions.addItem());
  };

  return (
    <>
      {data && (
        <div className={classes["product"]}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <div className={classes["product-image"]}>
                <img src={data.image} />
              </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div className={classes["product-info"]}>
                <div className={classes["product-text"]}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      marginTop: "2rem",
                      marginBottom: "2rem",
                    }}>
                    {data.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, marginBottom: "2rem" }}>
                    ${data.price}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    defaultValue={data.rating.rate}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className={classes["product-buy"]}>
                  <Btn name="Add to Cart" clickHandler={buyHandler}>
                    <ShoppingCartIcon
                      sx={{ marginRight: "10px" }}></ShoppingCartIcon>
                  </Btn>
                </div>
              </div>
            </Grid>
          </Grid>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              marginBottom: "1rem",
              marginTop: "3rem",
              color: "#0c3e77",
            }}>
            Details
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "4rem" }}>
            {data.description}
          </Typography>
        </div>
      )}
    </>
  );
};

export default Product;
