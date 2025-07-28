// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Register from './Register'
import Login from './Login' 
import Complete from './Complete'
import { AuthProvider } from './contexts/AuthContext';//追加
import CreateAI from './CreateAI';
import Select from './Select';
import PromptList from './PromptList'
import PromptDetail from './PromptDetail'

function StartScreen() {
  return (
    <div className="start-screen">
      <h1 className="title">プロンプト倉庫</h1>
      <div className="button-group">
        {/* 遷移用に Link を使用 */}
        <Link to="/register">
          <button className="register-button">登録</button>
        </Link>
        <Link to="/login">
          <button className="login-button">ログイン</button>
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<Complete />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select" element={<Select />}/>
          <Route path="/prompts" element={<PromptList />} />
          <Route path="/prompts/:promptId" element={<PromptDetail />} />
          <Route path="/create-ai" element={<CreateAI />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
