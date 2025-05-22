// schedule.mjs
import fetch from 'node-fetch';

const accessToken = process.env.ACCESS_TOKEN;
const calendarId = 'primary';

const now = new Date();
now.setHours(10, 0, 0, 0);
const end = new Date(now.getTime() + 60 * 60 * 1000);

const event = {
  summary: 'Rutinitas Harian',
  description: 'Ini adalah jadwal otomatis jam 10 pagi.',
  start: {
    dateTime: now.toISOString(),
    timeZone: 'Asia/Jakarta'
  },
  end: {
    dateTime: end.toISOString(),
    timeZone: 'Asia/Jakarta'
  }
};

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
