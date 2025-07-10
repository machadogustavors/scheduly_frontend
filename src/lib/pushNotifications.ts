
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      return registration;
    } catch (error) {
      console.error('Erro ao registrar o service worker:', error);
    }
  }
}

export async function askNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Este navegador não suporta notificações.');
    return;
  }
  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }
  return permission;
}

export async function showLocalNotification(title: string, options?: NotificationOptions) {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      registration.showNotification(title, options);
    } else {
      new Notification(title, options);
    }
  } else {
    new Notification(title, options);
  }
}
