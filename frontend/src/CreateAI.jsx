import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext'; // コメントアウトを解除し、useAuthを再度有効にしました
import './CreateAI.css'; // 作成したCSSファイルをインポート

const CreateAI = () => {
    // Stateは変更なし
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    
    // === ▼ここを修正しました▼ ===
    // ダミーのIDを削除し、useAuthフックからuserIdを取得する元の形に戻しました
    const { userId } = useAuth(); 
    // === ▲ここまでが修正箇所▲ ===

    // API通信処理を元の形に戻しました
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEditing(false);
        setIsLoading(true);
        setError('');
        setSaveMessage('');
        setAiResponse('');
        try {
            const response = await fetch('http://127.0.0.1:5000/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });
            const data = await response.json();
            if (response.ok) {
                setAiResponse(data.message);
            } else {
                setError(data.error || 'AIからの応答でエラーが発生しました。');
            }
        } catch (err) {
            console.error('API呼び出し中にエラーが発生しました:', err);
            setError('ネットワークエラーまたはサーバーに接続できませんでした。');
        } finally {
            setIsLoading(false);
        }
    };

    // API通信処理を元の形に戻しました
    const handleSave = async () => {
        if (!userId) {
            setSaveMessage('保存するにはログインが必要です。');
            return;
        }
        if (!aiResponse) {
            setSaveMessage('保存するAIの回答がありません。');
            return;
        }
        setIsSaving(true);
        setSaveMessage('');
        try {
            const response = await fetch('http://127.0.0.1:5000/api/save_prompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: userId,
                    title: title,
                    content: aiResponse,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                const message = Array.isArray(data) && data.length > 0 ? data[0].message : '保存しました。';
                setSaveMessage(message);
                alert(message); // 元のコードにあったalertを復元
            } else {
                setSaveMessage(data.message || '保存に失敗しました。');
            }
        } catch (err) {
            console.error('保存API呼び出し中にエラーが発生しました:', err);
            setSaveMessage('保存中にネットワークエラーが発生しました。');
        } finally {
            setIsSaving(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // JSX部分は変更なし
    return (
        <div className="create-ai-container">
            <form onSubmit={handleSubmit} className="create-ai-form">
                <h1>AIプロンプト作成</h1>

                <div className="form-group">
                    <label htmlFor="title">タイトル</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="タイトルを入力してください"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">作成したいプロンプトの内容</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="作成したい内容を書いてください"
                        rows="4"
                        required
                    ></textarea>
                </div>

                <button type="submit" disabled={isLoading} className="submit-button">
                    {isLoading ? '実行中...' : '実行'}
                </button>

                {error && (
                    <div className="error-message">
                        <strong>エラー:</strong> {error}
                    </div>
                )}

                <div className="form-group">
                    <h2>AIの回答</h2>
                    <textarea
                        value={aiResponse}
                        readOnly={!isEditing}
                        onChange={(e) => setAiResponse(e.target.value)}
                        placeholder="AIの回答がここに表示されます"
                        rows="8"
                    ></textarea>
                </div>

                <div className="button-group">
                    <button type="button" onClick={handleEditToggle} disabled={!aiResponse}>
                        {isEditing ? '編集完了' : '編集'}
                    </button>
                    <button type="button" onClick={handleSave} disabled={isSaving || !aiResponse}>
                        {isSaving ? '保存中...' : '保存'}
                    </button>
                </div>
                
                {saveMessage && <div className="save-message">{saveMessage}</div>}
            </form>
        </div>
    );
};

export default CreateAI;
