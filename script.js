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

  const state = {
    door:null,
    center:null,
    hashira:null,
    back:null,
    unit:null
  };

  function $(id){return document.getElementById(id);}

  function formatYen(value){
    return "¥"+value.toLocaleString("ja-JP");
  }

  /* =============================
     注文コード生成（MMDDhhmm）
     ============================= */
  function buildOrderCode(){
    const now=new Date();
    const mm=String(now.getMonth()+1).padStart(2,"0");
    const dd=String(now.getDate()).padStart(2,"0");
    const hh=String(now.getHours()).padStart(2,"0");
    const mi=String(now.getMinutes()).padStart(2,"0");
    return `${mm}${dd}${hh}${mi}`;
  }

  function buildCustomerFileName(ext="pdf"){
    const customerName=$("customerName")?.value.trim();
    const baseName=customerName?`${customerName}様御見積書`:"senbondo";
    const safeName=baseName.replace(/[\\/:*?"<>|]/g,"_").replace(/\s+/g,"_");
    return `${safeName}.${ext}`;
  }

  function fillExportSheet(){

    const now=new Date();
    const yyyy=now.getFullYear();
    const mm=String(now.getMonth()+1).padStart(2,"0");
    const dd=String(now.getDate()).padStart(2,"0");
    const hh=String(now.getHours()).padStart(2,"0");
    const mi=String(now.getMinutes()).padStart(2,"0");

    const dateText=`${yyyy}/${mm}/${dd} ${hh}:${mi}`;

    const staffName=$("staffName")?.value.trim()||"未入力";
    const customerName=$("customerName")?.value.trim()||"未入力";
    const memo=$("memo")?.value.trim()||"なし";

    const orderCode=buildOrderCode();

    if($("exportTitle")){
      $("exportTitle").textContent=
      `${dateText}　担当：${staffName}　お客様名：${customerName}様（No.${orderCode}）`;
    }

    if($("exportMeta")){
      $("exportMeta").textContent="千本堂カスタマイズ仕様書";
    }

    if($("exp-memo"))$("exp-memo").textContent=memo;
  }

  async function exportPdf(){

    fillExportSheet();

    const sheet=$("exportSheet");

    const canvas=await html2canvas(sheet,{
      backgroundColor:"#ffffff",
      scale:2,
      useCORS:true
    });

    const imgData=canvas.toDataURL("image/jpeg",0.98);

    const {jsPDF}=window.jspdf;
    const pdf=new jsPDF("p","mm","a4");

    const pageW=pdf.internal.pageSize.getWidth();
    const pageH=pdf.internal.pageSize.getHeight();

    const margin=6;

    pdf.addImage(imgData,"JPEG",margin,margin,pageW-margin*2,pageH-margin*2);

    const filename=buildCustomerFileName("pdf");

    pdf.save(filename);
  }

  async function exportImage(){

    fillExportSheet();

    const sheet=$("exportSheet");

    const canvas=await html2canvas(sheet,{
      backgroundColor:"#ffffff",
      scale:2,
      useCORS:true
    });

    canvas.toBlob(async(blob)=>{

      const filename=buildCustomerFileName("jpg");

      const url=URL.createObjectURL(blob);

      const a=document.createElement("a");
      a.href=url;
      a.download=filename;
      a.click();

      setTimeout(()=>URL.revokeObjectURL(url),1000);

    },"image/jpeg",0.95);
  }

  if($("pdfBtn"))$("pdfBtn").addEventListener("click",exportPdf);
  if($("imageBtn"))$("imageBtn").addEventListener("click",exportImage);

});
