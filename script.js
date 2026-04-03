document.addEventListener("DOMContentLoaded", () => {
  const PASSWORD = "3003";
  const AUTH_KEY = "senbondo_estimate_auth";
  const BASE_FILE = "base/base.png";
  const BASE_PRICE = 244000;

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
        { id: "w", label: "ウォールナット4枚", file: "door/door_w.png" },
        { id: "w2", label: "ウォールナット2枚外側", file: "door/door_w2.png" }
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
        { id: "senbondo_zenmen", label: "千本格子4枚", file: "unit/unit_senbondo_zenmen.png" }
      ],
      defaultId: "normal"
    }
  ];

  const PRICE_MAP = {
    door: {
      oborozakura: 10000,
      uzunomichi: 36000
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
      "towazakura-w": 19500,
      donsu: 1500,
      kokutan: 1500,
      shitan: 1500
    },
    back: {
      iris: 1500,
      lily: 6000,
      uzunomichi: 6000
    },
    unit: {
      senbondo_zenmen: 9000
    }
  };

  const INQUIRY_OPTIONS = {
    unit: new Set()
  };

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

  function toHalfWidth(str) {
    return str
      .replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
      .replace(/　/g, " ");
  }

  function normalizePassword(str) {
    return toHalfWidth(String(str)).trim();
  }

  function toast(msg) {
    const t = $("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      t.classList.remove("show");
    }, 1800);
  }

  function setImg(id, src) {
    const el = $(id);
    if (!el) return;
    const bust = "v=" + Date.now();
    el.src = src + (src.includes("?") ? "&" + bust : "?" + bust);
  }

  function setSelText(selId, label) {
    const el = $(selId);
    if (el) el.textContent = label;
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

  function generateOrderCode(date = new Date()) {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    return `${mm}${dd}${hh}${mi}`;
  }

  function getOrderCodeInput() {
    return $("orderCodeInput");
  }

  function getOrderCodeValue() {
    const el = getOrderCodeInput();
    if (!el) return "";
    return String(el.value || "").trim();
  }

  function sanitizeOrderCodeValue(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 8);
  }

  function setOrderCodeValue(orderCode = "") {
    const el = getOrderCodeInput();
    if (!el) return;
    el.value = sanitizeOrderCodeValue(orderCode);
  }

  function isValidOrderCode(code) {
    return /^\d{8}$/.test(code);
  }

  function resolveOrderCode(date = new Date()) {
    const inputValue = sanitizeOrderCodeValue(getOrderCodeValue());
    if (isValidOrderCode(inputValue)) {
      setOrderCodeValue(inputValue);
      return inputValue;
    }
    const autoCode = generateOrderCode(date);
    setOrderCodeValue(autoCode);
    return autoCode;
  }

  function buildCustomerFileName(ext = "pdf", orderCode = "") {
    const customerName = $("customerName")?.value.trim();
    const baseName = customerName ? `${customerName}様御見積書` : "senbondo御見積書";
    const safeName = baseName
      .replace(/[\\/:*?"<>|]/g, "_")
      .replace(/\s+/g, "_");
    const suffix = orderCode ? `_${orderCode}` : "";
    return `${safeName}${suffix}.${ext}`;
  }

  function isIOSLike() {
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";
    const touchPoints = navigator.maxTouchPoints || 0;
    return /iPhone|iPad|iPod/i.test(ua) || (platform === "MacIntel" && touchPoints > 1);
  }

  function openPreviewWindowNow() {
    const win = window.open("", "_blank");
    if (!win) return null;

    try {
      win.document.open();
      win.document.write(`<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>画像を準備中</title>
<style>
  body{
    margin:0;
    background:#111;
    color:#fff;
    font-family:system-ui,-apple-system,"Segoe UI","Noto Sans JP",sans-serif;
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:100vh;
  }
  .box{
    text-align:center;
    padding:24px;
    line-height:1.8;
    font-size:14px;
  }
</style>
</head>
<body>
  <div class="box">画像を準備しています…</div>
</body>
</html>`);
      win.document.close();
    } catch (e) {}
    return win;
  }

  function writeImagePreview(preview, blob, filename) {
    const url = URL.createObjectURL(blob);
    const safeTitle = String(filename).replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (!preview || preview.closed) {
      const fallback = window.open(url, "_blank");
      if (!fallback) {
        toast("画像プレビューを開けませんでした");
      }
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      return;
    }

    try {
      preview.document.open();
      preview.document.write(`<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${safeTitle}</title>
<style>
  body{
    margin:0;
    background:#111;
    color:#fff;
    font-family:system-ui,-apple-system,"Segoe UI","Noto Sans JP",sans-serif;
  }
  .wrap{
    min-height:100vh;
    display:flex;
    flex-direction:column;
  }
  .bar{
    position:sticky;
    top:0;
    background:rgba(17,17,17,.95);
    padding:14px 16px;
    border-bottom:1px solid rgba(255,255,255,.12);
    z-index:10;
  }
  .title{
    font-size:14px;
    font-weight:700;
    margin-bottom:6px;
    word-break:break-all;
  }
  .note{
    font-size:12px;
    line-height:1.6;
    color:rgba(255,255,255,.8);
  }
  .imgWrap{
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:16px;
  }
  img{
    max-width:100%;
    height:auto;
    background:#fff;
    box-shadow:0 10px 30px rgba(0,0,0,.35);
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="bar">
      <div class="title">${safeTitle}</div>
      <div class="note">開いた画像を長押しして保存、または共有してください。</div>
    </div>
    <div class="imgWrap">
      <img src="${url}" alt="${safeTitle}">
    </div>
  </div>
</body>
</html>`);
      preview.document.close();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (e) {
      preview.location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }
  }

  async function saveBlobToDevice(blob, filename, kind = "file", previewWindow = null) {
    const supportsSavePicker =
      typeof window.showSaveFilePicker === "function" &&
      window.isSecureContext === true &&
      !isIOSLike();

    if (supportsSavePicker) {
      try {
        const lower = filename.toLowerCase();
        const isPdf = lower.endsWith(".pdf");
        const extensions = isPdf ? [".pdf"] : [".jpg", ".jpeg"];
        const mime = isPdf ? "application/pdf" : "image/jpeg";

        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [
            {
              description: isPdf ? "PDFファイル" : "JPEG画像",
              accept: { [mime]: extensions }
            }
          ]
        });

        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return "saved";
      } catch (err) {
        if (err && err.name === "AbortError") return "cancel";
        console.warn("showSaveFilePicker failed:", err);
      }
    }

    if (kind === "image" && isIOSLike()) {
      writeImagePreview(previewWindow, blob, filename);
      return "preview";
    }

    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);

      if (kind === "image") {
        if (previewWindow && !previewWindow.closed) {
          setTimeout(() => {
            writeImagePreview(previewWindow, blob, filename);
          }, 400);
        }
        return "download+preview";
      }

      return "saved";
    } catch (err) {
      console.error(err);
      if (kind === "image") {
        writeImagePreview(previewWindow, blob, filename);
        return "preview";
      }
      return "error";
    }
  }

  function normalizeState() {
    if (state.center && state.center !== "normal") {
      state.hashira = "on";
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
  }

  function calcEstimate() {
    let add = 0;
    let inquiry = false;
    const breakdown = [];

    Object.keys(state).forEach((partKey) => {
      const optId = state[partKey];
      if (!optId || optId === "normal" || optId === "on" || optId === "off") return;

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
    if ($("price-add")) $("price-add").textContent = formatYen(est.add);
    if ($("price-note")) $("price-note").textContent = "※すべて税別価格です。";
    if ($("price-breakdown")) {
      $("price-breakdown").textContent =
        est.breakdown.length === 0
          ? "加算パーツはありません。"
          : est.breakdown.map((item) => `${item.part}：${item.option}　${formatYen(item.price)}`).join("\n");
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

    state[partKey] = optId;
    normalizeState();
    syncUIFromState();

    if (!silent) {
      let msg = `${part.jp}：${opt.label}`;
      if (partKey === "center" && state.center !== "normal") {
        msg += "（柱はON固定）";
      }
      toast(msg);
    }
  }

  function renderControls() {
    const root = $("controls");
    if (!root) return;
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
  }

  function fillExportSheet(exportInfo = {}) {
    const now = exportInfo.date instanceof Date ? exportInfo.date : new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    const dateText = `${yyyy}/${mm}/${dd} ${hh}:${mi}`;

    const orderCode = exportInfo.orderCode || resolveOrderCode(now);
    const staffName = $("staffName")?.value.trim() || "未入力";
    const customerName = $("customerName")?.value.trim() || "未入力";
    const memo = $("memo")?.value.trim() || "なし";

    if ($("exportTitle")) {
      $("exportTitle").textContent = `${dateText}　担当：${staffName}　お客様名：${customerName}様　コード：${orderCode}`;
    }
    if ($("exportMeta")) $("exportMeta").textContent = "千本堂カスタマイズ仕様書";

    if ($("exp-base")) $("exp-base").src = $("layer-base")?.src || "";
    if ($("exp-unit")) $("exp-unit").src = $("layer-unit")?.src || "";
    if ($("exp-back")) $("exp-back").src = $("layer-back")?.src || "";
    if ($("exp-center")) $("exp-center").src = $("layer-center")?.src || "";
    if ($("exp-hashira")) $("exp-hashira").src = $("layer-hashira")?.src || "";
    if ($("exp-door")) $("exp-door").src = $("layer-door")?.src || "";

    if ($("exp-sel-door")) $("exp-sel-door").textContent = $("sel-door")?.textContent || "";
    if ($("exp-sel-center")) $("exp-sel-center").textContent = $("sel-center")?.textContent || "";
    if ($("exp-sel-hashira")) {
      const hashiraText = $("sel-hashira")?.textContent || "";
      $("exp-sel-hashira").textContent = hashiraText === "ON" ? "有り" : "無し";
    }
    if ($("exp-sel-back")) $("exp-sel-back").textContent = $("sel-back")?.textContent || "";
    if ($("exp-sel-unit")) $("exp-sel-unit").textContent = $("sel-unit")?.textContent || "";
    if ($("exp-memo")) $("exp-memo").textContent = memo;

    if ($("exp-price-add")) $("exp-price-add").textContent = $("price-add")?.textContent || "¥0";
    if ($("exp-price-note")) $("exp-price-note").textContent = ($("price-note")?.textContent || "").replace(/^※/, "");
    if ($("exp-price-breakdown")) $("exp-price-breakdown").textContent = $("price-breakdown")?.textContent || "加算パーツはありません。";
  }

  async function exportPdf() {
    try {
      if (typeof html2canvas === "undefined") {
        toast("PDFライブラリが読み込めていません");
        return;
      }
      if (!window.jspdf || !window.jspdf.jsPDF) {
        toast("PDFライブラリが読み込めていません");
        return;
      }

      const exportDate = new Date();
      const orderCode = resolveOrderCode(exportDate);
      fillExportSheet({ date: exportDate, orderCode });

      const sheet = $("exportSheet");
      if (!sheet) {
        toast("PDF出力エリアが見つかりません");
        return;
      }

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

      const blob = pdf.output("blob");
      const filename = buildCustomerFileName("pdf", orderCode);
      const result = await saveBlobToDevice(blob, filename, "pdf");

      if (result === "saved") toast("PDFを書き出しました");
      if (result === "cancel") toast("保存をキャンセルしました");
    } catch (err) {
      console.error(err);
      toast("PDF出力に失敗しました");
    }
  }

  async function exportImage(previewWindow = null) {
    try {
      if (typeof html2canvas === "undefined") {
        toast("画像出力ライブラリが読み込めていません");
        if (previewWindow && !previewWindow.closed) previewWindow.close();
        return;
      }

      const exportDate = new Date();
      const orderCode = resolveOrderCode(exportDate);
      fillExportSheet({ date: exportDate, orderCode });

      const sheet = $("exportSheet");
      if (!sheet) {
        toast("出力エリアが見つかりません");
        if (previewWindow && !previewWindow.closed) previewWindow.close();
        return;
      }

      const canvas = await html2canvas(sheet, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true
      });

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.95);
      });

      if (!blob) {
        toast("画像出力に失敗しました");
        if (previewWindow && !previewWindow.closed) previewWindow.close();
        return;
      }

      const filename = buildCustomerFileName("jpg", orderCode);
      const result = await saveBlobToDevice(blob, filename, "image", previewWindow);

      if (result === "saved") toast("画像を書き出しました");
      if (result === "download+preview") toast("端末によっては開いた画像を長押し保存してください");
      if (result === "preview") toast("開いた画像を長押し保存してください");
      if (result === "cancel") {
        toast("保存をキャンセルしました");
        if (previewWindow && !previewWindow.closed) previewWindow.close();
      }
    } catch (err) {
      console.error(err);
      if (previewWindow && !previewWindow.closed) previewWindow.close();
      toast("画像出力に失敗しました");
    }
  }

  function unlockApp() {
    const lockScreen = $("lockScreen");
    const app = $("app");
    if (lockScreen) lockScreen.style.display = "none";
    if (app) app.classList.add("show");
    try {
      sessionStorage.setItem(AUTH_KEY, "ok");
    } catch (e) {}
  }

  function lockApp() {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch (e) {}

    const app = $("app");
    const lockScreen = $("lockScreen");
    if (app) app.classList.remove("show");
    if (lockScreen) lockScreen.style.display = "flex";
    if ($("passwordInput")) $("passwordInput").value = "";
    if ($("lockError")) $("lockError").textContent = "";
  }

  function tryUnlock() {
    const input = $("passwordInput");
    const error = $("lockError");
    const value = normalizePassword(input ? input.value : "");

    if (value === PASSWORD) {
      if (error) error.textContent = "";
      unlockApp();
      toast("ロックを解除しました");
    } else {
      if (error) error.textContent = "パスワードが違います。";
    }
  }

  const unlockBtn = $("unlockBtn");
  const passwordInput = $("passwordInput");
  const lockBackBtn = $("lockBackBtn");
  const resetBtn = $("resetBtn");
  const pdfBtn = $("pdfBtn");
  const imageBtn = $("imageBtn");
  const orderCodeInput = $("orderCodeInput");

  if (unlockBtn) unlockBtn.addEventListener("click", tryUnlock);

  if (passwordInput) {
    passwordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tryUnlock();
    });
  }

  if (lockBackBtn) {
    lockBackBtn.addEventListener("click", () => {
      if (confirm("画面を施錠しますか？")) lockApp();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("カスタマイズを初期状態に戻しますか？")) resetAll();
    });
  }

  if (pdfBtn) {
    pdfBtn.addEventListener("click", exportPdf);
  }

  if (imageBtn) {
    imageBtn.addEventListener("click", () => {
      const previewWindow = isIOSLike() ? openPreviewWindowNow() : null;
      exportImage(previewWindow);
    });
  }

  if (orderCodeInput) {
    orderCodeInput.addEventListener("input", () => {
      const cleaned = sanitizeOrderCodeValue(orderCodeInput.value || "");
      if (orderCodeInput.value !== cleaned) {
        orderCodeInput.value = cleaned;
      }
    });
  }

  renderControls();
  resetAll();

  try {
    if (sessionStorage.getItem(AUTH_KEY) === "ok") {
      unlockApp();
    }
  } catch (e) {}

  if (passwordInput) passwordInput.focus();
});
