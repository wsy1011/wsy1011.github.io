        const publications = window.siteData.publications;
        const awards = window.siteData.awards;
        const quickLinks = window.siteData.links || [];

        document.addEventListener("DOMContentLoaded", function() {
            const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[char]));
            const isWithheldTitle = (publication) => publication.status === 'Under Review';
            const displayPublicationTitle = (publication) => isWithheldTitle(publication) ? 'Title withheld during peer review' : publication.title;

            const heroQuote = document.getElementById('hero-quote');
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (heroQuote && !reduceMotion) {
                const words = heroQuote.innerText.trim().split(/\s+/);
                heroQuote.innerHTML = words.map((word, index) => (
                    `<span class="quote-word" style="--word-index: ${index}">${escapeHtml(word)}${index === words.length - 1 ? '' : '&nbsp;'}</span>`
                )).join('');
            }

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
                    const displayTitle = displayPublicationTitle(pub);
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
                            <h3 class="text-2xl md:text-3xl font-bold leading-tight mb-4 tracking-tight text-gray-900 text-left">${displayTitle}</h3>
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
                    li.className = `award-card flex-none w-[280px] md:w-[340px] h-[460px] md:h-[500px] snap-center reveal-scale delay-${(i+1)*100} flex flex-col justify-between`;
                    li.innerHTML = `<div><div class="award-icon mb-8"><i class="fas ${a.icon} text-lg"></i></div><div class="text-left"><h4 class="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">${a.title}</h4></div></div><div class="text-left"><p class="text-sm text-gray-500 font-medium mt-3">${a.detail}</p><p class="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mt-2">${a.issuer}</p></div>`;
                    al.appendChild(li);
                });
            }

            // Render quick links
            const quickLinksGroups = document.getElementById('quick-links-groups');
            if (quickLinksGroups && quickLinks.length) {
                const accents = ['#0071e3', '#34c759', '#ff9f0a', '#af52de', '#ff375f', '#30b0c7'];
                const groupedLinks = quickLinks.reduce((groups, link) => {
                    const groupName = link.group || 'Links';
                    if (!groups.has(groupName)) groups.set(groupName, []);
                    groups.get(groupName).push(link);
                    return groups;
                }, new Map());

                groupedLinks.forEach((links, groupName) => {
                    const groupEl = document.createElement('section');
                    groupEl.className = 'quick-links-group reveal';

                    const category = links[0]?.category || 'Links';
                    const headerEl = document.createElement('div');
                    headerEl.className = 'mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between';
                    headerEl.innerHTML = `
                        <div>
                            <p class="text-[11px] font-bold text-gray-400 mb-3 tracking-[0.12em] uppercase">${escapeHtml(category)}</p>
                            <h3 class="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">${escapeHtml(groupName)}</h3>
                        </div>
                    `;

                    const gridEl = document.createElement('div');
                    gridEl.className = 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3';

                    links.forEach((link, index) => {
                        const card = document.createElement('article');
                        const accent = accents[index % accents.length];
                        card.className = 'quick-link-card reveal-scale flex flex-col justify-between p-6';
                        card.style.setProperty('--link-accent', accent);

                        const tags = (link.tags || '')
                            .split(/[;,]/)
                            .map((tag) => tag.trim())
                            .filter(Boolean)
                            .slice(0, 3);
                        const tagsHtml = tags
                            .map((tag) => `<span class="quick-link-tag">${escapeHtml(tag)}</span>`)
                            .join('');

                        card.innerHTML = `
                            <div>
                                <div class="mb-5 flex items-center justify-between gap-4">
                                    <span class="quick-link-badge">${escapeHtml(link.shortTitle)}</span>
                                </div>
                                <h4 class="text-xl font-bold leading-tight tracking-tight text-gray-900">${escapeHtml(link.title)}</h4>
                                <p class="mt-3 text-sm font-medium leading-relaxed text-gray-500">${escapeHtml(link.description)}</p>
                                <div class="mt-5 flex flex-wrap gap-2">${tagsHtml}</div>
                            </div>
                            <div class="mt-7 grid grid-cols-2 gap-2">
                                <a href="${escapeHtml(link.homepageUrl)}" target="_blank" rel="noopener noreferrer" class="quick-link-action primary" aria-label="Open homepage for ${escapeHtml(link.title)}">
                                    Homepage <i class="fas fa-up-right-from-square text-[11px]" aria-hidden="true"></i>
                                </a>
                                <a href="${escapeHtml(link.submissionUrl)}" target="_blank" rel="noopener noreferrer" class="quick-link-action secondary" aria-label="Open submission system for ${escapeHtml(link.title)}">
                                    Submission <i class="fas fa-paper-plane text-[11px]" aria-hidden="true"></i>
                                </a>
                            </div>
                        `;
                        gridEl.appendChild(card);
                    });

                    groupEl.appendChild(headerEl);
                    groupEl.appendChild(gridEl);
                    quickLinksGroups.appendChild(groupEl);
                });
            }

            // GitHub recent 30-day contributions
            const renderGitHubContributions = async () => {
                const username = 'wsy1011';
                const calendarEl = document.getElementById('github-calendar');
                const rangeLabelEl = document.getElementById('github-range-label');
                const statusEl = document.getElementById('github-status');
                if (!calendarEl || !rangeLabelEl || !statusEl) return;

                const today = new Date();
                const rangeStart = new Date(today);
                rangeStart.setDate(today.getDate() - 29);
                const formatDate = (date) => {
                    const y = date.getFullYear();
                    const m = String(date.getMonth() + 1).padStart(2, '0');
                    const d = String(date.getDate()).padStart(2, '0');
                    return `${y}-${m}-${d}`;
                };
                const formatShortDate = (dateString) => {
                    const [y, m, d] = dateString.split('-').map(Number);
                    return new Date(y, m - 1, d).toLocaleString('en-US', { month: 'short', day: 'numeric' });
                };
                const todayKey = formatDate(today);
                const rangeStartKey = formatDate(rangeStart);
                const rangeDates = Array.from({ length: 30 }, (_, index) => {
                    const date = new Date(rangeStart);
                    date.setDate(rangeStart.getDate() + index);
                    return formatDate(date);
                });
                const yearsToFetch = [...new Set(rangeDates.map((date) => date.slice(0, 4)))];

                rangeLabelEl.innerText = `${formatShortDate(rangeStartKey)} to ${formatShortDate(todayKey)} contribution activity from the public GitHub calendar.`;
                calendarEl.innerHTML = '';

                const setLoadingGrid = () => {
                    for (let day = 0; day < 30; day += 1) {
                        const cell = document.createElement('span');
                        cell.className = 'github-day github-level-0';
                        cell.setAttribute('aria-hidden', 'true');
                        calendarEl.appendChild(cell);
                    }
                };
                setLoadingGrid();

                const normalizeContributions = (payload) => {
                    if (Array.isArray(payload?.contributions)) return payload.contributions;
                    if (Array.isArray(payload?.contributionsByDate)) return payload.contributionsByDate;
                    if (Array.isArray(payload?.data?.contributions)) return payload.data.contributions;
                    return [];
                };

                try {
                    let contributions = [];
                    for (const year of yearsToFetch) {
                        const endpoints = [
                            `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
                            `https://github-contributions.vercel.app/api/v1/${username}`
                        ];
                        for (const endpoint of endpoints) {
                            const response = await fetch(endpoint, { cache: 'no-store' });
                            if (!response.ok) continue;
                            const payload = await response.json();
                            const yearlyContributions = normalizeContributions(payload);
                            if (yearlyContributions.length) {
                                contributions = contributions.concat(yearlyContributions);
                                break;
                            }
                        }
                    }

                    const rangeData = contributions
                        .filter((item) => item.date && item.date >= rangeStartKey && item.date <= todayKey)
                        .map((item) => ({
                            date: item.date,
                            count: Number(item.count ?? item.contributionCount ?? 0),
                            level: Number(item.level ?? item.intensity ?? 0)
                        }));
                    const byDate = new Map(rangeData.map((item) => [item.date, item]));
                    statusEl.innerText = `Updated from GitHub public contribution data for ${username}.`;

                    calendarEl.innerHTML = '';
                    rangeDates.forEach((key) => {
                        const item = byDate.get(key) || { count: 0, level: 0 };
                        const cell = document.createElement('span');
                        const level = Math.max(0, Math.min(4, item.level || (item.count > 0 ? 1 : 0)));
                        cell.className = `github-day github-level-${level}`;
                        cell.title = `${formatShortDate(key)}: ${item.count} contributions`;
                        cell.setAttribute('aria-label', cell.title);
                        calendarEl.appendChild(cell);
                    });
                } catch (error) {
                    statusEl.innerText = 'Unable to load GitHub contributions right now. Open the profile link for the live calendar.';
                    console.warn('GitHub contribution loading failed:', error);
                }
            };
            renderGitHubContributions();

            // 弹窗逻辑
            const modal = document.getElementById('pub-modal-overlay');
            const absSec = document.getElementById('modal-abstract-section');
            const citSec = document.getElementById('modal-citation-section');
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
                const modalTitle = document.getElementById('modal-title');
                modalTitle.innerText = displayPublicationTitle(pub);
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
            const setup = (tid, l, r, amount = 360) => {
                const track = document.getElementById(tid);
                const left = document.getElementById(l);
                const right = document.getElementById(r);
                if(!track || !left || !right) return;
                const updateButtons = () => {
                    const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);
                    const atStart = track.scrollLeft <= 2;
                    const atEnd = track.scrollLeft >= maxScroll - 2;
                    left.classList.toggle('is-hidden', atStart || maxScroll <= 2);
                    right.classList.toggle('is-hidden', atEnd || maxScroll <= 2);
                };
                left.addEventListener('click', () => track.scrollBy({left: -amount, behavior: 'smooth'}));
                right.addEventListener('click', () => track.scrollBy({left: amount, behavior: 'smooth'}));
                track.addEventListener('scroll', () => window.requestAnimationFrame(updateButtons), { passive: true });
                window.addEventListener('resize', updateButtons);
                window.setTimeout(updateButtons, 0);
                window.setTimeout(updateButtons, 450);
            };
            setup('pub-carousel-track', 'pub-scroll-left', 'pub-scroll-right', 360);
            setup('awards-list', 'awards-scroll-left', 'awards-scroll-right', 360);
            setup('photo-carousel-track', 'photo-scroll-left', 'photo-scroll-right', 480);

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
                    photoModalImage.src = img.getAttribute('data-full-src') || img.getAttribute('src');
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

