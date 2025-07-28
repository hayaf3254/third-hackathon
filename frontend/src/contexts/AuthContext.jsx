// contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ★ここがポイント★ userId という「状態（State）」を定義している
  const [userId, setUserId] = useState(null);

  // login 関数が呼ばれたら、その引数（id）を使って userId を更新している
  const login = (id) => setUserId(id); // <--- ここで userId に値を「格納」している

  const logout = () => setUserId(null);

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);