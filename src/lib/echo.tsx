// src/lib/echo.tsx
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// اجعل Pusher متاح عالميًا
window.Pusher = Pusher;

let echoInstance: Echo | null = null;

interface EchoConfig {
  broadcaster?: string;
  key?: string;
  cluster?: string;
  wsHost?: string;
  wsPort?: number | string;
  forceTLS?: boolean;
  disableStats?: boolean;
  enabledTransports?: string[];
  authEndpoint?: string;
  auth?: { headers: Record<string, string> };
}

/**
 * تهيئة Echo instance
 * @param config تعديل الإعدادات الافتراضية إذا لزم
 */
export function initEcho(config: EchoConfig = {}): Echo {
  if (echoInstance) return echoInstance;

  // جلب التوكن من sessionStorage أو localStorage
  const token = sessionStorage.getItem('token');

  // الإعدادات الافتراضية للتطوير المحلي
  const defaultConfig: EchoConfig = {
    broadcaster: 'pusher', // Reverb/Pusher compatible
    key: import.meta.env.VITE_REVERB_APP_KEY,
    cluster: import.meta.env.VITE_REVERB_CLUSTER,
    wsHost: import.meta.env.VITE_REVERB_HOST || 'localhost',
    wsPort: Number(import.meta.env.VITE_REVERB_PORT) || 6001,
    forceTLS: false, // ❌ لا تستخدم TLS على localhost
    disableStats: true,
    enabledTransports: ['ws', 'wss'], // يسمح بالاتصال العادي و الآمن
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        Accept: 'application/json',
      },
    },
  };

  // دمج الإعدادات المخصصة إذا تم تمريرها
  echoInstance = new Echo({ ...defaultConfig, ...config });
  return echoInstance;
}

/**
 * الاشتراك في قناة خاصة للمستخدم
 * @param userId رقم المستخدم
 */
export function subscribeToUserChannel(userId: string | number) {
  if (!echoInstance) throw new Error('Echo not initialized');
  return echoInstance.private(`user.${userId}`);
}
