// src/PromptList.jsx
import './App.css';
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


function PromptList() {
  const navigate = useNavigate();
  const { userId } = useAuth();


  // 仮のサンプルデータ
  const samplePrompts = [
    { prompt_id: 0, title: 'アイデア出し用テンプレート' },
    { prompt_id: 1, title: 'ブログ記事の構成案' },
    { prompt_id: 2, title: '学習内容のまとめプロンプト' }
  ];


  const [prompts, setPrompts] = useState(samplePrompts);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);


  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/prompts?userId=${userId}`);
        if (!res.ok) throw new Error('サーバーエラー');


        const data = await res.json();


        if (data.length === 0) {
          setMessage('プロンプトがまだ作成されていません。サンプルを表示しています。');
          setPrompts(samplePrompts);
        } else {
          setPrompts(data);
        }
      } catch (err) {
        setMessage('プロンプトを取得できなかったため、サンプルを表示しています。');
        setPrompts(samplePrompts);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };


    if (userId) {
      fetchPrompts();
    } else {
      alert('ユーザーIDが見つかりません');
      navigate('/login');
    }
  }, [userId]);


  return (
    <div className="prompt-list-container">
      {loading && <p>読み込み中...</p>}
      {message && <p>{message}</p>}
      {!loading &&
        prompts.map((p) => (
          <div
            key={p.prompt_id}
            className="prompt-card"
            onClick={() => navigate(`/prompts/${p.prompt_id}`)}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="prompt-title">{p.title}</h3>
          </div>
        ))}
      <Link className="prompt-create-button" to="/select">
        プロンプトを作成する
      </Link>
    </div>
  );
}


export default PromptList;


