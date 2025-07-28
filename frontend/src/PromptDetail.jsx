import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function PromptDetail() {
	const {promptId} = useParams();
	const [prompt, setPrompt] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPrompt = async () => {
			try {
				const res = await fetch(`http://localhost:5000/api/prompts/${promptId}`);
				if (!res.ok) throw new Error('詳細取得に失敗しました');

				const data = await res.json();
				setPrompt(data);
			}catch(err) {
				setError('プロンプトが見つかりませんでした');
				console.error(err);
			}finally{
				setLoading(false);
			}
		};
		fetchPrompt();
	}, [promptId]);

	if (loading) return <p>読み込み中...</p>;
	if (error) return <p className="error-text">{error}</p>;

	return (
		<div className="prompt-detail-container">
			<h2>{prompt.title}</h2>
			<p>{prompt.content || '説明がありません'}</p>
			<button onClick={() => navigate(-1)}>← 戻る</button>
		</div>
	);	
}

export default PromptDetail;