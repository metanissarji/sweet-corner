// בדיקת עדכון גרסה — מונע ממכשירים (בעיקר Safari בטלפון) להיתקע על גרסה ישנה
// שנשמרה בזיכרון המטמון. כשעולה גרסה חדשה — האתר מתרענן אוטומטית.

function currentBundle() {
  const s = document.querySelector('script[type="module"][src*="/assets/index-"]');
  return s ? s.getAttribute('src') : null;
}

let checking = false;
async function checkForUpdate() {
  if (checking) return;
  checking = true;
  try {
    const res = await fetch('/?_v=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const html = await res.text();
      const m = html.match(/\/assets\/index-[A-Za-z0-9_-]+\.js/);
      const latest = m ? m[0] : null;
      const current = currentBundle();
      if (latest && current && current !== latest) {
        window.location.reload();
        return;
      }
    }
  } catch {
    /* אופליין / נתעלם */
  }
  checking = false;
}

export function initAutoUpdate() {
  // כשחוזרים ללשונית (למשל פתיחת טאב מהרקע ב-Safari)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') checkForUpdate();
  });
  // כשהעמוד משוחזר מזיכרון ה-bfcache של הדפדפן
  window.addEventListener('pageshow', (e) => { if (e.persisted) checkForUpdate(); });
}
