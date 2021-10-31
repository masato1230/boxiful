import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import axios from 'axios';

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getJwt();
    console.log(cookies);
  };

  const getJwt = async () => {
    await axios
      .post('http://127.0.0.1:8000/users/token/', {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.access);
        setCookie('accesstoken', response.data.access);
        setCookie('refreshtoken', response.data.refresh);
      })
      .catch((err: any) => {
        // TODO: change
        alert('メールアドレスかパスワードが違います。');
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="bg-gray-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>パスワード</label>
        <input
          className="bg-gray-300"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
