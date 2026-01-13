// script.js - Controls 3D parallax scene, mobile nav, smooth scroll, form submit, accordion
document.addEventListener('DOMContentLoaded', function () {
    // Year update
    for (var i = 1; i <= 6; i++) { var y = document.getElementById('year' + (i === 1 ? '' + '' : i)); if (y) y.textContent = new Date().getFullYear(); }

    // Nav toggle
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); var target = document.querySelector(this.getAttribute('href')); if (target) target.scrollIntoView({ behavior: 'smooth' }); }); });

    // Accordion
    document.querySelectorAll('.acc-toggle').forEach(function (btn) { btn.addEventListener('click', function () { var expanded = this.getAttribute('aria-expanded') === 'true'; this.setAttribute('aria-expanded', !expanded); var panel = this.nextElementSibling; if (panel) { panel.style.display = expanded ? 'none' : 'block' } }) });

    // 3D parallax scene: pointer + scroll
    var scene = document.getElementById('scene');
    if (scene) {
        var layers = scene.querySelectorAll('.layer');
        var mouseX = 0, mouseY = 0;
        var scrollY = 0;
        var ticking = false;

        window.addEventListener('mousemove', function (e) {
            var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
            mouseX = (e.clientX - cx) / cx;
            mouseY = (e.clientY - cy) / cy;
            requestTick();
        });

        window.addEventListener('scroll', function () {
            scrollY = window.pageYOffset;
            requestTick();
        }, { passive: true });

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        function updateParallax() {
            layers.forEach(function (layer) {
                var depth = parseFloat(layer.getAttribute('data-depth')) || 0;
                var tx = mouseX * depth * 20;
                var ty = mouseY * depth * 20;
                var sy = scrollY * depth * -0.15;
                layer.style.transform = 'translate3d(' + tx + 'px, ' + (ty + sy) + 'px, 0)';
            });
            ticking = false;
        }
    }

    // Contact form submit (AJAX to Formspree) with graceful fallback
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            var status = document.getElementById('formStatus');
            var data = new FormData(form);
            status.textContent = 'Sending...';
            fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } }).then(function (response) {
                if (response.ok) { status.textContent = 'Thanks — we will contact you soon.'; form.reset() } else { response.json().then(function (r) { status.textContent = r.error || 'Submission failed. Please try again.' }) }
            }).catch(function () { status.textContent = 'Submission failed. Please try again.' });
        });
    }

    // Project detail rendering: simple client-side router based on query string 'slug'
    if (document.getElementById('case')) {
        var projects = {
            'greenfield': {
                title: 'Greenfield Highway Upgrade — Hyderabad', timeline: 'Jan 2024 – Mar 2025', scope: '12 km rehabilitation, pavement replacement, LED corridor lighting, drainage upgrade.',
                challenge: 'Aging pavement causing congestion and flooding during monsoon.',
                solution: 'Full-depth pavement replacement, new drainage trenches, and intelligent lighting controls to reduce maintenance.',
                outcome: 'Travel time down 20%, 40% reduction in water pooling incidents.',
                images: [
                    'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1526403224744-9a7b1f8f3f49?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1542317854-7b1b2fa0a4d8?q=80&w=1200&auto=format&fit=crop'
                ]
            },
            'riverside-plaza': { title: 'Riverside Commercial Plaza', timeline: 'Sep 2023 – Jun 2024', scope: '3-level commercial complex with podium parking', challenge: 'Tight site and logistics', solution: 'Just-in-time deliveries and modular precast', outcome: 'On-time handover', images: [] },
            'sewer-interceptor': { title: 'West End Sewage Interceptor', timeline: 'Mar 2023 – Dec 2023', scope: '1.3 km interceptor with pump stations', challenge: 'River crossing requirements', solution: 'Microtunneling and staged works', outcome: 'Improved conveyance', images: [] }
        };
        var params = new URLSearchParams(window.location.search); var slug = params.get('slug') || 'greenfield'; var p = projects[slug] || projects['greenfield'];
        var html = '<h1>' + p.title + '</h1><p class="muted">' + p.timeline + '</p><h3>Scope</h3><p>' + p.scope + '</p><h3>Challenge</h3><p>' + p.challenge + '</p><h3>Solution</h3><p>' + p.solution + '</p><h3>Outcome</h3><p>' + p.outcome + '</p>';
        if (p.images && p.images.length) { html += '<div class="project-images">'; p.images.forEach(function (src) { html += '<img src="' + src + '" alt="' + p.title + ' image" loading="lazy" style="max-width:100%;margin:8px 0;border-radius:8px">' }); html += '</div>'; }
        document.getElementById('case').innerHTML = html;
    }

    // Accessibility: ensure focus outline visible when using keyboard
    function handleFirstTab(e) { if (e.key === 'Tab') { document.body.classList.add('user-is-tabbing'); window.removeEventListener('keydown', handleFirstTab); } }
    window.addEventListener('keydown', handleFirstTab);

});
