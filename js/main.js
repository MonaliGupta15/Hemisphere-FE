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
  initBookingPreselect()
  initStaysFilter()
  initGenericTabs()
  initLightbox()
  initModals()
  initForms()
  initActiveNav()
  initBackToTop()
  initScrollAnimations()
  initCircularTransitions()
  initDesktopStaysDropdown()
  initAnchorTabs()
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
    const isMobile = window.innerWidth < 1024
    const scrolled = window.scrollY > 40

    if (isMobile) {
      // Mobile: Always solid luxury charcoal with high contrast. Never transparent, never white glassmorphism.
      header.classList.remove(
        'bg-gradient-to-b', 'from-black/85', 'via-black/50', 'to-transparent',
        'bg-white/95', 'text-text-primary'
      )
      header.classList.add('bg-brand-charcoal', 'text-white')
      if (scrolled) {
        header.classList.add('shadow-xl')
      } else {
        header.classList.remove('shadow-xl')
      }
      if (wordmark) {
        wordmark.classList.add('text-white')
        wordmark.classList.remove('text-text-primary')
      }
      if (menuBtn) {
        menuBtn.classList.add('text-white')
        menuBtn.classList.remove('text-text-primary')
      }
      return
    }

    // Desktop: Cinematic transparent gradient at top, solid dark luxury on scroll
    if (scrolled) {
      header.classList.remove('bg-gradient-to-b', 'from-black/85', 'via-black/50', 'to-transparent', 'bg-white/95', 'text-text-primary')
      header.classList.add('bg-brand-charcoal/95', 'backdrop-blur-md', 'text-white', 'shadow-xl', 'border-b', 'border-brand-gold/20')
      if (wordmark) {
        wordmark.classList.add('text-white')
        wordmark.classList.remove('text-text-primary')
      }
      if (menuBtn) {
        menuBtn.classList.add('text-white')
        menuBtn.classList.remove('text-text-primary')
      }
    } else {
      header.classList.add('bg-gradient-to-b', 'from-black/85', 'via-black/50', 'to-transparent', 'text-white')
      header.classList.remove('bg-brand-charcoal/95', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-brand-gold/20', 'bg-white/95', 'text-text-primary')
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
  window.addEventListener('resize', handleScroll, { passive: true })
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

  const applyFilter = (filter, updateUrl = true) => {
    tabs.forEach((t) => {
      const tFilter = t.getAttribute('data-filter')
      if (tFilter === filter) {
        t.classList.add('bg-brand-charcoal', 'text-text-inverse')
        t.classList.remove('bg-surface', 'border', 'border-border', 'text-text-secondary')
      } else {
        t.classList.remove('bg-brand-charcoal', 'text-text-inverse')
        t.classList.add('bg-surface', 'border', 'border-border', 'text-text-secondary')
      }
    })

    cards.forEach((card) => {
      const cat = card.getAttribute('data-category')
      if (filter === 'all' || cat === filter) {
        card.style.display = ''
        card.style.opacity = ''
      } else {
        card.style.display = 'none'
        card.style.opacity = ''
        card.classList.remove('in-view')
      }
    })

    if (updateUrl && history.replaceState) {
      const url = new URL(window.location.href)
      url.searchParams.set('filter', filter)
      history.replaceState(null, '', url.toString())
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter')
      applyFilter(filter, true)
    })
  })

  // URL Query / Hash Auto-Routing
  const params = new URLSearchParams(window.location.search)
  const initialFilter = params.get('filter') || params.get('tab') || window.location.hash.replace('#', '')
  if (initialFilter && (initialFilter === 'coastal' || initialFilter === 'city')) {
    applyFilter(initialFilter, false)
  }
}

/* ==========================================================================
   9. Scroll Entrance & Viewport Interactive Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  // 1. Auto-discover interactive elements across all 14 pages
  const autoSelectors = [
    // Section headers & titles
    'main section > div > .text-center',
    'main section > div > .mb-8',
    'main section > div > .mb-10',
    'main section > div > .mb-12',
    'main section > div > .mb-14',
    // Grid containers child cards & articles
    '#gallery-grid > div',
    '#dining-grid > article',
    '#rooms-grid > article',
    '#offers-grid > article',
    '#stays-grid > article',
    '#pathways-container > div',
    '.property-item',
    'main section .grid-cols-1 > article',
    'main section .md\\:grid-cols-2 > article',
    'main section .md\\:grid-cols-3 > article',
    'main section .md\\:grid-cols-3 > div',
    'main section .lg\\:grid-cols-3 > article',
    'main section .lg\\:grid-cols-3 > div',
    // Property showcase & split columns
    'section .grid > .lg\\:col-span-6',
    // Tables & cards
    '.table-container',
    '.tier-card',
    // Full width callouts & banners
    'main section:last-of-type > div'
  ]

  autoSelectors.forEach((selector) => {
    try {
      const items = document.querySelectorAll(selector)
      items.forEach((el, index) => {
        if (el.closest('header') || el.closest('#mobile-drawer') || el.closest('#preloader') || el.closest('#booking-form') || el.closest('#booking-section')) return
        if (el.classList.contains('reveal-on-scroll') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right') || el.classList.contains('reveal-scale')) return
        
        // Directional reveal for split showcases
        if (el.classList.contains('lg:col-span-6') && el.parentElement && el.parentElement.classList.contains('lg:grid-cols-12')) {
          if (el === el.parentElement.firstElementChild) {
            el.classList.add('reveal-left')
          } else {
            el.classList.add('reveal-right')
          }
        } else if (el.parentElement && (el.parentElement.id?.includes('grid') || el.classList.contains('property-item') || el.parentElement.id === 'pathways-container' || el.tagName === 'ARTICLE')) {
          el.classList.add('reveal-on-scroll')
          const delayMod = (index % 4) * 100
          if (delayMod === 100) el.classList.add('delay-100')
          else if (delayMod === 200) el.classList.add('delay-200')
          else if (delayMod === 300) el.classList.add('delay-300')
        } else {
          el.classList.add('reveal-on-scroll')
        }
      })
    } catch (e) {
      // ignore
    }
  })

  // 2. Query all elements with reveal classes
  const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale')
  if (!elements.length) return

  // 3. Track scroll direction continuously (native & Lenis synchronized)
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop
  let scrollDirection = 'down'

  const updateScrollDirection = (currentY) => {
    const diff = currentY - lastScrollY
    if (Math.abs(diff) >= 2) {
      scrollDirection = diff > 0 ? 'down' : 'up'
      lastScrollY = currentY
    }
  }

  // 4. Check all elements and apply continuous bi-directional animation
  const checkViewport = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight
    const currentY = window.pageYOffset || document.documentElement.scrollTop
    updateScrollDirection(currentY)

    elements.forEach((el) => {
      // Skip hidden filter tabs
      if (el.offsetParent === null && el.style.display === 'none') {
        el.classList.remove('in-view')
        return
      }

      const rect = el.getBoundingClientRect()
      const elHeight = rect.height || el.offsetHeight || 100

      // Case 1: Completely above viewport (user scrolled down past this element)
      if (rect.bottom <= 0) {
        el.classList.remove('in-view')
        // Prime to float down from top when scrolling back up
        el.classList.remove('from-below')
        el.classList.add('from-above')
        return
      }

      // Case 2: Completely below viewport (user scrolled up past this element)
      if (rect.top >= vh) {
        el.classList.remove('in-view')
        // Prime to float up from bottom when scrolling down
        el.classList.remove('from-above')
        el.classList.add('from-below')
        return
      }

      // Case 3: Inside or entering viewport
      if (scrollDirection === 'up') {
        // When scrolling UP:
        // Element is entering from the top.
        // Trigger entrance when enough content is visible (at least 60px or 35% of card)
        // so the user actually sees the full animation play inside their visible screen!
        const topTrigger = Math.min(80, elHeight * 0.35)
        if (rect.top < 0 && rect.bottom < topTrigger) {
          // Still mostly off-screen above, wait until visible
          el.classList.remove('in-view')
          el.classList.add('from-above')
        } else {
          el.classList.add('in-view')
        }
      } else {
        // When scrolling DOWN:
        // Element is entering from the bottom.
        // Trigger entrance when top enters within viewport
        const bottomTrigger = vh - Math.min(30, elHeight * 0.15)
        if (rect.top > bottomTrigger) {
          // Still mostly below, wait until crossing trigger line
          el.classList.remove('in-view')
          el.classList.add('from-below')
        } else {
          el.classList.add('in-view')
        }
      }
    })
  }

  // 5. Initial viewport check on load
  checkViewport()

  // 6. High-performance scroll synchronization (rAF-throttled)
  let scrollRaf = null
  const onScrollThrottled = () => {
    if (scrollRaf) return
    scrollRaf = requestAnimationFrame(() => {
      checkViewport()
      scrollRaf = null
    })
  }

  window.addEventListener('scroll', onScrollThrottled, { passive: true })
  
  if (typeof lenis !== 'undefined' && lenis) {
    lenis.on('scroll', (e) => {
      if (e && typeof e.direction !== 'undefined') {
        scrollDirection = e.direction > 0 ? 'down' : 'up'
      }
      onScrollThrottled()
    })
  }

  window.addEventListener('resize', onScrollThrottled, { passive: true })

  // 7. Re-check on filter tab switch or user interactions
  const triggerRecheck = () => {
    setTimeout(checkViewport, 40)
    setTimeout(checkViewport, 150)
  }

  document.querySelectorAll('[data-tab-filter], .tab-btn, .stays-filter-tab').forEach((tab) => {
    tab.addEventListener('click', triggerRecheck)
  })
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

/* ==========================================================================
   11. Booking Preselection via URL Query Params
   ========================================================================== */
function initBookingPreselect() {
  const params = new URLSearchParams(window.location.search)
  const hotelSlug = params.get('hotel')
  const hotelDisplay = document.getElementById('selected-hotel-name')
  if (!hotelSlug || !hotelDisplay) return

  const hotelMap = {
    'damai-beach': 'Damai Beach Resort',
    'damai-lagoon': 'Damai Lagoon Resort',
    'grand-margherita': 'Grand Margherita Hotel',
    'riverside-majestic': 'Riverside Majestic Hotel',
    'riverside-majestic-puteri': 'Riverside Majestic Hotel — Puteri Wing',
    'riverside-majestic-astana': 'Riverside Majestic Hotel — Astana Wing',
  }

  if (hotelMap[hotelSlug]) {
    hotelDisplay.textContent = hotelMap[hotelSlug]
  }
}

/* ==========================================================================
   12. Generic Category / Property Filter Tabs
   ========================================================================== */
function initGenericTabs() {
  const groups = document.querySelectorAll('[data-tab-group]')
  if (!groups.length) return

  groups.forEach((group) => {
    const triggers = group.querySelectorAll('[data-tab-filter]')
    const containerSelector = group.getAttribute('data-tab-target')
    const container = containerSelector ? document.querySelector(containerSelector) : document
    if (!container) return

    const items = container.querySelectorAll('[data-tab-item]')

    const activateTab = (filterVal, updateUrl = true) => {
      triggers.forEach((t) => {
        const tVal = t.getAttribute('data-tab-filter')
        if (tVal === filterVal) {
          t.classList.add('bg-brand-charcoal', 'text-white')
          t.classList.remove('bg-surface', 'border', 'border-border', 'text-text-secondary')
        } else {
          t.classList.remove('bg-brand-charcoal', 'text-white')
          t.classList.add('bg-surface', 'border', 'border-border', 'text-text-secondary')
        }
      })

      items.forEach((item) => {
        const itemCat = item.getAttribute('data-tab-item')
        if (filterVal === 'all' || itemCat === filterVal || (itemCat && itemCat.includes(filterVal))) {
          item.style.display = ''
          item.style.opacity = ''
        } else {
          item.style.display = 'none'
          item.style.opacity = ''
          item.classList.remove('in-view')
        }
      })

      if (updateUrl && history.replaceState) {
        const url = new URL(window.location.href)
        url.searchParams.set('tab', filterVal)
        history.replaceState(null, '', url.toString())
      }
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const filterVal = trigger.getAttribute('data-tab-filter')
        activateTab(filterVal, true)
      })
    })

    // URL Query Param / Hash Auto-Routing on load
    const params = new URLSearchParams(window.location.search)
    const urlTarget = params.get('property') || params.get('tab') || params.get('category') || params.get('filter') || window.location.hash.replace('#', '')

    if (urlTarget) {
      const match = Array.from(triggers).find((t) => {
        const f = t.getAttribute('data-tab-filter')
        return f === urlTarget || f.includes(urlTarget) || urlTarget.includes(f)
      })
      if (match) {
        activateTab(match.getAttribute('data-tab-filter'), false)
      }
    }
  })
}

/* ==========================================================================
   13. High-Resolution Media Lightbox
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal')
  const lightboxImg = document.getElementById('lightbox-img')
  const lightboxCaption = document.getElementById('lightbox-caption')
  const closeBtn = document.getElementById('lightbox-close')
  const triggers = document.querySelectorAll('[data-lightbox-src]')

  if (!lightbox || !lightboxImg) return

  const openLightbox = (src, caption) => {
    lightboxImg.src = src
    if (lightboxCaption) lightboxCaption.textContent = caption || ''
    lightbox.classList.add('active')
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    lightbox.classList.remove('active')
    document.body.style.overflow = ''
    setTimeout(() => {
      lightboxImg.src = ''
    }, 250)
  }

  triggers.forEach((trig) => {
    trig.addEventListener('click', (e) => {
      e.preventDefault()
      const src = trig.getAttribute('data-lightbox-src')
      const caption = trig.getAttribute('data-lightbox-caption') || ''
      openLightbox(src, caption)
    })
  })

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox()
    }
  })
}

/* ==========================================================================
   14. Modal Dialogs (Room Details, Table Reservations, etc.)
   ========================================================================== */
function initModals() {
  // Modal Triggers
  document.querySelectorAll('[data-modal-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const modalId = btn.getAttribute('data-modal-target')
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.add('active')
        document.body.style.overflow = 'hidden'

        // Optional pre-fill for table reservation
        const titleData = btn.getAttribute('data-modal-title')
        const titleTarget = modal.querySelector('[data-modal-fill-title]')
        if (titleData && titleTarget) {
          titleTarget.textContent = titleData
        }
      }
    })
  })

  // Modal Closers
  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop')
      if (modal) {
        modal.classList.remove('active')
        document.body.style.overflow = ''
      }
    })
  })

  // Backdrop click close
  document.querySelectorAll('.modal-backdrop').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active')
        document.body.style.overflow = ''
      }
    })
  })
}

/* ==========================================================================
   15. Interactive Forms with Feedback (RFP, Contact, Loyalty, Booking)
   ========================================================================== */
function initForms() {
  const forms = document.querySelectorAll('form[data-ajax-form]')
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const submitBtn = form.querySelector('button[type="submit"]')
      const feedbackEl = form.querySelector('.form-feedback')
      const origText = submitBtn ? submitBtn.innerHTML : 'Submit'

      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin h-4 w-4 text-brand-gold" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> Processing...</span>'
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false
          submitBtn.innerHTML = origText
        }
        if (feedbackEl) {
          feedbackEl.classList.remove('hidden')
          feedbackEl.innerHTML = `
            <div class="p-4 bg-brand-green/10 border border-brand-green/30 rounded-sm text-brand-green text-xs font-medium flex items-center gap-2">
              <svg class="w-4 h-4 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Thank you. Your request has been received by our concierge team. We will be in touch shortly.</span>
            </div>
          `
        }
        form.reset()
      }, 700)
    })
  })
}

/* ==========================================================================
   16. Active Navigation Link Highlighting
   ========================================================================== */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('nav a, #mobile-drawer a').forEach((link) => {
    const href = link.getAttribute('href')
    if (href && href === currentPath) {
      link.classList.add('active-page')
      link.classList.remove('text-white/80', 'text-text-secondary')
    }
  })
}

/* ==========================================================================
   17. Back to Top Smooth Scroll
   ========================================================================== */
function initBackToTop() {
  const backToTopBtns = document.querySelectorAll('.back-to-top-btn, #back-to-top-btn')
  backToTopBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(0, {
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    })
  })
}

/* ==========================================================================
   18. Desktop Stays Dropdown Click & Touch Support
   ========================================================================== */
function initDesktopStaysDropdown() {
  const stayGroups = document.querySelectorAll('header nav .relative.group')
  stayGroups.forEach((grp) => {
    const chevron = grp.querySelector('[data-lucide="chevron-down"]')
    const menu = grp.querySelector('.group-hover\\:block, [class*="group-hover"]')
    if (!chevron || !menu) return

    chevron.style.cursor = 'pointer'
    chevron.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      menu.classList.toggle('!block')
    })
  })

  document.addEventListener('click', (e) => {
    if (!e.target.closest('header nav .relative.group')) {
      document.querySelectorAll('header nav .relative.group .\\!block').forEach((el) => {
        el.classList.remove('!block')
      })
    }
  })
}

/* ==========================================================================
   19. Smooth Anchor & Sub-Nav Tab Scrolling
   ========================================================================== */
function initAnchorTabs() {
  document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#property-booking-dummy"])').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')
      if (!targetId || targetId === '#') return
      const targetEl = document.querySelector(targetId)
      if (targetEl) {
        e.preventDefault()
        if (typeof lenis !== 'undefined' && lenis) {
          lenis.scrollTo(targetEl, {
            offset: -85,
            duration: 0.9,
          })
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    })
  })
}


