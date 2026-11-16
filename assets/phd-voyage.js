(() => {
    const card = document.querySelector('#phd-voyage .phd-progress-card');
    if (!card) return;

    // Calendar days avoid daylight-saving offsets and update for the visitor's date.
    const start = Date.parse(`${card.dataset.start}T00:00:00Z`);
    const end = Date.parse(`${card.dataset.end}T00:00:00Z`);
    const day = 86400000;
    const totalDays = (end - start) / day;
    const endLabel = new Date(end).toLocaleDateString('en-US', {
        month: 'short', year: 'numeric', timeZone: 'UTC'
    });
    const formatDays = count => `${count.toLocaleString('en-US')} ${count === 1 ? 'day' : 'days'}`;

    const updateProgress = () => {
        const now = new Date();
        const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        const elapsed = Math.max(0, Math.min(totalDays, (today - start) / day));
        const remaining = Math.max(0, (end - today) / day);
        const percent = elapsed / totalDays * 100;
        const displayPercent = percent.toFixed(1);
        card.dataset.progressStatus = elapsed === 0 ? 'waiting' : percent >= 100 ? 'complete' : 'active';

        document.getElementById('phd-progress-percent').textContent = `${displayPercent}%`;
        document.getElementById('phd-progress-fill').style.width = `${percent}%`;
        const bar = document.getElementById('phd-progress-bar');
        bar.setAttribute('aria-valuenow', displayPercent);
        bar.setAttribute('aria-valuetext', `${displayPercent}% of the planned programme elapsed`);
        document.getElementById('phd-progress-elapsed').textContent = `${formatDays(elapsed)} elapsed`;
        document.getElementById('phd-progress-remaining').textContent = `${formatDays(remaining)} to ${endLabel}`;

        if (today < start) {
            document.getElementById('phd-progress-remaining').textContent = `Starts in ${formatDays((start - today) / day)}`;
        } else if (today >= end) {
            document.getElementById('phd-progress-remaining').textContent = 'Planned programme period elapsed';
        }
    };

    updateProgress();
    window.setInterval(updateProgress, 60000);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) updateProgress();
    });
})();
