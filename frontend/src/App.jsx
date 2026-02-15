import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/auth-context';
import { NotificationProvider } from './components/Notification';
import { ConfirmDialogProvider } from './components/ConfirmDialog';
import { useContext } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import TopicList from './pages/TopicList';
import RegisterTopic from './pages/RegisterTopic';
import TopicDetail from './pages/TopicDetail';
import EditTopic from './pages/EditTopic';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#b66c38] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ConfirmDialogProvider>
          <NotificationProvider>
            <Layout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route
                  path="/topicos"
                  element={
                    <PrivateRoute>
                      <TopicList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/topicos/:id"
                  element={
                    <PrivateRoute>
                      <TopicDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/crear-topico"
                  element={
                    <PrivateRoute>
                      <RegisterTopic />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/editar-topico/:id"
                  element={
                    <PrivateRoute>
                      <EditTopic />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/topicos" />} />
              </Routes>
            </Layout>
          </NotificationProvider>
        </ConfirmDialogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

