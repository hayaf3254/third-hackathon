# my_app/api.py
from flask import Blueprint, request, jsonify
from config import get_db_connection

#api = Blueprint('api', __name__)
api_bp = Blueprint('api', __name__)

# ★ /api/hello でアクセス可能になります
#@api.route('/hello', methods=['GET'])
#def hello_world():
#    return jsonify({"message": "Hello from Flask API!"})

# ★ルートパス (/api/) でアクセス可能になります
#@api.route('/', methods=['GET'])
#def root_endpoint():
#    return jsonify({"message": "Welcome to the root of the API!"})

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT user_id FROM user_table WHERE email = ? AND password = ?", (email, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"user_id": user["user_id"]})
    else:
        return jsonify({"user_id": None})



@api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO user_table (username, email, password) VALUES (?, ?, ?)",
                       (username, email, password))
        conn.commit()
        conn.close()

        # 成功時に「message」を返す
        return jsonify({'message': f'{username} さん、登録が完了しました！'}), 201

    except Exception as e:
        print("Register error:", e)
        # 失敗時はエラーメッセージを返す
        return jsonify({'message': '登録に失敗しました'}), 400
