import { useLocation } from "react-router-dom";

const Complete = () => {
	const location = useLocation();
	const message = location.state?.message || "登録が完了しました！";

	return (
		<>
			<h2>{message}</h2>
			<a href="/login">ログインへ進む</a>
		</>
	)
}

export default Complete;