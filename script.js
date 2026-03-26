document.addEventListener("DOMContentLoaded", () => {
  const PASSWORD = "3003";
  const AUTH_KEY = "senbondo_estimate_auth";
  const BASE_FILE = "base/base.png";
  const BASE_PRICE = 899800;

  const PARTS = [
    {
      key: "door",
      jp: "上台戸板",
      layerId: "layer-door",
      selId: "sel-door",
      options: [
        { id: "normal", label: "通常", file: "door/door_normal.png" },
        { id: "kokutan2", label: "黒丹調2枚内側", file: "door/door_kokutan2.png" },
        { id: "kokutan4", label: "黒丹調4枚", file: "door/door_kokutan4.png" },
        { id: "shitan2", label: "紫丹調2枚内側", file: "door/door_shitan2.png" },
        { id: "shitan4", label: "紫丹調4枚", file: "door/door_shitan4.png" },
        { id: "oborozakura", label: "おぼろ桜", file: "door/door_oborozakura.png" },
        { id: "uzunomichi", label: "渦の道", file: "door/door_uzunomichi.png" },
        { id: "w", label: "ウォールナット", file: "door/door_w.png" },
        { id: "w2", label: "ウォールナット2枚外側", file: "door/door_w2.png" },
        { id: "yaraido4", label: "矢来堂4枚", file: "door/door_yaraido4.png" },
        { id: "yaraido2", label: "矢来堂2枚内側", file: "door/door_yaraido2.png" },
        { id: "yaraido_w", label: "矢来堂2枚内側ウォールナット2枚外側", file: "door/door_yaraido_w.png" }
      ],
      defaultId: "normal"
    },
    {
      key: "center",
      jp: "背板中央",
      layerId: "layer-center",
      selId: "sel-center",
      options: [
        { id: "normal", label: "未選択", file: "center/center_normal.png" },
        { id: "luminous", label: "ルミナス", file: "center/center_luminous.png" },
        { id: "kokutan", label: "黒丹調", file: "center/center_kokutan.png" },
        { id: "shitan", label: "紫丹調", file: "center/center_shitan.png" },
        { id: "kinshi", label: "金紙", file: "center/center_kinshi.png" },
        { id: "donsu", label: "緞子", file: "center/center_donsu.png" },
        { id: "w", label: "ウォールナット", file: "center/center_w.png" },
        { id: "uzunomichi", label: "渦の道", file: "center/center_uzunomichi.png" },
        { id: "oborozakura", label: "おぼろ桜", file: "center/center_oborozakura.png" },
        { id: "sakuranamiki-kokutan", label: "桜並木（黒丹）", file: "center/center_sakuranamiki-kokutan.png" },
        { id: "sakuranamiki-shitan", label: "桜並木（紫丹）", file: "center/center_sakuranamiki-shitan.png" },
        { id: "sakuranamiki-w", label: "桜並木（ウォールナット）", file: "center/center_sakuranamiki-w.png" },
        { id: "towazakura-kokutan", label: "永遠桜（黒丹）", file: "center/center_towazakura-kokutan.png" },
        { id: "towazakura-shitan", label: "永遠桜（紫丹）", file: "center/center_towazakura-shitan.png" },
        { id: "towazakura-w", label: "永遠桜（ウォールナット）", file: "center/center_towazakura-w.png" }
      ],
      defaultId: "normal"
    },
    {
      key: "hashira",
      jp: "柱(背板中央未選択の場合のみ選択可能)",
      layerId: "layer-hashira",
      selId: "sel-hashira",
      options: [
        { id: "on", label: "ON", file: "hashira/hashira_on.png" },
        { id: "off", label: "OFF", file: "hashira/hashira_off.png" }
      ],
      defaultId: "on"
    },
    {
      key: "back",
      jp: "背板全面",
      layerId: "layer-back",
      selId: "sel-back",
      options: [
        { id: "normal", label: "通常", file: "back/back_normal.png" },
        { id: "luminous", label: "ルミナス", file: "back/back_luminous.png" },
        { id: "iris", label: "アイリス", file: "back/back_iris.png" },
        { id: "kinshi", label: "金紙", file: "back/back_kinshi.png" },
        { id: "lily", label: "リリー", file: "back/back_lily.png" },
        { id: "w", label: "ウォールナット", file: "back/back_w.png" },
        { id: "uzunomichi", label: "渦の道", file: "back/back_uzunomichi.png" }
      ],
      defaultId: "normal"
    },
    {
      key: "unit",
      jp: "下台戸板",
      layerId: "layer-unit",
      selId: "sel-unit",
      options: [
        { id: "normal", label: "通常", file: "unit/unit_normal.png" },
        { id: "senbondo2", label: "千本格子2枚内側", file: "unit/unit_senbondo2.png" },
        { id: "senbondo_zenmen", label: "千本格子全面", file: "unit/unit_senbondo_zenmen.png" },
        { id: "yaraido2", label: "矢来堂2枚内側", file: "unit/unit_yaraido2.png" },
        { id: "yaraidozenmen", label: "矢来堂全面", file: "unit/unit_yaraidozenmen.png" }
      ],
      defaultId: "normal"
    }
  ];

const PRICE_MAP = {
  door: {
    oborozakura: 6000,
    uzunomichi: 36000,
  },
  center: {
    luminous: 2250,
    kinshi: 1500,
    w: 1500,
    uzunomichi: 4500,
    oborozakura: 4500,
    "sakuranamiki-kokutan": 19500,
    "sakuranamiki-shitan": 19500,
    "sakuranamiki-w": 19500,
    "towazakura-kokutan": 19500,
    "towazakura-shitan": 19500,
    "towazakura-w": 19500
  },
  back: {
    iris: 1500,
    lily: 6000,
    uzunomichi: 6000
  },
  unit: {
    senbondo_zenmen: 9000
    yaraido_zenmen:0
  }
};

  const INQUIRY_OPTIONS = {
    unit: new Set(["senbondo_zenmen", "yaraidozenmen"])
  };

  const YARAIDO_DOOR_IDS = new Set(["yaraido2", "yaraido4", "yaraido_w"]);
  const YARAIDO_UNIT_IDS = new Set(["yaraido2", "yaraidozenmen"]);

  const state = {
    door: null,
    center: null,
    hashira: null,
    back: null,
    unit: null
  };

  function $(id) {
    return document.getElementById(id);
  }

  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      t.classList.remove("show");
    }, 1300);
  }

  function setImg(id, src) {
    const bust = "v=" + Date.now();
    $(id).src = src + (src.includes("?") ? "&" + bust : "?" + bust);
  }

  function setSelText(selId, label) {
    $(selId).textContent = label;
  }

  function setActive(partKey, optId) {
    const wrap = document.querySelector(`[data-part="${partKey}"]`);
    if (!wrap) return;

    wrap.querySelectorAll("button.opt").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.dataset.opt === optId ? "true" : "false");
    });
  }

  function getPart(partKey) {
    return PARTS.find((p) => p.key === partKey);
  }

  function getOpt(partKey, optId) {
    const part = getPart(partKey);
    return part ? part.options.find((o) => o.id === optId) : null;
  }

  function formatYen(value) {
    return "¥" + value.toLocaleString("ja-JP");
  }

  function isRestrictedDoorSelected() {
    return YARAIDO_DOOR_IDS.has(state.door);
  }

  function normalizeState() {
    if (state.center && state.center !== "normal") {
      state.hashira = "on";
    }

    if (isRestrictedDoorSelected() && !YARAIDO_UNIT_IDS.has(state.unit)) {
      state.unit = "yaraido2";
    }
  }

  function updateAvailability() {
    const mustHashiraOn = state.center && state.center !== "normal";

    const hashWrap = document.querySelector(`[data-part="hashira"]`);
    if (hashWrap) {
      const offBtn = hashWrap.querySelector(`button.opt[data-opt="off"]`);
      if (offBtn) {
        offBtn.disabled = mustHashiraOn;
        offBtn.title = mustHashiraOn ? "背板中央が未選択以外のときは柱OFFにできません" : "";
      }
    }

    const unitWrap = document.querySelector(`[data-part="unit"]`);
    if (unitWrap) {
      const restrictUnit = isRestrictedDoorSelected();

      unitWrap.querySelectorAll("button.opt").forEach((btn) => {
        const isAllowed = !restrictUnit || YARAIDO_UNIT_IDS.has(btn.dataset.opt);
        btn.disabled = !isAllowed;
        btn.title = !isAllowed ? "この上台戸板では選択できません" : "";
      });
    }
  }

  function calcEstimate() {
    let add = 0;
    let inquiry = false;
    const breakdown = [];

    Object.keys(state).forEach((partKey) => {
      const optId = state[partKey];
      if (!optId || optId === "normal" || optId === "on" || optId === "off") {
        return;
      }

      if (INQUIRY_OPTIONS[partKey] && INQUIRY_OPTIONS[partKey].has(optId)) {
        inquiry = true;
        return;
      }

      const price = PRICE_MAP[partKey] && PRICE_MAP[partKey][optId] ? PRICE_MAP[partKey][optId] : 0;
      if (price <= 0) return;

      const part = getPart(partKey);
      const opt = getOpt(partKey, optId);

      breakdown.push({
        part: part.jp,
        option: opt.label,
        price
      });

      add += price;
    });

    return {
      base: BASE_PRICE,
      add,
      total: BASE_PRICE + add,
      inquiry,
      breakdown
    };
  }

  function updateEstimate() {
    const est = calcEstimate();

    $("price-base").textContent = formatYen(est.base);
    $("price-add").textContent = formatYen(est.add);

    if (est.inquiry) {
      $("price-total").textContent = "お問い合わせください";
      $("price-note").textContent = "※すべて税別価格です。";
      $("price-breakdown").textContent = "特殊パーツが含まれるため、お問い合わせください。";
      return;
    }

    $("price-total").textContent = formatYen(est.total);
    $("price-note").textContent = "※すべて税別価格です。";

    if (est.breakdown.length === 0) {
      $("price-breakdown").textContent = "加算パーツはありません。";
    } else {
      $("price-breakdown").textContent = est.breakdown
        .map((item) => `${item.part}：${item.option}　${formatYen(item.price)}`)
        .join("\n");
    }
  }

  function syncUIFromState() {
    normalizeState();

    PARTS.forEach((part) => {
      const opt = getOpt(part.key, state[part.key]);
      if (!opt) return;

      setImg(part.layerId, opt.file);
      setSelText(part.selId, opt.label);
      setActive(part.key, opt.id);
    });

    updateAvailability();
    updateEstimate();
  }

  function apply(partKey, optId, silent = false) {
    const part = getPart(partKey);
    const opt = getOpt(partKey, optId);
    if (!part || !opt) return;

    const prevUnit = state.unit;
    state[partKey] = optId;

    normalizeState();
    syncUIFromState();

    if (!silent) {
      let msg = `${part.jp}：${opt.label}`;

      if (partKey === "door" && isRestrictedDoorSelected()) {
        if (prevUnit !== state.unit) {
          const unitOpt = getOpt("unit", state.unit);
          msg += `（下台戸板を${unitOpt.label}に変更）`;
        } else {
          msg += "（下台戸板は矢来堂のみ選択可能）";
        }
      }

      if (partKey === "center" && state.center !== "normal") {
        msg += "（柱はON固定）";
      }

      toast(msg);
    }
  }

  function renderControls() {
    const root = $("controls");
    root.innerHTML = "";

    PARTS.forEach((part) => {
      const box = document.createElement("section");
      box.className = "group";

      const head = document.createElement("div");
      head.className = "groupTitle";
      head.innerHTML = `<h3>${part.jp}</h3><div class="note">${part.options.length}項目</div>`;
      box.appendChild(head);

      const grid = document.createElement("div");
      grid.className = "btnGrid";
      grid.dataset.part = part.key;

      part.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "opt";
        btn.type = "button";
        btn.textContent = opt.label;
        btn.dataset.opt = opt.id;
        btn.setAttribute("aria-pressed", "false");
        btn.addEventListener("click", () => apply(part.key, opt.id));
        grid.appendChild(btn);
      });

      box.appendChild(grid);
      root.appendChild(box);
    });
  }

  function resetAll() {
    setImg("layer-base", BASE_FILE);

    PARTS.forEach((part) => {
      state[part.key] = part.defaultId;
    });

    normalizeState();
    syncUIFromState();
    toast("初期状態に戻しました");
  }

  function fillExportSheet() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    const dateText = `${yyyy}/${mm}/${dd} ${hh}:${mi}`;

    const staffName = $("staffName").value.trim() || "未入力";
    const customerName = $("customerName").value.trim() || "未入力";
    const memo = $("memo").value.trim() || "なし";

    $("exportTitle").textContent = `${dateText}　担当：${staffName}　お客様名：${customerName}様`;
    $("exportMeta").textContent = "千本堂カスタマイズ仕様書";

    $("exp-base").src = $("layer-base").src;
    $("exp-unit").src = $("layer-unit").src;
    $("exp-back").src = $("layer-back").src;
    $("exp-center").src = $("layer-center").src;
    $("exp-hashira").src = $("layer-hashira").src;
    $("exp-door").src = $("layer-door").src;

    $("exp-sel-door").textContent = $("sel-door").textContent;
    $("exp-sel-center").textContent = $("sel-center").textContent;
    $("exp-sel-hashira").textContent = $("sel-hashira").textContent === "ON" ? "有り" : "無し";
    $("exp-sel-back").textContent = $("sel-back").textContent;
    $("exp-sel-unit").textContent = $("sel-unit").textContent;

    const est = calcEstimate();
    $("exp-price-base").textContent = formatYen(est.base);
    $("exp-price-add").textContent = formatYen(est.add);

    if (est.inquiry) {
      $("exp-price-total").textContent = "お問い合わせください";
      $("exp-price-note").textContent = "すべて税別価格です。";
      $("exp-price-breakdown").textContent = "特殊パーツが含まれるため、お問い合わせください。";
    } else {
      $("exp-price-total").textContent = formatYen(est.total);
      $("exp-price-note").textContent = "すべて税別価格です。";
      $("exp-price-breakdown").textContent =
        est.breakdown.length === 0
          ? "加算パーツはありません。"
          : est.breakdown.map((item) => `${item.part}：${item.option}　${formatYen(item.price)}`).join("\n");
    }

    $("exp-memo").textContent = memo;
  }

  async function exportPdf() {
    try {
      fillExportSheet();

      const sheet = $("exportSheet");
      const canvas = await html2canvas(sheet, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 6;
      const usableW = pageW - margin * 2;
      const usableH = pageH - margin * 2;

      pdf.addImage(imgData, "JPEG", margin, margin, usableW, usableH);

      const now = new Date();
      const fileName =
        "senbondo_estimate_" +
        now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0") + "_" +
        String(now.getHours()).padStart(2, "0") +
        String(now.getMinutes()).padStart(2, "0") + ".pdf";

      pdf.save(fileName);
      toast("PDFを書き出しました");
    } catch (err) {
      console.error(err);
      toast("PDF出力に失敗しました");
    }
  }

  function unlockApp() {
    $("lockScreen").style.display = "none";
    $("app").classList.add("show");
    sessionStorage.setItem(AUTH_KEY, "ok");
  }

  function lockApp() {
    sessionStorage.removeItem(AUTH_KEY);
    $("app").classList.remove("show");
    $("lockScreen").style.display = "flex";
    $("passwordInput").value = "";
    $("lockError").textContent = "";
  }

  function tryUnlock() {
    const value = $("passwordInput").value.trim();
    if (value === PASSWORD) {
      unlockApp();
      toast("ロックを解除しました");
    } else {
      $("lockError").textContent = "パスワードが違います。";
    }
  }

  $("unlockBtn").addEventListener("click", tryUnlock);
  $("passwordInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      tryUnlock();
    }
  });

  $("lockBackBtn").addEventListener("click", () => {
    if (confirm("画面を施錠しますか？")) {
      lockApp();
    }
  });

  $("resetBtn").addEventListener("click", () => {
    if (confirm("カスタマイズを初期状態に戻しますか？")) {
      resetAll();
    }
  });

  $("pdfBtn").addEventListener("click", exportPdf);

  renderControls();
  resetAll();

  if (sessionStorage.getItem(AUTH_KEY) === "ok") {
    unlockApp();
  }
});