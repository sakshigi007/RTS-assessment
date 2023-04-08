import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function Products() {
  const classes = useStyles();

  const [products, setproducts] = useState([]);
  useEffect(() => {
    ProductsGet();
  }, []);

  const ProductsGet = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setproducts(result.products);
      });
  };

  const UpdateProduct = (id) => {
    window.location = "/update/" + id;
  };

  const ProductDelete = (id) => {
    var data = {
      id: id,
    };
    fetch("https://dummyjson.com/products", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          ProductsGet();
        }
      });
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Products
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Discount Percentage</TableCell>
                  <TableCell align="left">Rating</TableCell>
                  <TableCell align="left">Stock</TableCell>
                  <TableCell align="left">Brand</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Thumbnail</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.ID}>
                    <TableCell align="right">{product.id}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar src={product.title} />
                      </Box>
                    </TableCell>
                    <TableCell align="left">{product.description}</TableCell>
                    <TableCell align="left">{product.price}</TableCell>
                    <TableCell align="left">
                      {product.discountPercentage}
                    </TableCell>
                    <TableCell align="left">{product.rating}</TableCell>
                    <TableCell align="left">{product.stock}</TableCell>
                    <TableCell align="left">{product.brand}</TableCell>
                    <TableCell align="left">{product.category}</TableCell>
                    <TableCell align="left">{product.thumbnail}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => UpdateProduct(product.id)}>
                          Edit
                        </Button>
                        <Button onClick={() => ProductDelete(product.id)}>
                          Del
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
