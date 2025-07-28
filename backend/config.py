# config.py
import os
import sqlite3

DB_PATH = os.path.join(os.path.dirname(__file__), "users.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key_here'
    # 環境変数からCORS許可オリジンを取得、なければデフォルト値
    CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173').split(',')
    DEBUG = False # 基本はFalse、環境で上書き

    @staticmethod
    def init_app(app):
        # 必要に応じてアプリケーションインスタンスの初期化処理をここに書く
        pass

class DevelopmentConfig(Config):
    DEBUG = True # 開発環境ではTrueに設定

class ProductionConfig(Config):
    # 本番環境の設定
    # DEBUG = False を明示的に書くなど
    pass

# 環境名とConfigクラスのマッピング
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig # デフォルトは開発環境に
}