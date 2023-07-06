import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Input from "@mui/joy/Input";
import MovieItem from "../components/MovieItem";
import { grey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [listMovie, setListMovies] = useState([]);

  const handlerSearch = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
    }
  };

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  const getMovies = async () => {
    fetch("http://localhost:8081/api/movies/listMovie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ data }) => setListMovies(data));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{ background: grey[800] }}>
        <Toolbar>
          <Typography color="inherit" variant="h6" component="div">
            <NavLink
              to="/"
              style={{
                color: grey[50],
                fontWeight: 700,
                textDecoration: "unset",
              }}
            >
              Movie Collections
            </NavLink>
          </Typography>
          <Box component="div" sx={{ flexGrow: 1 }}></Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Input
          placeholder="Type in here…"
          variant="outlined"
          sx={{ my: 2 }}
          onKeyUp={handlerSearch}
        />
        <Box sx={{ minWidth: 275 }}>
          {listMovie &&
            listMovie.map(({ id, title, director, genres }) => {
              return (
                <NavLink
                  to={`/movie/edit/${id}`}
                  replace
                  style={{ textDecoration: "unset" }}
                >
                  <MovieItem
                    id={id}
                    title={title}
                    director={director}
                    genres={genres}
                  />
                </NavLink>
              );
            })}
        </Box>
      </Container>
      <NavLink to="/movie/add" replace>
        <Fab
          sx={fabStyle}
          color="primary"
          aria-label="add"
          onClick={() => console.log("test")}
        >
          <AddIcon />
        </Fab>
      </NavLink>
    </React.Fragment>
  );
}
