# my_app/AI.py
import os
from flask import Blueprint, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

# .envファイルから環境変数を読み込む
load_dotenv()

AI = Blueprint('AI', __name__)

# Gemini APIキーを設定
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

@AI.route('/generate', methods=['POST'])
def get_ai():
    # リクエストボディがJSON形式であることを確認
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({"error": "Missing 'title' or 'content' in request"}), 400

    try:
        # Geminiモデルのインスタンス化
        model = genai.GenerativeModel('gemini-2.5-flash')

        # システムプロンプト（固定メールテンプレート）
        system_prompt = """
あなたはプロフェッショナルなビジネスメール作成アシスタントです。
以下の形式に従って、日本語の丁寧で正確なビジネスメールを生成してください。

---
○○株式会社  
営業部　○○様

いつも大変お世話になっております。  
株式会社○○の○○です。

早速ですが、○○の件につきまして、ご対応をお願いできればと存じます。

【依頼内容】  
・○○の資料作成  
・期限：○月○日（金）まで

お忙しいところ恐縮ですが、何卒よろしくお願いいたします。

ご不明点がございましたら、お気軽にお知らせください。

――――――――――――  
署名（氏名・会社名・連絡先など）
---

この形式を参考にして、以下の指示に基づいたメールを作成してください。
"""

        # ユーザー入力をプロンプトに追加
        prompt = f"{system_prompt}\n\n指示:\nタイトル: {title}\n内容:\n{content}"

        # Gemini APIを呼び出し、コンテンツを生成
        response = model.generate_content(prompt)

        # 生成されたテキストをレスポンスとして返す
        generated_text = response.text
        return jsonify({"message": generated_text}), 200

    except Exception as e:
        # エラーハンドリング
        return jsonify({"error": str(e)}), 500
