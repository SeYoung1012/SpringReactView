import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; 
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function ContentForm() {

    const location = useLocation();
    const keyword = getBoardIdx(location);
    const navigate = useNavigate();


    const [board, setBoard] = useState({
        board_idx : '',
        board_name: '',
        board_ttl : '',
        board_cn : '',
        board_date : ''
            
    });

    const [replyList, setReplyList] = useState([{
        reply_idx : '',
        reply_name :'',
        reply_cn: '',
        reply_date:'',
        reply_board_idx :''
    }]);


    const handleChange = (event) => {
        const { name, value } = event.target;
       setBoard(values => ({ ...values, [name]: value }));
    }

    //게시글 상세조회 
    useEffect(() => {
        axios.get("/contentForm", {
            params : {
                board_idx : parseInt(keyword)           
             }
        })
       .then((resp) => {
        setBoard(resp.data.board)
        setReplyList(resp.data.replyList)
       })
    }, []);
    

    //게시글 수정 
    const handleSubmit = () => {  
        axios.post("/contentForm", {
            board_name : board.board_name,
            board_ttl : board.board_ttl,
            board_cn : board.board_cn
        }).then((resp) => {
           console.log(resp);
        })
    }


   // 게시글 댓글 달기.
    const submitList = () => {
        axios.post("/contentForm", {
            reply_cn : replyList.reply_cn,
            reply_name : replyList.reply_name
        }).then((resp) => {
           console.log(resp);
           alert('댓글달기 성공');
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

    <form method='post' action='/updateAction'>
                <Grid container >
                <Grid item xs={12}>
                     <TextField
                        margin="normal"
                        readonly
                        fullWidth
                        id="outlined-multiline-flexible"
                        name="board_idx"
                        label="번호"
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={board.board_idx}
                    />
                    </Grid>
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
                        value={board.board_name}
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
                        value={board.board_ttl}
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
                        value={board.board_cn}
                        onChange={handleChange}
                        />
                    </Grid>    
                    <ButtonGroup
                variant="contained"
                    aria-label="Disabled elevation buttons"
                                >
                    <Button type="handleSubmit">수정하기</Button>
                   <Button onClick={() => {window.location.href ="/";}}>목록보기 </Button>
                    <Button onClick={() => {
                     axios.get("deleteAction?board_idx=" + `${board.board_idx}`)
                     alert('게시글이 삭제되었습니다.')
                    window.location.href ="/";
                     }}>
                    삭제하기</Button>
                    </ButtonGroup>
                </Grid>
                </form>



    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
       }}
     >
        <form method='post' action='/writeReplyAction'>    
       <Grid container spacing={3}>
       <Grid item xs={12} sm={7}>  
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="댓글"
          name="reply_cn"   
        />
    </Grid>

     <Grid item xs={12} sm={3}>
     <TextField
          required
          fullWidth
          id="outlined-required"
          label="별명"
          name="reply_name" 
        />    
    </Grid> 
    <Grid item xs={12} sm={2}>
    <Button variant="outlined" type='submit'>댓글작성</Button>
    </Grid>     
     <input type="hidden" name="reply_board_idx" value={board.board_idx}/>  
    </Grid>        
    </form>

    
     </Box>

       
    <TableContainer align="center"  marginTop={8} >
      <Table sx={{ maxWidth: 1350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>별명</TableCell>
            <TableCell>내용</TableCell>
            <TableCell>날짜</TableCell>
            <TableCell >삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* replyList.map을 사용해서 반복문 구현 */}
            {replyList && replyList.map((replyLists)=> {
                    return (
                        <TableRow key={replyLists.reply_board_idx} >
                            <TableCell>{replyLists.reply_name}</TableCell>
                            <TableCell>{replyLists.reply_cn}</TableCell>
                            <TableCell>{replyLists.reply_date.split("T")[0]}</TableCell>
                            <TableCell>
                            <Button variant="outlined" 
                            onClick={() => {
                                    axios.get("deleteReplyAction?reply_idx=" + `${replyLists.reply_idx}`+"&board_idx="+`${board.board_idx}`)
                                    alert('댓글이 삭제되었습니다.');
                                    window.location.href ="/";
                                }}>
                                    삭제</Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
        </TableBody>
      </Table>
    </TableContainer>        

    </Box>
</Container>
    

    
    );

}

function getBoardIdx(location){ 
    const params = new URLSearchParams(location.search);
    const keyword = params.get("board_idx"); 

    return keyword
}

export default ContentForm;