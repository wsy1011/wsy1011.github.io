        const publications = window.siteData.publications;
        const awards = window.siteData.awards;

        document.addEventListener("DOMContentLoaded", function() {
            // GIF 重播
            const avContainer = document.getElementById('avatar-container');
            if (avContainer) {
                avContainer.addEventListener('mouseenter', () => {
                    const avImg = document.getElementById('avatar-gif');
                    if (avImg) { const base = avImg.src.split('?')[0]; avImg.src = base + "?t=" + Date.now(); }
                });
            }

            // 渲染论文卡片
            const pubTrack = document.getElementById('pub-carousel-track');
            if (pubTrack) {
                const statusStyles = {
                    "Working Paper": { card: "card-working-paper", text: "text-blue-500", bg: "bg-blue-500" },
                    "Under Review": { card: "card-under-review", text: "text-amber-500", bg: "bg-amber-500" },
                    "Thesis": { card: "card-thesis", text: "text-teal-600", bg: "bg-teal-500" },
                    "Published": { card: "card-published", text: "text-emerald-500", bg: "bg-emerald-500" }
                };
                publications.forEach(pub => {
                    const card = document.createElement('div');
                    const style = statusStyles[pub.status] || statusStyles.Published;
                    const statusClass = style.card;
                    card.className = `pub-card-custom ${statusClass} flex-none w-[280px] md:w-[340px] h-[460px] md:h-[500px] snap-center flex flex-col justify-between reveal-scale cursor-pointer`;
                    card.dataset.id = pub.id;
                    
                    const dotColor = style.text;
                    const btnColor = style.bg;
                    const dotBg = style.bg;
                    const statusTag = `<span class="${dotColor} inline-flex items-center font-bold tracking-tight text-[11px] md:text-xs uppercase"><span class="${dotBg} mr-1.5 h-2 w-2 rounded-full"></span>${pub.status}</span>`;
                    const typeTag = `<span class="text-gray-500 font-bold tracking-tight text-[11px] md:text-xs uppercase">${pub.articleType}</span>`;
                    const authorList = pub.authors.split(/[,;]/).map((name) => name.trim()).filter(Boolean);
                    const authorSummary = authorList.length > 1 ? `${authorList[0].replace(/\*/g, '')} et al.` : authorList[0].replace(/\*/g, '');

                    card.innerHTML = `
                        <div class="relative z-10">
                            <p class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">${statusTag}${typeTag}</p>
                            <h3 class="text-2xl md:text-3xl font-bold leading-tight mb-4 tracking-tight text-gray-900 text-left">${pub.title}</h3>
                        </div>
                        <div class="relative z-10 flex justify-between items-end">
                            <div class="max-w-[75%] text-left">
                                <p class="text-sm text-gray-500 font-medium mb-1 line-clamp-1">${authorSummary}</p>
                                <p class="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                                    ${pub.journalShort} · ${pub.date}
                                </p>
                            </div>
                            <button class="open-modal-btn w-10 h-10 rounded-full ${btnColor} text-white flex items-center justify-center hover:opacity-80 transition-all shadow-sm" data-id="${pub.id}">
                                <i class="fas fa-plus text-sm"></i>
                            </button>
                        </div>
                    `;
                    pubTrack.appendChild(card);
                });
            }

            // 渲染奖项 (Hohai University)
            const al = document.getElementById('awards-list');
            if (al) {
                awards.forEach((a, i) => {
                    const li = document.createElement('li');
                    li.className = `award-card reveal-scale delay-${(i+1)*100}`;
                    li.innerHTML = `<div class="award-icon mb-5"><i class="fas ${a.icon} text-lg"></i></div><div class="text-left"><h4 class="text-xl font-bold text-gray-900 leading-tight">${a.title}</h4><p class="text-gray-500 text-sm mt-3">${a.detail}</p><p class="text-gray-400 text-sm mt-2">${a.issuer}</p></div>`;
                    al.appendChild(li);
                });
            }

            // 弹窗逻辑
            const modal = document.getElementById('pub-modal-overlay');
            const absSec = document.getElementById('modal-abstract-section');
            const citSec = document.getElementById('modal-citation-section');
            const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[char]));
            const highlightSuyang = (authors) => escapeHtml(authors).replace(/Suyang Wang/g, '<strong class="font-bold text-[#0071E3]">Suyang Wang</strong>');
            const getAuthorRoles = (authors) => {
                const parts = authors.split(/[,;]/).map((name) => name.trim()).filter(Boolean);
                return {
                    firstAuthor: parts.some((name, index) => index === 0 && name.replace(/\*/g, '') === 'Suyang Wang'),
                    correspondingAuthor: parts.some((name) => name === 'Suyang Wang*'),
                    supervisorFirstAuthor: parts.some((name, index) => index === 0 && name.replace(/\*/g, '') === 'Xuejun Feng')
                };
            };
            const renderAuthorTags = (authors) => {
                const roles = getAuthorRoles(authors);
                const tags = [];
                if (roles.firstAuthor) tags.push('First Author');
                if (roles.correspondingAuthor) tags.push('Corresponding Author');
                if (roles.supervisorFirstAuthor) tags.push('Supervisor First Author');
                return tags.map((tag) => `<span class="inline-flex items-center rounded-full bg-[#EAF3FF] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0071E3]">${tag}</span>`).join('');
            };
            const openPublicationModal = (id) => {
                const pub = publications.find(p => p.id == id);
                if(!pub) return;
                document.getElementById('modal-journal-meta').innerText = `${pub.journalFull} · ${pub.date}`;
                document.getElementById('modal-title').innerText = pub.title;
                document.getElementById('modal-author-tags').innerHTML = renderAuthorTags(pub.authors);
                document.getElementById('modal-authors').innerHTML = highlightSuyang(pub.authors);
                document.getElementById('modal-keywords').innerText = pub.keywords;
                const hasAbstract = Boolean(pub.abstract);
                const hasCitation = Boolean(pub.citation);
                absSec.style.display = hasAbstract ? 'block' : 'none';
                citSec.style.display = hasCitation ? 'block' : 'none';
                if (hasAbstract) {
                    document.getElementById('modal-abstract').innerText = pub.abstract;
                }
                if (hasCitation) {
                    document.getElementById('modal-citation').innerText = pub.citation;
                }
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
            document.addEventListener('click', e => {
                const btn = e.target.closest('.open-modal-btn');
                const card = e.target.closest('.pub-card-custom');
                if (btn) {
                    e.stopPropagation();
                    openPublicationModal(btn.dataset.id);
                    return;
                }
                if (card) openPublicationModal(card.dataset.id);
            });

            const close = () => { if(modal) modal.classList.remove('active'); document.body.style.overflow = ''; };
            const closeBtn = document.getElementById('close-modal');
            if (closeBtn) closeBtn.addEventListener('click', close);
            if (modal) modal.addEventListener('click', (e) => { if(e.target === modal) close(); });

            // Non-linear navigation scrolling
            const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
            const animateScrollTo = (targetY, duration = 900) => {
                const startY = window.scrollY;
                const distance = targetY - startY;
                const startTime = performance.now();
                const step = (now) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    window.scrollTo(0, startY + distance * easeOutExpo(progress));
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            };
            document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
                link.addEventListener('click', (event) => {
                    const hash = link.getAttribute('href');
                    const target = hash === '#' ? document.body : document.querySelector(hash);
                    if (!target) return;
                    event.preventDefault();
                    const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                    const targetY = hash === '#'
                        ? 0
                        : target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
                    animateScrollTo(Math.max(targetY, 0));
                    history.pushState(null, '', hash);
                });
            });

            // 滚动控制
            const setup = (tid, l, r) => {
                const t = document.getElementById(tid);
                const lb = document.getElementById(l);
                const rb = document.getElementById(r);
                if(!t || !lb || !rb) return;
                lb.addEventListener('click', () => t.scrollBy({left: -360, behavior: 'smooth'}));
                rb.addEventListener('click', () => t.scrollBy({left: 360, behavior: 'smooth'}));
            };
            setup('pub-carousel-track', 'pub-scroll-left', 'pub-scroll-right');
            const setupPhoto = (tid, l, r) => {
                const t = document.getElementById(tid);
                const lb = document.getElementById(l);
                const rb = document.getElementById(r);
                if(!t || !lb || !rb) return;
                lb.onclick = () => t.scrollBy({left: -480, behavior: 'smooth'});
                rb.onclick = () => t.scrollBy({left: 480, behavior: 'smooth'});
            };
            setupPhoto('photo-carousel-track', 'photo-scroll-left', 'photo-scroll-right');

            const photoModal = document.getElementById('photo-modal-overlay');
            const photoModalImage = document.getElementById('photo-modal-image');
            const photoModalTitle = document.getElementById('photo-modal-title');
            const closePhotoModal = () => {
                if (!photoModal) return;
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            };
            document.querySelectorAll('.photo-card').forEach((card) => {
                card.addEventListener('click', () => {
                    const img = card.querySelector('img');
                    const title = card.querySelector('span')?.innerText || '';
                    if (!img || !photoModalImage || !photoModalTitle || !photoModal) return;
                    photoModalImage.src = img.getAttribute('src');
                    photoModalImage.alt = img.getAttribute('alt') || title;
                    photoModalTitle.innerText = title;
                    photoModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            document.getElementById('close-photo-modal')?.addEventListener('click', closePhotoModal);
            if (photoModal) photoModal.addEventListener('click', (event) => {
                if (event.target === photoModal) closePhotoModal();
            });

            const obs = new IntersectionObserver(es => {
                es.forEach(e => { if(e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
            }, {threshold: 0.1});
            document.querySelectorAll('.reveal, .reveal-scale').forEach(el => obs.observe(el));
        });

