import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; 
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';



function ListForm(){

    const [list, setList] = useState ([{
        board_idx : '',
        board_name: '',
        board_ttl : '',
        board_date : ''

    }]);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    

    //백엔드에서 리스트 객체를 가져오는 부분
    useEffect(( ) => {
        axios.get("/listForm")
        .then(res => setList(res.data.list))
        .catch(error => console.log(error))
    }, []);

    
    return (
       
      
      <Container component="main" maxWidth="lg">
        <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
        <h1>게시판</h1>
        </Box>
        
       
       <Box 
       sx={{ 
        maxWidth: 70, 
        display: 'flex',
        flexDirection:"row",
        alignItems:"flexStart"
       }}>
      <FormControl fullWidth>
        <Select
           type="number"
           value={limit}
           onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>  

    <TableContainer align="center">
      <Table sx={{ maxWidth: 1350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>제목</TableCell>
            <TableCell >작성일자</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* list.map을 사용해서 반복문 구현 */}
            {list.slice(offset, offset + limit).map((list) => {
                    return (
                        <TableRow key={list.board_idx}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{list.board_idx}</TableCell>
                            <TableCell>{list.board_name}</TableCell>
                            <TableCell className='board-title'>
                                <Link to={`/contentForm?board_idx=` + `${list.board_idx}`} className='title-link'>
                                {list.board_ttl}
                                </Link>
                            </TableCell>
                            <TableCell>{list.board_date.split("T")[0]}</TableCell>
                        </TableRow>
                    )
                })}
        </TableBody>
      </Table>
    </TableContainer>

        <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'auto',
        
        }}
        
        >
        <Grid Container  spacing={2}>
        <Grid item xs>
        <Pagination
        total={list.length}
        limit={limit}
        page={page}
        setPage={setPage}
        />      
        </Grid>    

        <Grid item >
        <Button variant="contained" onClick={() => {window.location.href ="/WriteForm";}}>글작성</Button>
        </Grid>

        </Grid>
        </Box>
        </Container>
);

}

export default ListForm;