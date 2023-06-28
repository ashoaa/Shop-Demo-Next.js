/* eslint-disable react/prop-types */
import { Typography, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../store/slices/ItemSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import classes from "./Item.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

let categories = [];
const Item = ({ data }) => {
  const router = useRouter();
  const count = useSelector((state) => state.item.count);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(itemActions.setInitialCount());
  }, []);
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  if (data.length > 0) {
    categories = data
      .map((item) => item.category)
      .filter((category, index, arr) => arr.indexOf(category) === index);
  }

  const removeItemHandler = () => {
    dispatch(itemActions.removeItem());
  };

  const addItemHandler = () => {
    dispatch(itemActions.addItem());
  };

  return (
    <>
      <div className={classes["products"]}>
        {categories.map((category, index) => (
          <>
            <div key={index}>
              <Typography
                component="h2"
                variant="h4"
                sx={{
                  marginBottom: "2rem",
                  marginTop: "7rem",
                  color: "#0c3e77",
                }}>
                {category[0].toUpperCase() + category.slice(1)}
              </Typography>

              <Grid container spacing={5}>
                {data
                  .filter((item) => item.category === category)
                  .map((product) => (
                    <>
                      <Grid
                        item
                        xs={6}
                        md={4}
                        lg={3}
                        sx={{
                          marginBottom: "2rem",
                        }}>
                        <Paper elevation={5}>
                          <div className={classes["item-image"]}>
                            <img
                              src={product.image}
                              onClick={() => {
                                router.push("/home/p" + product.id);
                              }}
                            />
                          </div>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              marginTop: "1rem",
                              height: "50px",
                              paddingLeft: "0.5rem",
                              paddingRight: "0.5rem",
                            }}>
                            {product.title.length < 60
                              ? product.title
                              : product.title.slice(0, 60) + "..."}
                          </Typography>
                          <div className={classes["item-pay"]}>
                            <Typography
                              sx={{
                                paddingLeft: "0.5rem",
                                fontWeight: "700",
                              }}>
                              ${product.price}
                            </Typography>
                            <div className={classes["item-buy"]}>
                              <RemoveIcon
                                onClick={removeItemHandler}
                                sx={{
                                  "&:hover": { cursor: "pointer" },
                                }}></RemoveIcon>
                              <AddIcon
                                onClick={addItemHandler}
                                sx={{
                                  "&:hover": { cursor: "pointer" },
                                }}></AddIcon>
                            </div>
                          </div>
                        </Paper>
                      </Grid>
                    </>
                  ))}
              </Grid>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Item;
