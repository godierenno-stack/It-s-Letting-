document.addEventListener('DOMContentLoaded', function () {
    // ===== Mobile Navigation Toggle =====
    var navToggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            nav.classList.toggle('open');
        });

        // Close nav when clicking a link
        var navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                nav.classList.remove('open');
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                nav.classList.remove('open');
            }
        });
    }

    // ===== Header Scroll Effect =====
    var header = document.getElementById('header');
    var backToTop = document.getElementById('back-to-top');

    function handleScroll() {
        var scrollY = window.scrollY;

        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ===== Back to Top =====
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Smooth Scrolling for Anchor Links =====
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Active Nav Link on Scroll =====
    var sections = document.querySelectorAll('section[id]');
    var allNavLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                allNavLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ===== Animated Counter =====
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');
    var countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'), 10);
            var current = 0;
            var increment = Math.ceil(target / 60);
            var duration = 1500;
            var stepTime = duration / (target / increment);

            function updateCounter() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    setTimeout(updateCounter, stepTime);
                }
            }

            updateCounter();
        });
    }

    function checkCounters() {
        if (countersStarted) return;

        var heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        var rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersStarted = true;
            animateCounters();
        }
    }

    window.addEventListener('scroll', checkCounters);
    checkCounters();

    // ===== Scroll Animations (Intersection Observer) =====
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.addEventListener('animationend', function handler() {
                    entry.target.classList.remove('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = '';
                    entry.target.removeEventListener('animationend', handler);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    var animateElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .testimonial-card, .contact-item, .about-feature'
    );
    animateElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // ===== Contact Form Validation =====
    var form = document.getElementById('contact-form');

    if (form) {
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var subjectInput = document.getElementById('subject');
        var messageInput = document.getElementById('message');
        var formStatus = document.getElementById('form-status');

        function showError(input, errorId, message) {
            input.classList.add('error');
            var errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.textContent = message;
            }
        }

        function clearError(input, errorId) {
            input.classList.remove('error');
            var errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.textContent = '';
            }
        }

        function validateEmail(email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validateForm() {
            var isValid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, 'name-error', 'Please enter your name');
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, 'name-error', 'Name must be at least 2 characters');
                isValid = false;
            } else {
                clearError(nameInput, 'name-error');
            }

            if (!emailInput.value.trim()) {
                showError(emailInput, 'email-error', 'Please enter your email');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                showError(emailInput, 'email-error', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput, 'email-error');
            }

            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'subject-error', 'Please enter a subject');
                isValid = false;
            } else {
                clearError(subjectInput, 'subject-error');
            }

            if (!messageInput.value.trim()) {
                showError(messageInput, 'message-error', 'Please enter your message');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'message-error', 'Message must be at least 10 characters');
                isValid = false;
            } else {
                clearError(messageInput, 'message-error');
            }

            return isValid;
        }

        // Real-time validation on blur
        [nameInput, emailInput, subjectInput, messageInput].forEach(function (input) {
            if (input) {
                input.addEventListener('blur', function () {
                    var errorId = input.id + '-error';
                    if (input.value.trim()) {
                        if (input.id === 'email' && !validateEmail(input.value.trim())) {
                            showError(input, errorId, 'Please enter a valid email address');
                        } else {
                            clearError(input, errorId);
                        }
                    }
                });

                input.addEventListener('input', function () {
                    if (input.classList.contains('error')) {
                        clearError(input, input.id + '-error');
                    }
                });
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                var submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span>';

                // Simulate form submission
                setTimeout(function () {
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

                    setTimeout(function () {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }, 5000);
                }, 1500);
            }
        });
    }

    // ===== Service Card Tilt Effect =====
    var serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / 20;
            var rotateY = (centerX - x) / 20;

            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});
