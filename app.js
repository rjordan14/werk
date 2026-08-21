const CONFIG = {
  contractAddress: "WERKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpump",
  buyUrl: "#",
  chartUrl: "#",
  joinUrl: "#",
};

const candleHeights = [22, 34, 28, 46, 40, 58, 50, 72, 64, 86, 78, 60, 92, 104, 96, 120, 112, 134];
const tickerItems = Array.from({ length: 16 }, () => "YOU BETTER $WERK");

const renderCandles = () => {
  const backdrop = document.querySelector(".candle-backdrop");
  if (!backdrop) return;

  const bars = candleHeights
    .map(
      (height, index) =>
        `<span class="candle-bar ${index % 4 === 2 ? "pink" : ""}" style="height:${height}%"></span>`
    )
    .join("");

  backdrop.innerHTML = bars;
};

const renderTicker = () => {
  const track = document.querySelector(".ticker-track");
  if (!track) return;

  const content = [...tickerItems, ...tickerItems]
    .map((item) => `<span class="ticker-item">${item}</span>`)
    .join("");

  track.innerHTML = content;
};

const setButtonUrls = () => {
  const buyButton = document.querySelector(".button.primary");
  const chartButton = document.querySelector(".button.secondary");
  const flockButton = document.querySelector(".nav-cta");

  if (buyButton) buyButton.href = CONFIG.buyUrl;
  if (chartButton) chartButton.href = CONFIG.chartUrl;
  if (flockButton) flockButton.href = CONFIG.joinUrl;
};

const setContractLabel = (copied = false) => {
  const button = document.querySelector("[data-copy-address]");
  if (!button) return;
  button.textContent = copied ? "COPIED!" : `CA: ${CONFIG.contractAddress}`;
};

const setModalState = (isOpen) => {
  const modal = document.getElementById("whitepaper-modal");
  if (!modal) return;

  if (isOpen) {
    modal.removeAttribute("hidden");
  } else {
    modal.setAttribute("hidden", "");
  }
  modal.style.display = isOpen ? "flex" : "none";
  document.body.style.overflow = isOpen ? "hidden" : "";
};

const focusCloseButton = () => {
  const closeButton = document.querySelector("[data-close-modal]");
  if (closeButton) closeButton.focus();
};

let lastFocusedElement = null;
let copyTimer = null;
let modalOpen = false;

const openModal = (trigger) => {
  if (modalOpen) return;

  lastFocusedElement = document.activeElement && document.activeElement !== document.body ? document.activeElement : trigger || null;
  modalOpen = true;
  setModalState(true);

  requestAnimationFrame(() => {
    focusCloseButton();
  });
};

const closeModal = () => {
  if (!modalOpen) return;

  modalOpen = false;
  setModalState(false);

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    requestAnimationFrame(() => lastFocusedElement.focus());
  }
};

const handleDocumentKeydown = (event) => {
  if (!modalOpen) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key === "Tab") {
    event.preventDefault();
    focusCloseButton();
  }
};

const wireModal = () => {
  const modal = document.getElementById("whitepaper-modal");
  const trigger = document.querySelector("[data-open-modal]");
  const closeButton = document.querySelector("[data-close-modal]");

  if (trigger) {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(trigger);
    });
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", handleDocumentKeydown, true);
};

const wireCopyButton = () => {
  const button = document.querySelector("[data-copy-address]");
  if (!button) return;

  button.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONFIG.contractAddress);
      }
    } catch (error) {
      // Ignore clipboard failures gracefully.
    }

    setContractLabel(true);
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => setContractLabel(false), 1500);
  });
};

const init = () => {
  renderCandles();
  renderTicker();
  setButtonUrls();
  setContractLabel(false);
  wireModal();
  wireCopyButton();
};

init();

window.addEventListener("beforeunload", () => {
  if (copyTimer) clearTimeout(copyTimer);
});

