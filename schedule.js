const fetch = require('node-fetch');

const accessToken = process.env.ACCESS_TOKEN;
const calendarId = 'primary'; // Bisa diganti dengan ID kalender lain

const today = new Date();
today.setHours(10, 0, 0, 0); // Jam 10:00 pagi
const end = new Date(today.getTime() + 60 * 60 * 1000); // Durasi 1 jam

const event = {
  summary: 'Rutinitas Harian',
  description: 'Ini adalah jadwal otomatis jam 10 pagi setiap hari.',
  start: {
    dateTime: today.toISOString(),
    timeZone: 'Asia/Jakarta'
  },
  end: {
    dateTime: end.toISOString(),
    timeZone: 'Asia/Jakarta'
  }
};

async function createEvent() {
  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Gagal:', response.status, error);
    process.exit(1);
  }

  const data = await response.json();
  console.log('Event berhasil dibuat:', data.htmlLink);
}

createEvent();
