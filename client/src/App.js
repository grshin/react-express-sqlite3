import AuthForm from './components/AuthForm';
import ChangePassword from './components/ChangePassword';
import { AppProvider, useAppContext } from './context/AppContext';

const MessageDisplay = () => {
  const { message } = useAppContext();
  return (
    <div style={{ marginTop: '2rem', fontWeight: 'bold' }}>
      <hr />
      <p>{message}</p>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>🧪 사용자 인증 테스트</h1>
        <AuthForm />
        <ChangePassword />
        <MessageDisplay />
      </div>
    </AppProvider>
  );
}

export default App;
