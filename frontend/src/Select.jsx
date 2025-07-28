import { Link } from "react-router-dom";
import './App.css';

const Select = () => {
  return (
    <div className="select-container">
      <h1 className="select-title">プロンプト倉庫</h1>

      <div className="select-buttons">
        <Link to="/prompts" className="select-button">プロンプト一覧</Link>
        <Link to="/create-ai" className="select-button">プロンプト作成 (AI)</Link>
        <Link to="/create" className="select-button">プロンプト作成 (手動)</Link>
      </div>
    </div>
  );
};

export default Select;