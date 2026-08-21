import { useEffect, useMemo, useRef, useState } from 'react';

type ModalTrigger = HTMLElement | null;

const CONFIG = {
  contractAddress: 'WERKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpump',
  buyUrl: '#',
  chartUrl: '#',
  joinUrl: '#',
  tickerDurationSeconds: 18,
};

const candleHeights = [22, 34, 28, 46, 40, 58, 50, 72, 64, 86, 78, 60, 92, 104, 96, 120, 112, 134];

const tickerText = 'YOU BETTER $WERK';

function App() {
  const [wpOpen, setWpOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastFocusRef = useRef<ModalTrigger>(null);
  const timerRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const tickerItems = useMemo(() => Array.from({ length: 16 }, () => tickerText), []);

  const closeModal = () => {
    setWpOpen(false);
    document.body.style.overflow = '';
    if (lastFocusRef.current && typeof lastFocusRef.current.focus === 'function') {
      requestAnimationFrame(() => lastFocusRef.current?.focus());
    }
  };

  const openModal = (trigger: ModalTrigger) => {
    lastFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : trigger;
    setWpOpen(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButtonRef.current?.focus());
  };

  useEffect(() => {
    const handleDocumentKeydown = (event: KeyboardEvent) => {
      if (!wpOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleDocumentKeydown, true);

    return () => {
      document.removeEventListener('keydown', handleDocumentKeydown, true);
      document.body.style.overflow = '';
    };
  }, [wpOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONFIG.contractAddress);
      }
    } catch {
      // no-op fallback for unsupported browsers
    }

    setCopied(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="page-shell">
      <nav className="top-nav" aria-label="Main navigation">
        <div className="nav-inner">
          <div className="wordmark" aria-label="WERK home">$WERK</div>
          <div className="nav-links">
            <button
              type="button"
              className="nav-link whitepaper-trigger"
              onClick={(event) => {
                event.preventDefault();
                openModal(event.currentTarget);
              }}
            >
              WHITEPAPER
            </button>
            <a className="nav-cta" href={CONFIG.joinUrl}>
              GET TO WERK
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="candle-backdrop" aria-hidden="true">
            {candleHeights.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className={`candle-bar ${index % 4 === 2 ? 'pink' : ''}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <div className="hero-copy">
            <div id="hero-title" className="hero-wordmark">$WERK</div>
            <p className="hero-tagline">
              We don't just make money.<br />
              <span>We make money moves.</span>
            </p>

            <div className="hero-buttons">
              <a className="button primary" href={CONFIG.buyUrl}>
                BUY $WERK
              </a>
              <a className="button secondary" href={CONFIG.chartUrl}>
                CHART
              </a>
            </div>

            <button type="button" className="contract-button" onClick={handleCopy} aria-live="polite">
              {copied ? 'COPIED!' : `CA: ${CONFIG.contractAddress}`}
            </button>
          </div>

          <div className="hero-art">
            <picture>
              <source srcSet="/assets/mascot-crown.webp" type="image/webp" />
              <img
                className="mascot hero-mascot"
                src="/assets/mascot-crown.png"
                alt="$WERK mascot"
                width={400}
                height={600}
              />
            </picture>
          </div>
        </section>

        <div className="ticker-band" aria-label="Ticker">
          <div
            className="ticker-track"
            style={{ animationDuration: `${CONFIG.tickerDurationSeconds}s` }}
          >
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="ticker-item">
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="mission section-shell" aria-labelledby="mission-heading">
          <div className="mission-copy">
            <div className="eyebrow">Our mission</div>
            <h2 id="mission-heading" className="mission-heading">
              Green candles only
            </h2>
            <p>
              ser. it's a bird in a suit shaking cake for the culture. he doesn't read charts, he IS the chart. every candle is just him hitting it at a different speed and angles. this is the most bullish thing you will see all week and deep down you know it.
            </p>
            <p>
              utility? the utility is you laughing. roadmap? cheeks up and to the right. your favorite coin has a whitepaper. ours has a dress code. the bird clocks in at 10:20am sharp and twerks until close. NFA. but also… look at him.
            </p>

            <div className="stats" aria-label="Key stats">
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">DANCE FLOOR HOURS</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">sure</div>
                <div className="stat-label">LP BURNED</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">∞</div>
                <div className="stat-label">TWERKS / DAY</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">DAYS SINCE INCIDENT</div>
              </div>
            </div>
          </div>

          <div className="mission-art">
            <div className="cubicle-scene">
              <div className="cubicle-panel cubicle-panel-left" aria-hidden="true" />
              <div className="cubicle-panel cubicle-panel-right" aria-hidden="true" />
              <div className="cubicle-monitor" aria-hidden="true">
                <span>$WERK</span>
              </div>
              <div className="cubicle-keyboard" aria-hidden="true" />
              <div className="cubicle-cup" aria-hidden="true">CAFE</div>
              <div className="cubicle-note">ON THE CLOCK</div>
              <picture>
                <source srcSet="/assets/mascot-thug.webp" type="image/webp" />
                <img
                  className="mascot mission-mascot"
                  src="/assets/mascot-thug.png"
                  alt="$WERK mascot dancing in a cubicle"
                  width={420}
                  height={447}
                />
              </picture>
            </div>
          </div>
        </section>
      </main>

      {wpOpen && (
        <div
          ref={modalRef}
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="$WERK whitepaper"
          tabIndex={-1}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="modal-card" role="document">
            <div className="modal-kicker">$WERK OFFICIAL WHITEPAPER — V1.0 — PAGE 1 OF 1</div>
            <div className="modal-punchline">YOU SERIOUS RN?</div>
            <div className="modal-body">
              you wanna read a whitepaper for a twerking ostrich?<br />
              the bird is the thesis.
            </div>
            <div className="modal-hint">[ tap anywhere to return to making money moves ]</div>
            <button
              ref={closeButtonRef}
              type="button"
              className="modal-close"
              onClick={closeModal}
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-wordmark">$WERK</div>
        <div className="footer-disclaimer">
          $WERK is a meme coin with no intrinsic value or expectation of financial return. For entertainment purposes only. The bird is not a financial advisor.
        </div>
      </footer>
    </div>
  );
}

export default App;
