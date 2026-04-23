const AUTH_KEY = 'YOUR_AUTH_KEY'
const SERVER_DOMAIN = 'some.website.com'

export const initServerTrack = () => {
  if (window.ServerTrack) return

  window.serverTrackQueue = []

  // Temporary queue function - stores events until SDK loads
  window.st = function() {
    window.serverTrackQueue.push(Array.from(arguments))
  }

  const script = document.createElement('script')
  script.async = true
  const randomPath = Math.random().toString(36).substring(2, 15)
  script.src = `https://${SERVER_DOMAIN}/lib/${randomPath}?key=${AUTH_KEY}`

  // Once SDK loads, replay all queued events through the real st
  script.onload = function() {
    const queue = window.serverTrackQueue || []
    window.serverTrackQueue = []
    queue.forEach(function(args) {
      window.st.apply(window, args)
    })
  }

  document.head.appendChild(script)
}

export const trackEvent = (eventName, eventData = {}, userData = null) => {
  if (typeof window.st !== 'function') return
  if (userData) {
    window.st('track', eventName, eventData, userData)
  } else {
    window.st('track', eventName, eventData)
  }
}
