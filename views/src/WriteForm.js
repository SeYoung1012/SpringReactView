import React, {useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

function WriteForm(){

        const [board, setBoard] = useState({
            board_name : "",
            board_ttl : "",
            board_cn : ""
        });

        const submitList = () => {
            axios.post('/writeAction', {
                board_name : board.board_name,
                board_ttl : board.board_ttl,
                board_cn : board.board_cn
            }).then((resp) => {
               console.log(resp);
               alert('글작성 성공');
            })

        }

        
    return (
    <Layout>    
    <div>
        <form method='post' action='/writeAction'>
            <table>
                <tbody>
                <tr>
                    <td>이름</td>
                    <td><input type='text' name='board_name' /></td>
                </tr>
                <tr>
                    <td>제목</td>
                    <td><input type='text' name='board_ttl'/></td>
                </tr>
                <tr>
                    <td>내용</td>
                    <td>
                        <textarea rows={10} cols={50} name='board_cn'  />
                    </td>
                </tr>
                </tbody>
                <button onSubmit={submitList}>
                    저장하기
                </button>
                
                <Link to={"/" } className='list-link'>
                 <input type='button' value='목록보기'></input>
                 </Link>
            </table>
            
        </form>        
    </div>
    </Layout>
    );

}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;

`;
export default WriteForm;
