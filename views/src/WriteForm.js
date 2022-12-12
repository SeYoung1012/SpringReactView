import React, {useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function WriteForm(){
    const navigate = useNavigate();
    const [board, setBoard] = useState({
            board_name : "",
            board_ttl : "",
            board_cn : ""
     });

 const handleChange = (event) => {
     const { name, value } = event.target;
    setBoard(values => ({ ...values, [name]: value }));
 }

        const submitList = () => {
            axios.post('/writeAction', {
                board_name : board.board_name,
                board_ttl : board.board_ttl,
                board_cn : board.board_cn
            }).then((resp) => {
               console.log(resp);
               alert('게시글이 작성되었습니다.');
            })

        }
    
    return (
        <Container component="main" maxWidth="md">
        <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

            <form method='post' action='/writeAction'>
            <Grid container >
             <Grid item xs={12}>
                <TextField
                     margin="normal"
                     required
                     fullWidth
                    id="outlined-multiline-flexible"
                    name="board_name"
                    label="이름"
                    autoComplete="shipping address-line1"
                    variant="standard"
                    onChange={handleChange}
                />
                </Grid>
            <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                    id="board_ttl"
                    name="board_ttl"
                    label="제목"
                    autoComplete="shipping address-line2"
                    variant="standard"
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                     margin="normal"
                     fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={10}
                    name='board_cn' 
                    onChange={handleChange}
                    />
                </Grid>    
                <ButtonGroup
                  variant="contained"
                aria-label="Disabled elevation buttons"
                            >
                <Button type='submitList'>저장하기</Button>
                <Button onClick={() => {window.location.href ="/";}}>목록보기 </Button>
                </ButtonGroup>
             </Grid>
            </form>

         
          
       </Box>
       </Container>    

    );

}

export default WriteForm;
