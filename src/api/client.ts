import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

// Firebase 인증 상태 초기화 완료까지 기다리는 Promise (최대 5초 대기)
const authReady = new Promise<void>((resolve) => {
  const timer = setTimeout(resolve, 5000);
  const unsubscribe = onAuthStateChanged(auth, () => {
    clearTimeout(timer);
    unsubscribe();
    resolve();
  });
});

client.interceptors.request.use(async (config) => {
  await authReady;
  const user = auth.currentUser;
  console.log('[auth] currentUser:', user?.email ?? 'null (로그인 안 됨)');
  if (user) {
    const token = await user.getIdToken();
    console.log('[auth] token 발급 성공, 앞 30자:', token.substring(0, 30));
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('[response error]', error?.response?.status, JSON.stringify(error?.response?.data));
    return Promise.reject(error);
  }
);

// Render 무료 티어 슬립 해제용 핑 (앱 시작 시 한 번 호출)
export const pingServer = () =>
  fetch(`${BASE_URL}/api/diaries`, { method: 'OPTIONS', mode: 'no-cors' }).catch(() => {});

export default client;
