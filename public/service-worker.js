self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || "Notificação";
  const options = {
    body: data.body || "Você recebeu uma nova notificação.",
    icon: data.icon || "/icons/calendar.png",
    badge: data.badge || "/icons/calendar.png",
    data: data.url || "/"
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});