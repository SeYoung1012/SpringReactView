
import './App.css';
import {useEffect, useState} from 'react';
import ListForm from './ListForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContentForm from './ContentForm';
import WriteForm  from './WriteForm';

function App() {
  // message 초기값 설정 (""로 설정)
  const [message, setMessage] = useState("");

  // useEffect(함수, 배열) : 컴포넌트가 화면에 나타났을 때 자동 실행
  useEffect(() => {
    // fetch(url, options) : Http 요청 함수
    fetch("/listForm")
      .then(response => response.text())
      .then(message => {
        setMessage(message);
      });
      
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ListForm />}/>
        </Routes>
        <Routes>
            <Route path="/ContentForm" element={<ContentForm />}/>
        </Routes>
        <Routes>
            <Route path="/WriteForm" element={<WriteForm />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;