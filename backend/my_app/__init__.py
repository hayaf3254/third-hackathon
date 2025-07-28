# my_app/__init__.py
from flask import Flask
from flask_cors import CORS
from config import config # config.py から config ディクショナリをインポート
from my_app.AI import AI

def create_app(config_name='default'): # ★ここを修正しました！引数 config_name を追加
    app = Flask(__name__)

    # 環境設定をロード
    # config_name に対応するConfigオブジェクトから設定を読み込みます
    app.config.from_object(config[config_name])
    # configクラスにinit_appメソッドがある場合、これも呼び出す
    config[config_name].init_app(app)

    # CORS設定: configから許可オリジンを取得
    # config['CORS_ALLOWED_ORIGINS']が存在しない場合は、全てのオリジンを許可 ('*')
    # origins にはリストを渡すので、config.pyでsplit(',')していることを前提とします
        # --- ここから修正 ---
    # Cookieなど認証情報を含むリクエストを許可するために supports_credentials=True を追加
    CORS(
        app,
        supports_credentials=True, # ★★★ これを必ず追加してください ★★★
        resources={r"/*": {"origins": app.config['CORS_ALLOWED_ORIGINS']}}
    )
    # --- ここまで修正 ---


    # APIエンドポイントを定義したBlueprintを登録
    from .api import api_bp as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')
    app.register_blueprint(AI, url_prefix='/ai')

    return app