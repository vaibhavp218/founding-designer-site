document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     Hero — Lottie Background
     ============================================================ */
  const heroBg = document.getElementById('hero-bg');

  if (heroBg && typeof lottie !== 'undefined') {
    lottie.loadAnimation({
      container: heroBg,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'Hero Background Animation Lottie File.json',
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
    });
  }

  /* ============================================================
     Roles Section — scroll-driven accordion + Lottie swap
     ============================================================ */
  const rolesSection = document.getElementById('roles');

  if (rolesSection && typeof lottie !== 'undefined') {
    const roleKeys   = ['founder', 'pm', 'cto'];
    const lottieFiles = {
      founder: '01-The-Founder.json',
      pm:      '02-The-PM.json',
      cto:     'The-CTO.json'
    };

    // Load all three animations; only the first plays on load
    const roleAnims = {};
    roleKeys.forEach(key => {
      roleAnims[key] = lottie.loadAnimation({
        container: document.getElementById(`lottie-${key}`),
        renderer:  'svg',
        loop:      true,
        autoplay:  key === 'founder',
        path:      lottieFiles[key],
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
      });
    });

    const items   = document.querySelectorAll('.roles__item');
    const lotties = document.querySelectorAll('.roles__lottie');
    let   activeStep = 0;

    function switchRole(step) {
      if (step === activeStep && items[step].classList.contains('roles__item--active')) return;
      activeStep = step;

      // Accordion
      items.forEach((item, i) => {
        const isActive = i === step;
        item.classList.toggle('roles__item--active', isActive);
        item.querySelector('.roles__item-header').setAttribute('aria-expanded', isActive);
      });

      // Lottie — instant cross-fade + play/stop
      lotties.forEach((el, i) => {
        const isActive = i === step;
        el.classList.toggle('roles__lottie--active', isActive);
        isActive ? roleAnims[roleKeys[i]].play() : roleAnims[roleKeys[i]].stop();
      });
    }

    // Scroll driver — maps section scroll progress → one of 3 steps
    function onScroll() {
      const rect       = rolesSection.getBoundingClientRect();
      const scrolled   = -rect.top;
      const scrollable = rolesSection.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const step     = Math.min(roleKeys.length - 1, Math.floor(progress * roleKeys.length));
      switchRole(step);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Click fallback — lets users tap a persona label to jump to it
    items.forEach((item, i) => {
      item.querySelector('.roles__item-header').addEventListener('click', () => switchRole(i));
    });
  }

  /* ============================================================
     Services Section — Stage Switcher
     ============================================================ */
  const servicesSection = document.getElementById('services');

  if (servicesSection) {
    const stageBtns = servicesSection.querySelectorAll('.services__stage');
    const cards = {
      build: servicesSection.querySelector('.svc-card--build'),
      ux: servicesSection.querySelector('.svc-card--ux'),
      revamp: servicesSection.querySelector('.svc-card--revamp'),
      designSystem: servicesSection.querySelector('.svc-card--design-system'),
      strategic: servicesSection.querySelector('.svc-card--strategic')
    };

    const stageCards = {
      'pre-pmf': {
        active: ['build'],
        cards: {
          build:        { left: '79.74px', top: '480px',    rotate: '-8.34deg', z: 5 },
          ux:           { left: '326.2px', top: '641px',    rotate: '-5.15deg', z: 2 },
          revamp:       { left: '587.83px', top: '648.92px', rotate: '3.86deg',  z: 3 },
          designSystem: { left: '796px',   top: '618px',    rotate: '4.37deg',  z: 4 },
          strategic:    { left: '946.48px', top: '663px',   rotate: '7.26deg',  z: 1 }
        }
      },
      'post-pmf': {
        active: ['ux', 'revamp', 'designSystem'],
        cards: {
          build:        { left: '67.33px', top: '618.7px',  rotate: '-11.67deg', z: 1 },
          ux:           { left: '267.4px', top: '488.7px',  rotate: '-9.91deg',  z: 5 },
          revamp:       { left: '580px',   top: '494.89px', rotate: '0deg',      z: 6 },
          designSystem: { left: '841px',   top: '487.7px',  rotate: '7.62deg',   z: 5 },
          strategic:    { left: '965px',   top: '644.7px',  rotate: '11.97deg',  z: 2 }
        }
      },
      scaling: {
        active: ['revamp', 'designSystem'],
        cards: {
          build:        { left: '95.77px', top: '637.44px', rotate: '-11.67deg', z: 1 },
          ux:           { left: '307px',   top: '626.5px',  rotate: '-5.15deg',  z: 2 },
          revamp:       { left: '600px',   top: '497.51px', rotate: '0deg',      z: 6 },
          designSystem: { left: '850px',   top: '483.5px',  rotate: '7.62deg',   z: 5 },
          strategic:    { left: '965px',   top: '646.5px',  rotate: '11.97deg',  z: 1 }
        }
      },
      'pmf-reinvention': {
        active: ['strategic'],
        cards: {
          build:        { left: '95.77px', top: '629.04px', rotate: '-11.67deg', z: 1 },
          ux:           { left: '290px',   top: '631.1px',  rotate: '-5.15deg',  z: 2 },
          revamp:       { left: '568px',   top: '655.1px',  rotate: '0.68deg',   z: 3 },
          designSystem: { left: '825px',   top: '604.1px',  rotate: '4.37deg',   z: 4 },
          strategic:    { left: '998px',   top: '503.1px',  rotate: '3.85deg',   z: 6 }
        }
      }
    };

    const mobileStageCards = {
      'pre-pmf': {
        active: ['build'],
        cards: {
          build:        { left: '82px',  top: '429px', rotate: '0deg',     z: 6 },
          ux:           { left: '24px',  top: '896px', rotate: '-3.57deg', z: 2 },
          revamp:       { left: '108px', top: '892px', rotate: '2.05deg',  z: 3 },
          designSystem: { left: '190px', top: '898px', rotate: '-1.44deg', z: 4 },
          strategic:    { left: '140px', top: '880px', rotate: '3.6deg',   z: 1 }
        }
      },
      'post-pmf': {
        active: ['ux', 'revamp', 'designSystem'],
        cards: {
          build:        { left: '94px',  top: '860px', rotate: '-11.67deg', z: 1 },
          ux:           { left: '29px',  top: '375px', rotate: '-3.57deg',  z: 5 },
          revamp:       { left: '103px', top: '577px', rotate: '2.05deg',   z: 7 },
          designSystem: { left: '187px', top: '427px', rotate: '3.93deg',   z: 6 },
          strategic:    { left: '250px', top: '846px', rotate: '5.48deg',   z: 2 }
        }
      },
      scaling: {
        active: ['revamp', 'designSystem'],
        cards: {
          build:        { left: '94px',  top: '888px', rotate: '0deg',     z: 2 },
          ux:           { left: '24px',  top: '869px', rotate: '-3.57deg', z: 1 },
          revamp:       { left: '29px',  top: '532px', rotate: '-8.63deg', z: 6 },
          designSystem: { left: '178px', top: '391px', rotate: '3.93deg',  z: 5 },
          strategic:    { left: '160px', top: '850px', rotate: '3.6deg',   z: 3 }
        }
      },
      'pmf-reinvention': {
        active: ['strategic'],
        cards: {
          build:        { left: '132px', top: '872px', rotate: '0deg',     z: 2 },
          ux:           { left: '24px',  top: '848px', rotate: '-3.57deg', z: 1 },
          revamp:       { left: '64px',  top: '858px', rotate: '-8.63deg', z: 3 },
          designSystem: { left: '190px', top: '846px', rotate: '3.93deg',  z: 4 },
          strategic:    { left: '82px',  top: '399px', rotate: '0deg',     z: 6 }
        }
      }
    };

    const mobileServicesQuery = window.matchMedia('(max-width: 767px)');

    function getCurrentStageCards() {
      return mobileServicesQuery.matches ? mobileStageCards : stageCards;
    }

    function getStageKeys() {
      return mobileServicesQuery.matches
        ? ['pre-pmf', 'post-pmf', 'scaling', 'pmf-reinvention']
        : ['pre-pmf', 'post-pmf', 'scaling', 'pmf-reinvention'];
    }

    function activateStage(stageKey) {
      const stage = getCurrentStageCards()[stageKey];
      if (!stage) return;

      // Update stage buttons
      stageBtns.forEach(btn => {
        const isActive = btn.dataset.stage === stageKey;
        btn.classList.toggle('services__stage--active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      servicesSection.dataset.stage = stageKey;

      // Update cards. Rotation changes with the state, but is not animated.
      Object.entries(cards).forEach(([key, card]) => {
        const pose = stage.cards[key];
        if (!card || !pose) return;

        const isActive = stage.active.includes(key);
        const cardScale = getComputedStyle(card).getPropertyValue('--svc-card-scale').trim() || '1';
        const cardStyles = getComputedStyle(card);
        const inactiveLift = parseFloat(cardStyles.getPropertyValue('--svc-inactive-card-lift')) || 0;
        const activeLiftVars = {
          build: '--svc-active-build-lift',
          ux: '--svc-active-ux-lift',
          revamp: '--svc-active-revamp-lift',
          designSystem: '--svc-active-design-system-lift',
          strategic: '--svc-active-strategic-lift'
        };
        const activeShiftVars = {
          build: '--svc-active-build-shift-x',
          ux: '--svc-active-ux-shift-x'
        };
        const inactiveShiftVars = {
          build: '--svc-inactive-build-shift-x',
          ux: '--svc-inactive-ux-shift-x',
          strategic: '--svc-inactive-strategic-shift-x'
        };
        const inactiveLiftExtraVars = {
          strategic: '--svc-inactive-strategic-lift-extra'
        };
        const activeLift = parseFloat(cardStyles.getPropertyValue(activeLiftVars[key])) || 0;
        const activeShift = parseFloat(cardStyles.getPropertyValue(activeShiftVars[key])) || 0;
        const inactiveShift = parseFloat(cardStyles.getPropertyValue(inactiveShiftVars[key])) || 0;
        const inactiveLiftExtra = parseFloat(cardStyles.getPropertyValue(inactiveLiftExtraVars[key])) || 0;
        const left = parseFloat(pose.left) + (isActive ? activeShift : inactiveShift);
        const top = parseFloat(pose.top) - (isActive ? activeLift : inactiveLift + inactiveLiftExtra);
        card.classList.toggle('disabled', !isActive);
        card.style.left = `${left}px`;
        card.style.top = `${top}px`;
        card.style.transform = `rotate(${pose.rotate}) scale(${cardScale})`;
        card.style.zIndex = pose.z;
      });
    }

    // Scroll-driven stage switching
    let stageKeys = getStageKeys();
    let scrollStageIdx = 0;
    let stageCooldown = false;
    let postPmfScrollsRemaining = null; // armed on the last services state; Section 6 releases after two fresh scrolls
    let scrollLocked = false;    // locked during Section 6 snap animation
    let wasServicesActive = false;
    let lastWindowY = window.scrollY;
    let sectionSixUnlocked = false;
    const STAGE_COOLDOWN_MS = 480;
    const SNAP_LOCK_MS = 800;
    const engagementSection = document.getElementById('engagement');

    function syncStageKeysForViewport() {
      const activeStage = stageKeys[scrollStageIdx] || servicesSection.dataset.stage || 'pre-pmf';
      stageKeys = getStageKeys();
      const nextIdx = stageKeys.indexOf(activeStage);
      scrollStageIdx = nextIdx === -1 ? 0 : nextIdx;
      activateStage(stageKeys[scrollStageIdx]);
    }

    if (typeof mobileServicesQuery.addEventListener === 'function') {
      mobileServicesQuery.addEventListener('change', syncStageKeysForViewport);
    } else if (typeof mobileServicesQuery.addListener === 'function') {
      mobileServicesQuery.addListener(syncStageKeysForViewport);
    }

    function servicesStickyTop() {
      return parseFloat(getComputedStyle(servicesSection).top) || 108;
    }

    function animateScrollTo(target, duration = SNAP_LOCK_MS) {
      const start = window.scrollY;
      const targetY = target.getBoundingClientRect().top + window.scrollY;
      const distance = targetY - start;
      const startTime = performance.now();

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    function servicesStickyActive() {
      const rect = servicesSection.getBoundingClientRect();
      return rect.top <= 112 && rect.bottom > window.innerHeight * 0.45;
    }

    function servicesInViewport() {
      const rect = servicesSection.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function servicesHoldY() {
      return servicesSection.offsetTop - servicesStickyTop();
    }

    function engagementTopY() {
      return engagementSection
        ? engagementSection.offsetTop
        : servicesSection.offsetTop + servicesSection.offsetHeight;
    }

    function holdServicesPosition() {
      const holdY = servicesHoldY();
      if (Math.abs(window.scrollY - holdY) > 2) {
        window.scrollTo(0, holdY);
        lastWindowY = holdY;
      }
    }

    function setScrollStage(idx, options = {}) {
      scrollStageIdx = Math.max(0, Math.min(stageKeys.length - 1, idx));
      activateStage(stageKeys[scrollStageIdx]);
      if (options.armRelease) {
        postPmfScrollsRemaining = 2;
      } else if (options.clearRelease !== false) {
        postPmfScrollsRemaining = null;
      }
    }

    window.addEventListener('scroll', () => {
      if (mobileServicesQuery.matches) {
        wasServicesActive = servicesStickyActive();
        lastWindowY = window.scrollY;
        return;
      }

      const isActive = servicesStickyActive();
      const scrollingUp = window.scrollY < lastWindowY;
      const holdY = servicesHoldY();

      if (window.scrollY < holdY - 2) {
        sectionSixUnlocked = false;
        postPmfScrollsRemaining = null;
      }

      if (
        !sectionSixUnlocked &&
        window.scrollY >= holdY &&
        servicesInViewport()
      ) {
        if (!wasServicesActive) {
          if (scrollingUp) {
            setScrollStage(stageKeys.length - 1, { armRelease: true });
          } else {
            setScrollStage(0);
          }
        }
        holdServicesPosition();
      }

      if (isActive && !wasServicesActive) {
        stageCooldown = false;
        scrollLocked = false;
        if (scrollingUp) {
          sectionSixUnlocked = false;
          setScrollStage(stageKeys.length - 1, { armRelease: true });
        } else {
          sectionSixUnlocked = false;
          setScrollStage(0);
        }
      }

      wasServicesActive = isActive;
      lastWindowY = window.scrollY;
    }, { passive: true });

    window.addEventListener('wheel', (e) => {
      if (mobileServicesQuery.matches) return;

      const holdY = servicesHoldY();
      const enteringServices = e.deltaY > 0 && window.scrollY < holdY && window.scrollY + Math.abs(e.deltaY) >= holdY;
      if (!servicesInViewport() && !enteringServices) return;

      // Block all scroll during snap animation
      if (scrollLocked) { e.preventDefault(); return; }

      // Block all scroll during stage transition cooldown (fixes bleed-through bug)
      if (stageCooldown) {
        e.preventDefault();
        holdServicesPosition();
        return;
      }

      if (e.deltaY > 0) {
        if (enteringServices && !sectionSixUnlocked) {
          e.preventDefault();
          window.scrollTo(0, holdY);
          lastWindowY = holdY;
          setScrollStage(0);
          return;
        }

        if (postPmfScrollsRemaining !== null) {
          e.preventDefault();
          holdServicesPosition();
          postPmfScrollsRemaining--;

          if (postPmfScrollsRemaining <= 0) {
            postPmfScrollsRemaining = null;
            scrollLocked = true;
            sectionSixUnlocked = true;
            if (engagementSection) {
              animateScrollTo(engagementSection, SNAP_LOCK_MS);
            }
            setTimeout(() => { scrollLocked = false; }, SNAP_LOCK_MS);
          }
        } else if (scrollStageIdx < stageKeys.length - 1) {
          e.preventDefault();
          holdServicesPosition();
          setScrollStage(scrollStageIdx + 1, { clearRelease: false });
          stageCooldown = true;
          setTimeout(() => {
            stageCooldown = false;
            // Arm Section 6 release only after the final services state is fully reached.
            if (scrollStageIdx === stageKeys.length - 1) postPmfScrollsRemaining = 2;
          }, STAGE_COOLDOWN_MS);
        }
      } else if (e.deltaY < 0) {
        // Services stays "in viewport" via sticky even when user is past section 6.
        // Don't intercept upward scroll until the user has actually returned to the
        // services sticky zone (sectionSixUnlocked resets to false once scrollY < holdY).
        if (sectionSixUnlocked) return;
        postPmfScrollsRemaining = null; // cancel release gate if user scrolls back
        sectionSixUnlocked = false;
        if (scrollStageIdx > 0) {
          e.preventDefault();
          holdServicesPosition();
          setScrollStage(scrollStageIdx - 1);
          stageCooldown = true;
          setTimeout(() => { stageCooldown = false; }, STAGE_COOLDOWN_MS);
        }
        // first stage + scroll up → let scroll pass through naturally
      }
    }, { passive: false, capture: true });

    // Wire up clicks — keep scrollStageIdx in sync
    stageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = stageKeys.indexOf(btn.dataset.stage);
        if (idx !== -1) {
          setScrollStage(idx, { armRelease: !mobileServicesQuery.matches && idx === stageKeys.length - 1 });
        }
      });
    });

    // Initialize with Pre-PMF active
    setScrollStage(0);
  }

});
