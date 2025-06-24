import './style.css'

const countdownEl = document.getElementById('countdown')

const pad = (n) => n.toString().padStart(2, '0')

const today = new Date()
const UTCinLocalTimezone = new Date(
	Date.UTC(
		today.getUTCFullYear(),
		today.getUTCMonth(),
		today.getUTCDate() + 1,
		0,
		0,
		0,
	),
)

const nextHappyHourEl = document.querySelector('#next-happy-hour')
const localizationEl = document.querySelector('#location')

// Función que muestra la zona horaria y la hora local equivalente
function renderTimeZoneAndTime(timeZone, fromIP = false) {
	const tzArray = timeZone.split(/\//g).map((e) => e.replace(/_/g, ' '))

	localizationEl.textContent = (
		fromIP ? [tzArray[0], tzArray.reverse()[0]] : tzArray
	)
		.reverse()
		.join('/')

	const time = UTCinLocalTimezone.toLocaleTimeString(undefined, {
		timeZone,
		hour: '2-digit',
		minute: '2-digit',
	})
	nextHappyHourEl.textContent = `${time} (UTC 00:00)`
}

// Fallback: obtiene la zona horaria a partir de la IP si falla la geolocalización
function getTimezoneFromIP() {
	fetch('https://ipapi.co/json/')
		.then((res) => res.json())
		.then((data) => {
			console.warn('📡 Usando IP como fallback para timezone')
			renderTimeZoneAndTime(data.timezone, true)
		})
		.catch((err) => {
			console.error('❌ No se pudo determinar la zona horaria por IP:', err)
		})
}

// Intentamos obtener la zona horaria desde geolocalización
navigator.geolocation.getCurrentPosition(
	() => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
		renderTimeZoneAndTime(timeZone)
	},
	(error) => {
		console.error('⚠️ Error al obtener la ubicación:', error)
		getTimezoneFromIP()
	},
)

function updateCountdown() {
	const now = new Date()
	const targetLocalTime = new Date(UTCinLocalTimezone.getTime())

	const diffMs = targetLocalTime.getTime() - now.getTime()
	const totalSeconds = Math.floor(diffMs / 1000)

	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60

	const countdownText = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
	countdownEl.textContent = countdownText
	document.title = `Happy Hour (${countdownText})`
}

updateCountdown()
setInterval(updateCountdown, 1000)
