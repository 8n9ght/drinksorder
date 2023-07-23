self.addEventListener('push', (event) => {
    const data = event.data.json();
  
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/path/to/notification-icon.png',
        badge: '/path/to/notification-badge.png',
        vibrate: [200, 100, 200]
      })
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  
    const urlToOpen = 'https://www.example.com';
    event.waitUntil(clients.openWindow(urlToOpen));
  });
  
  self.addEventListener('pushsubscriptionchange', (event) => {
    event.waitUntil(
      fetch('/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newSubscription: event.newSubscription.toJSON(),
          oldSubscription: event.oldSubscription.toJSON()
        })
      })
    );
  });
  