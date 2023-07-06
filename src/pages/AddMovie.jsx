import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";
import Grid from "@mui/material/Grid";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { red, grey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export default function AddMovie() {
  const baseUrl = "http://localhost:8081/api/movies";
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    summary: "",
    genres: "",
  });
  const categories = ["Action", "Animation", "Sci-Fi", "Crime", "Drama"];

  const handleOnChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSave = (e) => {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...movie,
        genres: value.join(" / "),
      }),
    }).then(() => navigate("/"));
  };

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
          <Button color="inherit" onClick={(e) => handleOnSave(e)}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          flexGrow: 1,
          mt: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container item xs lg={4}>
          <TextField
            label="Title"
            name="title"
            color="primary"
            fullWidth
            sx={{ my: 2 }}
            value={movie?.title}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid container item xs lg={4}>
          <TextField
            label="Director"
            name="director"
            color="primary"
            fullWidth
            sx={{ my: 2 }}
            value={movie?.director || ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid container item xs lg={4}>
          <TextField
            label="Summary"
            name="summary"
            color="primary"
            multiline
            fullWidth
            sx={{ my: 2 }}
            value={movie?.summary || ""}
            rows={4}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid container item xs lg={4}>
          <Sheet>
            <Box role="group" aria-labelledby="rank">
              <List
                orientation="horizontal"
                wrap
                sx={{
                  "--List-gap": "8px",
                  "--ListItem-radius": "20px",
                  "--ListItem-minHeight": "32px",
                }}
              >
                {categories.map((item, index) => (
                  <ListItem key={item}>
                    {value.includes(item) && (
                      <Done
                        fontSize="md"
                        color="primary"
                        sx={{
                          ml: -0.5,
                          mr: 0.5,
                          zIndex: 2,
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    <Checkbox
                      size="md"
                      disableIcon
                      overlay
                      label={item}
                      checked={value.includes(item)}
                      variant={value.includes(item) ? "soft" : "outlined"}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setValue((val) => [...val, item]);
                        } else {
                          setValue((val) =>
                            val.filter((text) => text !== item)
                          );
                        }
                      }}
                      slotProps={{
                        action: ({ checked }) => ({
                          sx: checked
                            ? {
                                border: "1px solid",
                                borderColor: "primary.500",
                              }
                            : {},
                        }),
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Sheet>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
