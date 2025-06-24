import './style.css'

const countdownEl = document.getElementById('countdown')

const now = new Date()
const tomorrowUTC = new Date(
	Date.UTC(
		now.getUTCFullYear(),
		now.getUTCMonth(),
		now.getUTCDate() + 1,
		0,
		0,
		0,
	),
)
const pad = (n) => n.toString().padStart(2, '0')

function updateCountdown() {
	const currentTime = new Date()
	const diff = tomorrowUTC.getTime() - currentTime.getTime()

	const totalSeconds = Math.floor(diff / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60

	const countdownText = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`

	countdownEl.textContent = countdownText
	document.title = `Happy Hour (${countdownText})`
}

updateCountdown()
setInterval(updateCountdown, 1000)
