import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function MovieItem({ id, title, director, genres }) {
  return (
    <Card key={id} variant="outlined" sx={{ borderRadius: 4, my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {director}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          {genres}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieItem;
