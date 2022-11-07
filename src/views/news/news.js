import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import '../news/news.css';

const NewsPage = () => {
  var [news, setNewsList] = useState(null);

  useEffect(() => {
      const fetchNewsList = async () => {
          const response = await axios('https://localhost:5000/api/news')
          const json = await response.data
  
          if (response.status === 200) {
              setNewsList(json)
          }
      }
      fetchNewsList()
    }, []);

    console.log(news)
  
    return ( 
        <div className='news-page'>
        <h1>NEWS</h1>
        <div className='grid-container-news'>
          {news && news.news.map((row => (

     
            <div className='grid-item-news'>
        <Card sx={{ maxWidth: 345 }}> 
      <CardMedia
        component="img"
        height="140"
        image={row.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {row.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {row.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><a href={row.url} target ="_blank">Learn more</a></Button>
      </CardActions>
    </Card>
    </div>
     )))} 

    </div>
    </div>
     );
}
 
export default NewsPage;
