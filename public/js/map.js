 const map = L.map('map').setView([23.2599, 77.4126], 13);  // Bhopal coords or whatever

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Example: put a marker
  L.marker([23.2599, 77.4126]).addTo(map)
    .bindPopup('Hello from here!')
    .openPopup();