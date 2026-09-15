import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi, getCurrentUser } from '../services/authApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
        setRoles(data.roles);
        setPermissions(data.permissions);
      } catch (error) {
        setUser(null);
        setRoles([]);
        setPermissions([]);
      } finally {
        setLoadingAuth(false);
      }
    }
    loadUser();
  }, []);

  async function login(credenciales) {
    const data = await loginApi(credenciales);
    setUser(data.user);
    setRoles(data.roles);
    setPermissions(data.permissions);
  }

  async function logout() {
    await logoutApi();
    setUser(null);
    setRoles([]);
    setPermissions([]);
  }

  async function register(form) {
    const data = await registerApi(form);
    setUser(data.user);
    setRoles(data.roles);
    setPermissions(data.permissions);
  }

  async function refreshUser() {
    const data = await getCurrentUser();
    setUser(data.user);
    setRoles(data.roles);
    setPermissions(data.permissions);
  }

  function hasPermission(permission) {
    return permissions.includes(permission);
  }

  function hasRole(role) {
    return roles.includes(role);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        permissions,
        loadingAuth,
        authenticated: !!user,
        login,
        register,
        refreshUser,
        logout,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
