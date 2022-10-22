import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';
import styled from 'styled-components'


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
        <Layout>
        <div>
            <Link to="/WriteForm">
                <button align="right" className='write-from'>글쓰기</button>
            </Link>
        <div className="list">
        <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
         </label>

            <table className="boardTable">
                <thead>
                <tr>
                    <th className="col-lg-2">
                        번호
                    </th>
                    <th className="col-lg-2">
                        이름
                    </th>
                    <th className="col-lg-8">
                        제목
                    </th>
                    <th className="col-lg-2">
                        작성일자
                    </th>
                </tr>
                </thead>
                <tbody>
                {/* list.map을 사용해서 반복문 구현 */}
                {list.slice(offset, offset + limit).map((list) => {
                    return (
                        <tr key={list.board_idx}>
                            <td>{list.board_idx}</td>
                            <td>{list.board_name}</td>
                            <td className='board-title'>
                                <Link to={`/contentForm?board_idx=` + `${list.board_idx}`} className='title-link'>
                                {list.board_ttl}
                                </Link>
                            </td>
                            <td>{list.board_date.split("T")[0]}</td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
            
        </div>
        <footer>
        <Pagination
          total={list.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>       

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
export default ListForm;