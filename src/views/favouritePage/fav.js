import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar'
import axios from "../../components/axios/axios";
import '../../views/favouritePage/fav.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import WatchList from '../../components/watchList/watchList'
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useWatchListContexts } from '../../hooks/useWatchListContext';
import WatchlistHeaderSection from '../../components/watchList/watchlistheadersec/watchlistheader';
import Footer from '../../components/footer/footer';

const FavPage = () => {
    const { watchLists, dispatch } = useWatchListContexts()
    const { user } = useAuthContext()

    useEffect(() => {
        console.log(watchLists)
        const fetchWatchLists = async () => {
        const response = await axios('api/favourite/favourite-list',
        {
            headers: {
                'Authorization': `Bearer ${user}`,
            }
        })
          const json = await response.data;

          if (response.status === 200) {
            dispatch({type:"SET_WATCHLIST", payload: json.favourites})
          }
        };

        if (user && watchLists === null) {
            fetchWatchLists();
        }
      }, [dispatch, user]);
    
    return ( 
        <div>
            <Navbar />
            <WatchlistHeaderSection/>
            <div className='test'>
           <h3 className="textwlheader">Your <span id="colortextsix"> Favourites</span></h3>
            <TableContainer component={Paper} className="shadoweffect">
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Remove from Watchlist</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {watchLists && watchLists.map(watchList => <WatchList key={watchList["favid"]} watchlists={watchList}/>)}
                    </TableBody>
                </Table>    
            </TableContainer>
            
        </div>
        <Footer/>
        </div>
        
     );
}
 
export default FavPage;