/**
 * Hemisphere Hotels & Resorts - Vanilla JavaScript Architecture
 * Powers the preloader, hero slider, booking engine, filter tabs,
 * circular aperture masks, and Lenis smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll()
  initPreloader()
  initHeaderScroll()
  initMobileMenu()
  initAnnouncementBar()
  initHeroSlider()
  initBookingWidget()
  initStaysFilter()
  initScrollAnimations()
  initCircularTransitions()
})

/* ==========================================================================
   1. Preloader Animation
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader')
  const counterEl = document.getElementById('preloader-counter')
  const progressBar = document.getElementById('preloader-progress')
  if (!preloader || !counterEl || !progressBar) return

  if (lenis) lenis.stop()

  let count = 0
  const interval = setInterval(() => {
    if (count < 92) {
      count += Math.floor(Math.random() * 10) + 6
      if (count > 92) count = 92
      counterEl.textContent = count
      progressBar.style.width = count + '%'
    }
  }, 35)

  const complete = () => {
    clearInterval(interval)
    counterEl.textContent = '100'
    progressBar.style.width = '100%'
    setTimeout(() => {
      preloader.classList.add('preloader-hidden')
      if (lenis) lenis.start()
    }, 200)
  }

  window.addEventListener('load', complete)
  setTimeout(complete, 1200) // Fast, elegant fallback timeout
}

/* ==========================================================================
   2. Lenis Smooth Scrolling Architecture
   ========================================================================== */
let lenis = null
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return

  lenis = new Lenis({
    duration: 0.95,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.15,
    touchMultiplier: 1.5,
    infinite: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // Smooth scroll for all internal anchor links (e.g. Discover down button, Book Now, Stays)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')
      if (targetId === '#' || !targetId) return
      const target = document.querySelector(targetId)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, {
          offset: -20,
          duration: 0.9,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    })
  })
}

/* ==========================================================================
   3. Header Transparent-to-Frosted Scroll State
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header')
  const wordmark = document.getElementById('brand-wordmark')
  const menuBtn = document.getElementById('menu-toggle-btn')
  if (!header) return

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.remove('bg-gradient-to-b', 'from-black/85', 'via-black/50', 'to-transparent', 'text-white')
      header.classList.add('bg-white/95', 'backdrop-blur-md', 'text-text-primary', 'shadow-md', 'border-b', 'border-border/80')
      if (wordmark) {
        wordmark.classList.remove('text-white')
        wordmark.classList.add('text-text-primary')
      }
      if (menuBtn) {
        menuBtn.classList.remove('text-white')
        menuBtn.classList.add('text-text-primary')
      }
    } else {
      header.classList.add('bg-gradient-to-b', 'from-black/85', 'via-black/50', 'to-transparent', 'text-white')
      header.classList.remove('bg-white/95', 'backdrop-blur-md', 'text-text-primary', 'shadow-md', 'border-b', 'border-border/80')
      if (wordmark) {
        wordmark.classList.add('text-white')
        wordmark.classList.remove('text-text-primary')
      }
      if (menuBtn) {
        menuBtn.classList.add('text-white')
        menuBtn.classList.remove('text-text-primary')
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const openBtn = document.getElementById('menu-toggle-btn')
  const closeBtn = document.getElementById('menu-close-btn')
  const drawer = document.getElementById('mobile-drawer')
  const staysToggle = document.getElementById('mobile-stays-toggle')
  const staysSubmenu = document.getElementById('mobile-stays-submenu')
  const staysChevron = document.getElementById('mobile-stays-chevron')

  if (!drawer) return

  const openDrawer = () => {
    drawer.classList.remove('hidden')
    drawer.classList.add('flex')
    document.body.style.overflow = 'hidden'
  }

  const closeDrawer = () => {
    drawer.classList.add('hidden')
    drawer.classList.remove('flex')
    document.body.style.overflow = ''
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer)
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer)

  // Submenu accordion
  if (staysToggle && staysSubmenu && staysChevron) {
    staysToggle.addEventListener('click', () => {
      staysSubmenu.classList.toggle('hidden')
      staysChevron.classList.toggle('rotate-180')
    })
  }

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer)
  })
}

/* ==========================================================================
   5. Announcement Bar Dismissal
   ========================================================================== */
function initAnnouncementBar() {
  const banner = document.getElementById('announcement-bar')
  const dismissBtn = document.getElementById('dismiss-announcement-btn')
  if (!banner || !dismissBtn) return

  dismissBtn.addEventListener('click', () => {
    banner.style.display = 'none'
  })
}

/* ==========================================================================
   6. Hero Slider with Auto-Advance & Parallax Transitions
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide-item')
  const prevBtn = document.getElementById('hero-prev-btn')
  const nextBtn = document.getElementById('hero-next-btn')
  const locationSubtitle = document.getElementById('hero-location-subtitle')
  const locationName = document.getElementById('hero-location-name')
  if (!slides.length) return

  const slideData = [
    { title: 'Damai Lagoon Resort', location: 'Teluk Penyuk, Santubong' },
    { title: 'Damai Beach Resort', location: 'Mount Santubong Coast' },
    { title: 'Grand Margherita Hotel', location: 'Kuching Waterfront' },
    { title: 'Riverside Majestic — Puteri & Astana', location: 'Sarawak Riverfront' },
  ]

  let currentIndex = 0
  let autoTimer = null

  const showSlide = (newIndex) => {
    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'slide-prev', 'slide-next')
      if (idx === newIndex) {
        slide.classList.add('active')
      } else if (idx < newIndex) {
        slide.classList.add('slide-prev')
      } else {
        slide.classList.add('slide-next')
      }
    })

    currentIndex = newIndex

    if (locationSubtitle && locationName && slideData[newIndex]) {
      locationSubtitle.textContent = slideData[newIndex].title
      locationName.textContent = slideData[newIndex].location
    }
  }

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % slides.length
    showSlide(nextIdx)
  }

  const prevSlide = () => {
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length
    showSlide(prevIdx)
  }

  const resetTimer = () => {
    if (autoTimer) clearInterval(autoTimer)
    autoTimer = setInterval(nextSlide, 3200)
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide()
      resetTimer()
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide()
      resetTimer()
    })
  }

  resetTimer()
}

/* ==========================================================================
   7. Universal Booking Widget Logic
   ========================================================================== */
function initBookingWidget() {
  // Destination Dropdown
  const hotelBtn = document.getElementById('hotel-trigger-btn')
  const hotelDropdown = document.getElementById('hotel-dropdown')
  const hotelDisplay = document.getElementById('selected-hotel-name')
  const hotelOptions = document.querySelectorAll('.hotel-option')

  if (hotelBtn && hotelDropdown) {
    hotelBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      hotelDropdown.classList.toggle('hidden')
      closeGuestsDropdown()
    })

    hotelOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        const name = opt.getAttribute('data-name')
        if (hotelDisplay) hotelDisplay.textContent = name
        hotelDropdown.classList.add('hidden')
      })
    })
  }

  // Guests Dropdown
  const guestsBtn = document.getElementById('guests-trigger-btn')
  const guestsDropdown = document.getElementById('guests-dropdown')
  const guestsSummary = document.getElementById('guests-summary-text')

  let adults = 2
  let rooms = 1

  const updateGuestsDisplay = () => {
    if (guestsSummary) {
      guestsSummary.textContent = `${adults} Guest${adults > 1 ? 's' : ''}, ${rooms} Room${rooms > 1 ? 's' : ''}`
    }
    const aCount = document.getElementById('adults-count')
    const rCount = document.getElementById('rooms-count')
    if (aCount) aCount.textContent = adults
    if (rCount) rCount.textContent = rooms
  }

  const closeGuestsDropdown = () => {
    if (guestsDropdown) guestsDropdown.classList.add('hidden')
  }

  if (guestsBtn && guestsDropdown) {
    guestsBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      guestsDropdown.classList.toggle('hidden')
      if (hotelDropdown) hotelDropdown.classList.add('hidden')
    })

    document.getElementById('adults-minus')?.addEventListener('click', (e) => {
      e.stopPropagation()
      if (adults > 1) { adults--; updateGuestsDisplay() }
    })
    document.getElementById('adults-plus')?.addEventListener('click', (e) => {
      e.stopPropagation()
      if (adults < 8) { adults++; updateGuestsDisplay() }
    })
    document.getElementById('rooms-minus')?.addEventListener('click', (e) => {
      e.stopPropagation()
      if (rooms > 1) { rooms--; updateGuestsDisplay() }
    })
    document.getElementById('rooms-plus')?.addEventListener('click', (e) => {
      e.stopPropagation()
      if (rooms < 4) { rooms++; updateGuestsDisplay() }
    })
  }

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (hotelDropdown && !hotelDropdown.contains(e.target) && e.target !== hotelBtn) {
      hotelDropdown.classList.add('hidden')
    }
    if (guestsDropdown && !guestsDropdown.contains(e.target) && e.target !== guestsBtn) {
      guestsDropdown.classList.add('hidden')
    }
  })

  // Date picker synchronization
  const checkinInput = document.getElementById('checkin-input')
  const checkinDisplay = document.getElementById('checkin-display')
  const checkoutInput = document.getElementById('checkout-input')
  const checkoutDisplay = document.getElementById('checkout-display')

  const formatDate = (val) => {
    if (!val) return ''
    const parts = val.split('-')
    if (parts.length !== 3) return val
    const d = new Date(parts[0], parts[1] - 1, parts[2])
    return `${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()}`
  }

  // Set default dates (today & +2 days)
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const todayStr = `${yyyy}-${mm}-${dd}`

  const future = new Date()
  future.setDate(future.getDate() + 2)
  const fYyyy = future.getFullYear()
  const fMm = String(future.getMonth() + 1).padStart(2, '0')
  const fDd = String(future.getDate()).padStart(2, '0')
  const futureStr = `${fYyyy}-${fMm}-${fDd}`

  if (checkinInput && checkinDisplay) {
    checkinInput.value = todayStr
    checkinDisplay.textContent = formatDate(todayStr)
    checkinInput.addEventListener('change', () => {
      checkinDisplay.textContent = formatDate(checkinInput.value)
    })
  }

  if (checkoutInput && checkoutDisplay) {
    checkoutInput.value = futureStr
    checkoutDisplay.textContent = formatDate(futureStr)
    checkoutInput.addEventListener('change', () => {
      checkoutDisplay.textContent = formatDate(checkoutInput.value)
    })
  }

  // Form Submit Feedback
  const form = document.getElementById('booking-form')
  const searchBtn = document.getElementById('booking-search-btn')
  const feedback = document.getElementById('booking-feedback')

  if (form && searchBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      searchBtn.disabled = true
      searchBtn.innerHTML = '<span>Searching...</span>'
      if (feedback) feedback.classList.add('hidden')

      setTimeout(() => {
        searchBtn.disabled = false
        searchBtn.innerHTML = `
          <svg class="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span class="text-xs uppercase tracking-luxury font-medium">Search</span>
        `
        if (feedback) {
          const hotelName = hotelDisplay ? hotelDisplay.textContent : 'All Properties'
          feedback.textContent = `Availability query initialized for ${hotelName} (${adults} Guests, ${rooms} Room${rooms > 1 ? 's' : ''}).`
          feedback.classList.remove('hidden')
        }
      }, 700)
    })
  }
}

/* ==========================================================================
   8. "Our Stays" Interactive Filter Tabs
   ========================================================================== */
function initStaysFilter() {
  const tabs = document.querySelectorAll('.stays-filter-tab')
  const cards = document.querySelectorAll('.property-item')
  if (!tabs.length || !cards.length) return

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('bg-brand-charcoal', 'text-text-inverse')
        t.classList.add('bg-surface', 'border', 'border-border', 'text-text-secondary')
      })
      tab.classList.add('bg-brand-charcoal', 'text-text-inverse')
      tab.classList.remove('bg-surface', 'border', 'border-border', 'text-text-secondary')

      const filter = tab.getAttribute('data-filter')

      cards.forEach((card) => {
        const cat = card.getAttribute('data-category')
        if (filter === 'all' || cat === filter) {
          card.style.display = ''
          card.style.opacity = '1'
        } else {
          card.style.display = 'none'
          card.style.opacity = '0'
        }
      })
    })
  })
}

/* ==========================================================================
   9. Scroll Entrance Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale')
  if (!elements.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        } else {
          // Re-trigger smoothly when scrolling back
          entry.target.classList.remove('in-view')
        }
      })
    },
    { threshold: 0.12 }
  )

  elements.forEach((el) => observer.observe(el))
}

/* ==========================================================================
   10. Circular Aperture Transitions on Scroll (Native Lenis-Synchronized)
   ========================================================================== */
function initCircularTransitions() {
  const portals = document.querySelectorAll('.circular-portal')
  if (!portals.length) return

  const updatePortals = () => {
    const vh = window.innerHeight
    portals.forEach((portal) => {
      const rect = portal.getBoundingClientRect()
      const start = vh * 0.90
      const end = vh * 0.30

      // Progress from 0 (at 90% viewport height) to 1 (at 30% viewport height)
      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1)

      if (progress <= 0) {
        portal.style.clipPath = 'circle(0% at 50% 50%)'
      } else if (progress >= 0.98) {
        portal.style.clipPath = 'none'
      } else {
        // power1.out easing: 1 - (1 - progress)^2 for graceful cinematic aperture reveal
        const eased = 1 - Math.pow(1 - progress, 2)
        portal.style.clipPath = `circle(${(eased * 170).toFixed(2)}% at 50% 50%)`
      }
    })
  }

  // Update immediately and sync with Lenis / scroll events
  if (lenis) {
    lenis.on('scroll', updatePortals)
  } else {
    window.addEventListener('scroll', updatePortals, { passive: true })
  }

  window.addEventListener('resize', updatePortals, { passive: true })
  updatePortals()
}
