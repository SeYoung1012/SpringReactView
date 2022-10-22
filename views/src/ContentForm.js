import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components'

function ContentForm() {

    const location = useLocation();
    const keyword = getBoardIdx(location);

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
           //alert('글수정 성공');
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
        <Layout>  
    <div className='contentForm'>   
        <div className="board_view">
                <div className="info">
                <form onSubmit={handleSubmit} method='post' action='/updateAction'>
                    <dl>
                    <dt>번호</dt>
                    <dd><input type='text' name='board_idx' value={board.board_idx} readOnly /></dd>
                    </dl>
                    <dl>
                    <dt>이름</dt>
                    <dd><input type='text' name='board_name' value={board.board_name} onChange={e => setBoard({ ...board, board_name: e.target.value })}/></dd>
                    </dl>
                    <dl>
                    <dt>제목</dt>
                         <dd><input type='text' name='board_ttl' value={board.board_ttl} onChange={e => setBoard({ ...board, board_ttl: e.target.value })}/></dd>
                    </dl>
                    <dl>
                        <dt>내용</dt>
                        <dd><textarea rows={10} cols={50} name='board_cn' value={board.board_cn} onChange={e => setBoard({ ...board, board_cn: e.target.value })} >
                         </textarea></dd>
                     </dl>   
                     <button type="submit" onClick={()=>{
            //alert("수정 완료");    
            window.location.href ="/";
        }}>수정</button>


        <Link to={"/" } className='list-link'>
        <input type='button' value='목록보기'></input>
        </Link>

       <button onClick={() => {
        axios.get("deleteAction?board_idx=" + `${board.board_idx}`)
        alert('삭제 성공');
        window.location.href ="/";
       }}>
        삭제하기</button>
         </form>    
        </div>
        </div>


        <div className='replyForm'>
            <form onSubmit={submitList} method='post' action='/writeReplyAction'>
                <div>
                    <tr>
                        <td colSpan={2}>
                            <label>댓글</label><textarea row="2" cols="50" name="reply_cn"></textarea>
                            <label>별명</label><input type="text" name="reply_name" />
                            <input type="hidden" name="reply_board_idx" value={board.board_idx}/>
                            <button type='submit'>
                            댓글달기
                             </button>
                        </td>
                    </tr>
                </div>
            </form>
            </div>


            <table>    
                <thead>      
                     <tr>   
                        <th>별명</th>
                        <th>내용</th>
                        <th>날짜</th>
                        <th>삭제</th>
                    </tr>  
                    </thead>   
                    <tbody>
                     {replyList && replyList.map((replyLists)=> {
                            return (
                                <tr key={replyLists.reply_board_idx}>
                                <td>{replyLists.reply_name}</td>
                                <td>{replyLists.reply_cn}</td>
                                <td>{replyLists.reply_date.split("T")[0]}</td>
                                <td>
                                <button onClick={() => {
                                    axios.get("deleteReplyAction?reply_idx=" + `${replyLists.reply_idx}`+"&board_idx="+`${board.board_idx}`)
                                    alert('삭제 성공');
                                    window.location.href ="/";
                                }}>
                                    삭제하기</button>
                                </td>
                                </tr>
                                
                            )
                        })}
                  </tbody>
                
            </table>




    </div>
    
</Layout>
    
    );

}

function getBoardIdx(location){ 
    const params = new URLSearchParams(location.search);

    //console.log("location.search :", location.search);
    const keyword = params.get("board_idx"); 
    //console.log("params.get(keyword)", keyword);

    return keyword
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;

`;
export default ContentForm;