/* ==========================================
   HEXA NEWS - JavaScript (BlogXton Match)
   ========================================== */
document.addEventListener('DOMContentLoaded', function () {

    // Keep category navigation consistent across every page that uses this shared script.
    const categoryPages = {
        Sports: 'sports.html',
        Health: 'health.html',
        Technology: 'technology.html'
    };
    document.querySelectorAll('a').forEach(function (link) {
        const label = link.textContent.trim();
        if (categoryPages[label]) link.setAttribute('href', categoryPages[label]);
    });

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('loaded');
        }, 800);
    });
    setTimeout(function () {
        preloader.classList.add('loaded');
    }, 3000);

    // --- Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- Mobile Menu ---
    const mainNav = document.getElementById('mainNav');
    const closeMenu = document.getElementById('closeMenu');
    const menuBtn = document.getElementById('menuBtn');

    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    function openMenu() {
        mainNav.classList.add('show-menu');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeMenuFn() {
        mainNav.classList.remove('show-menu');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (mainNav.classList.contains('show-menu')) {
                closeMenuFn();
            } else {
                openMenu();
            }
        });
    }
    if (closeMenu) {
        closeMenu.addEventListener('click', function () {
            closeMenuFn();
        });
    }
    menuOverlay.addEventListener('click', function () {
        closeMenuFn();
    });

    // Submenu toggle
    document.querySelectorAll('.main-nav > ul > li.menu-item-has-children > a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const subMenu = this.nextElementSibling;
            if (subMenu) {
                subMenu.classList.toggle('active');
            }
        });
    });

    // --- Search Sidebar ---
    var searchToggle = document.getElementById('searchToggle');
    var searchSidebar = document.getElementById('searchSidebar');
    var searchOverlaySidebar = document.getElementById('searchOverlaySidebar');
    var closeSearchSidebar = document.getElementById('closeSearchSidebar');
    var searchInput = document.getElementById('searchInput');
    var searchSuggestions = document.getElementById('searchSuggestions');
    var searchResults = document.getElementById('searchResults');

    if (searchToggle && searchSidebar) {
        searchToggle.addEventListener('click', function () {
            searchSidebar.classList.add('active');
            searchOverlaySidebar.classList.add('active');
            setTimeout(function () { searchInput.focus(); }, 400);
        });
    }
    if (closeSearchSidebar) {
        closeSearchSidebar.addEventListener('click', function () {
            searchSidebar.classList.remove('active');
            searchOverlaySidebar.classList.remove('active');
            searchInput.value = '';
            searchSuggestions.style.display = 'block';
            searchResults.classList.remove('active');
        });
    }
    if (searchOverlaySidebar) {
        searchOverlaySidebar.addEventListener('click', function () {
            searchSidebar.classList.remove('active');
            searchOverlaySidebar.classList.remove('active');
            searchInput.value = '';
            searchSuggestions.style.display = 'block';
            searchResults.classList.remove('active');
        });
    }

    // Search Input - Show/Hide Results
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            var val = this.value.trim().toLowerCase();
            if (val.length > 0) {
                searchSuggestions.style.display = 'none';
                searchResults.classList.add('active');
            } else {
                searchSuggestions.style.display = 'block';
                searchResults.classList.remove('active');
            }
        });
    }

    // Suggestion click fills input
    document.querySelectorAll('.search-suggestion-list li').forEach(function (item) {
        item.addEventListener('click', function () {
            var text = this.querySelector('span').textContent;
            searchInput.value = text;
            searchSuggestions.style.display = 'none';
            searchResults.classList.add('active');
        });
    });

    // --- Hero Slider ---
    var heroSlider = document.querySelector('.heroSlider');
    if (heroSlider) {
        new Swiper(heroSlider, {
            loop: true,
            speed: 1200,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            navigation: {
                nextEl: '.hero-next',
                prevEl: '.hero-prev',
            },
            pagination: {
                el: '.hero-pagination',
                clickable: true,
            },
        });
    }

    // --- Banner Slider 1 (per tab) ---
    document.querySelectorAll('.banner-1-slider').forEach(function (slider) {
        new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: slider.querySelector('.swiper-next-arrow'),
                prevEl: slider.querySelector('.swiper-prev-arrow'),
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
            },
        });
    });

    // --- Blog Multi List Slider ---
    const blogMultiSlider = document.querySelector('.blog-multi-list-slider');
    if (blogMultiSlider) {
        new Swiper(blogMultiSlider, {
            slidesPerView: 1,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.blog-multi-next',
                prevEl: '.blog-multi-prev',
            },
        });
    }

    // --- Author Slider ---
    const authorSlider = document.querySelector('.author-1-slider');
    if (authorSlider) {
        new Swiper(authorSlider, {
            slidesPerView: 4,
            spaceBetween: 25,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.author1-next',
                prevEl: '.author1-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            },
        });
    }

    // --- Category Slider ---
    const categorySlider = document.querySelector('.category-1-slider');
    if (categorySlider) {
        new Swiper(categorySlider, {
            slidesPerView: 4,
            spaceBetween: 25,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.category1-next',
                prevEl: '.category1-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            },
        });
    }

    // --- Recent Post Slider ---
    const recentSlider = document.querySelector('.recent-1-slider');
    if (recentSlider) {
        new Swiper(recentSlider, {
            slidesPerView: 4,
            spaceBetween: 25,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.recent1-next',
                prevEl: '.recent1-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            },
        });
    }

    // --- Back to Top ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Fade Up Animations ---
    const fadeEls = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    fadeEls.forEach(function (el) { observer.observe(el); });

    // --- Hero 2 Slider (if present on other pages) ---
    const hero2Slider = document.querySelector('.hero2Slider');
    if (hero2Slider) {
        new Swiper(hero2Slider, {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            pagination: {
                el: '.hero-pagination',
                clickable: true,
            },
        });
    }

    // --- Video Play Button ---
    document.querySelectorAll('.video-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var videoId = this.getAttribute('data-video');
            if (videoId) {
                var modal = document.createElement('div');
                modal.className = 'modal-video';
                modal.innerHTML = '<div class="modal-video-movie-wrap"><iframe width="100%" height="500" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe></div>';
                document.body.appendChild(modal);
                setTimeout(function () { modal.classList.add('active'); }, 10);
                modal.addEventListener('click', function (ev) {
                    if (ev.target === modal) {
                        modal.classList.remove('active');
                        setTimeout(function () { modal.remove(); }, 300);
                    }
                });
            }
        });
    });

    // --- Banner Slide Text Animation ---
    document.querySelectorAll('.banner-1-slider').forEach(function (slider) {
        var swiperInstance = slider.swiper;
        if (swiperInstance) {
            swiperInstance.on('slideChange', function () {
                var activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
                if (activeSlide) {
                    var headings = activeSlide.querySelectorAll('h1, h2, h4, span');
                    var btns = activeSlide.querySelectorAll('.eg-btn, p');
                    headings.forEach(function (el) {
                        el.style.animation = 'none';
                        el.offsetHeight;
                        el.style.animation = 'fadeInDown 1.7s ease forwards';
                    });
                    btns.forEach(function (el) {
                        el.style.animation = 'none';
                        el.offsetHeight;
                        el.style.animation = 'fadeInUp 1.7s ease forwards';
                    });
                }
            });
        }
    });

    // --- Fade Up Staggered ---
    var fadeUpEls = document.querySelectorAll('.fade-up-stagger');
    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var children = entry.target.querySelectorAll('.fade-up');
                children.forEach(function (child, i) {
                    setTimeout(function () {
                        child.classList.add('visible');
                    }, i * 100);
                });
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeUpEls.forEach(function (el) { fadeObserver.observe(el); });

});
