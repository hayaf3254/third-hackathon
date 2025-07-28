import { useState } from 'react';
import { useNavigate, Link} from "react-router-dom";
import './Register.css';

function SignUpForm() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [result, setResult] = useState('');
	
	const navigate = useNavigate();

	const handleSubmit = async(e) => {
		e.preventDefault();

		if(password !== confirm) {
			setResult('パスワードが一致していません');
			return;
		}
		try{
			const res = await fetch('http://localhost:5000/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, email, password}),
			});

			const data = await res.json();

			if(res.status === 201) {
				navigate("/register/complete", {state: { message: data.message}});
			}
		}catch(err) {
			console.error(err);
			alert("登録に失敗しました");
		}
	};

	return (
		<div className="container">
			<div className="login-box">
				<h2>新規登録</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="name">名前</label>
					<input
						type="text"
						id="name"
						placeholder="山田 太郎"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required 
					/>
	
					<label htmlFor="email">メールアドレス</label>
					<input
						type="email"
						id="email"
						placeholder="example@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required 
					/>
	
					<label htmlFor="password">パスワード</label>
					<input
						type="password"
						id="password"
						placeholder="●●●●●●"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
	
					<label htmlFor="password-confirm">パスワード（確認用）</label>
					<input
						type="password"
						id="password-confirm"
						placeholder="●●●●●●"
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
						required
					/>
	
					<button type="submit">登録する</button>
				</form>

				{/* 結果の表示 */}
				{result && <p>{result}</p>}

				<div className="register-link" style={{ marginTop: "20px" }}>
					すでにアカウントをお持ちですか？<br /> <Link to="/login">ログインはこちら</Link>
				</div>
			</div>
		</div>
	)

	
}

export default SignUpForm;
