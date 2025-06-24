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
	const diff = tomorrowUTC.getTime() - currentTime.getTime() // Diferencia en ms

	if (diff <= 0) {
		countdownEl.textContent = "✅ It's tomorrow!"
		clearInterval(intervalId)
		return
	}

	const totalSeconds = Math.floor(diff / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60

	countdownEl.textContent = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
}

updateCountdown()
const intervalId = setInterval(updateCountdown, 1000) // ⏱️ Cada segundo
