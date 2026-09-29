import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://wmajvoskcizpolkwouvf.supabase.co";
const SUPABASE_KEY = "sb_publishable_TPAiQO6dW7svdD4RZb7x0A_XOjZcIQx";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const state = {
  user: null,
  projects: [],
  project: null,
  floors: [],
  units: [],
  files: [],
  conditions: [],
  scenarios: [],
  boq: [],
  lang: localStorage.getItem("respace-lang") || "ar",
  page: "dashboard"
};

const t = {
  ar: {
    authTagline:"مساحة عمل ذكية للمهندس المعماري لتوثيق وتحليل وإعادة تخطيط وتجديد المباني القائمة.",
    welcome:"مرحباً بك",authHint:"سجّل الدخول للوصول إلى مشاريعك.",email:"البريد الإلكتروني",password:"كلمة المرور",login:"تسجيل الدخول",or:"أو",createAccount:"إنشاء حساب جديد",
    safetyNote:"المنصة أداة تخطيط أولي. أي تعديل إنشائي أو MEP أو متطلبات سلامة يحتاج مراجعة مختص معتمد.",
    dashboard:"لوحة المشاريع",project:"المشروع",floors:"الطوابق والوحدات",plansFiles:"المخططات والملفات",condition:"تقييم الحالة",scenarios:"سيناريوهات التقسيم",boq:"BOQ والتكلفة",logout:"تسجيل الخروج",workspace:"مساحة العمل الشخصية",currentProject:"المشروع الحالي:",
    myProjects:"مشاريعي",newProject:"مشروع جديد",projectName:"اسم المشروع",city:"المدينة",buildingType:"نوع المبنى",yearBuilt:"سنة البناء",landArea:"مساحة الأرض",builtArea:"المساحة المبنية",save:"حفظ",cancel:"إلغاء",open:"فتح",status:"الحالة",
    noProjects:"لا توجد مشاريع بعد. أنشئ أول مشروع للبدء.",floorsCount:"الطوابق",unitsCount:"الوحدات",filesCount:"الملفات",scenariosCount:"السيناريوهات",
    projectInfo:"بيانات المشروع",notes:"ملاحظات",floorNumber:"رقم الطابق",floorName:"اسم الطابق",area:"المساحة",addFloor:"إضافة طابق",unitNumber:"رقم الوحدة",unitType:"نوع الوحدة",bedrooms:"غرف النوم",bathrooms:"الحمامات",occupancy:"الإشغال",addUnit:"إضافة وحدة",
    uploadFile:"رفع ملف",category:"الفئة",upload:"رفع",noFiles:"لا توجد ملفات مرفوعة.",discipline:"التخصص",item:"العنصر",rating:"الحالة",priority:"الأولوية",addAssessment:"إضافة تقييم",noAssessment:"لا توجد عناصر تقييم بعد.",
    newScenario:"سيناريو جديد",objective:"الهدف",description:"الوصف",estCost:"التكلفة التقديرية",duration:"المدة بالأيام",addScenario:"إضافة سيناريو",noScenarios:"لا توجد سيناريوهات بعد.",
    boqItem:"بند BOQ",qty:"الكمية",unit:"الوحدة",rate:"السعر",total:"الإجمالي",addBoq:"إضافة بند",noBoq:"لا توجد بنود BOQ بعد.",estimatedTotal:"الإجمالي التقديري",
    selectProject:"اختر مشروعاً من لوحة المشاريع أولاً.",created:"تم الحفظ بنجاح",error:"حدث خطأ",signedUp:"تم إنشاء الحساب. تحقق من بريدك إذا طُلب التأكيد.",loginFailed:"تعذر تسجيل الدخول",chooseFile:"اختر ملفاً أولاً",uploaded:"تم رفع الملف",loading:"جاري التحميل…"
  },
  en: {
    authTagline:"A smart workspace for architects to document, analyze, reconfigure and renovate existing buildings.",
    welcome:"Welcome",authHint:"Sign in to access your projects.",email:"Email",password:"Password",login:"Sign in",or:"or",createAccount:"Create new account",
    safetyNote:"This platform is a planning tool. Structural, MEP and life-safety changes require review by qualified professionals.",
    dashboard:"Projects Dashboard",project:"Project",floors:"Floors & Units",plansFiles:"Plans & Files",condition:"Condition Assessment",scenarios:"Reconfiguration Scenarios",boq:"BOQ & Cost",logout:"Sign out",workspace:"Personal Workspace",currentProject:"Current project:",
    myProjects:"My Projects",newProject:"New Project",projectName:"Project name",city:"City",buildingType:"Building type",yearBuilt:"Year built",landArea:"Land area",builtArea:"Built-up area",save:"Save",cancel:"Cancel",open:"Open",status:"Status",
    noProjects:"No projects yet. Create your first project to begin.",floorsCount:"Floors",unitsCount:"Units",filesCount:"Files",scenariosCount:"Scenarios",
    projectInfo:"Project Information",notes:"Notes",floorNumber:"Floor number",floorName:"Floor name",area:"Area",addFloor:"Add Floor",unitNumber:"Unit number",unitType:"Unit type",bedrooms:"Bedrooms",bathrooms:"Bathrooms",occupancy:"Occupancy",addUnit:"Add Unit",
    uploadFile:"Upload File",category:"Category",upload:"Upload",noFiles:"No uploaded files.",discipline:"Discipline",item:"Item",rating:"Condition",priority:"Priority",addAssessment:"Add Assessment",noAssessment:"No assessment items yet.",
    newScenario:"New Scenario",objective:"Objective",description:"Description",estCost:"Estimated Cost",duration:"Duration (days)",addScenario:"Add Scenario",noScenarios:"No scenarios yet.",
    boqItem:"BOQ Item",qty:"Quantity",unit:"Unit",rate:"Rate",total:"Total",addBoq:"Add Item",noBoq:"No BOQ items yet.",estimatedTotal:"Estimated Total",
    selectProject:"Select a project from the dashboard first.",created:"Saved successfully",error:"Something went wrong",signedUp:"Account created. Check your email if confirmation is required.",loginFailed:"Could not sign in",chooseFile:"Choose a file first",uploaded:"File uploaded",loading:"Loading…"
  }
};
const tr = k => t[state.lang][k] || k;

const $ = s => document.querySelector(s);
const esc = v => String(v ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
function toast(msg){ const el=$("#toast"); el.textContent=msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),2400); }
function money(v){ return new Intl.NumberFormat(state.lang==="ar"?"ar-SA":"en-SA",{style:"currency",currency:"SAR",maximumFractionDigits:0}).format(Number(v||0)); }
function setLang(lang){ state.lang=lang; localStorage.setItem("respace-lang",lang); document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr"; document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=tr(el.dataset.i18n)); $("#langBtn").textContent=lang==="ar"?"EN":"AR"; $("#langAuthBtn").textContent=lang==="ar"?"EN":"AR"; if(state.user) render(); }

async function bootstrap(){
  setLang(state.lang);
  const {data:{session}} = await supabase.auth.getSession();
  if(session){ state.user=session.user; showApp(); await loadProjects(); } else showAuth();
  supabase.auth.onAuthStateChange(async(_event,session)=>{ if(session){state.user=session.user;showApp();await loadProjects();}else{state.user=null;showAuth();}});
}
function showAuth(){ $("#authView").classList.remove("hidden"); $("#appView").classList.add("hidden"); }
function showApp(){ $("#authView").classList.add("hidden"); $("#appView").classList.remove("hidden"); }

$("#authForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const email=$("#email").value.trim(), password=$("#password").value;
  const {error}=await supabase.auth.signInWithPassword({email,password});
  if(error) toast(tr("loginFailed")+": "+error.message);
});
$("#signupBtn").addEventListener("click", async()=>{
  const email=$("#email").value.trim(), password=$("#password").value;
  if(!email || password.length<6) return toast(tr("error"));
  const {error}=await supabase.auth.signUp({email,password});
  if(error) toast(error.message); else toast(tr("signedUp"));
});
$("#logoutBtn").addEventListener("click",()=>supabase.auth.signOut());
$("#langBtn").addEventListener("click",()=>setLang(state.lang==="ar"?"en":"ar"));
$("#langAuthBtn").addEventListener("click",()=>setLang(state.lang==="ar"?"en":"ar"));
$("#sideNav").addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(!b)return;state.page=b.dataset.page;document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x===b));render();});

async function loadProjects(){
  const {data,error}=await supabase.from("projects").select("*").order("updated_at",{ascending:false});
  if(error) return toast(error.message);
  state.projects=data||[];
  if(state.project){
    const fresh=state.projects.find(p=>p.id===state.project.id);
    if(fresh) state.project=fresh;
  }
  render();
}
async function loadProjectData(){
  if(!state.project) return;
  const pid=state.project.id;
  const {data:floors}=await supabase.from("floors").select("*").eq("project_id",pid).order("floor_number");
  state.floors=floors||[];
  const floorIds=state.floors.map(f=>f.id);
  state.units=floorIds.length?(await supabase.from("units").select("*").in("floor_id",floorIds).order("unit_number")).data||[]:[];
  state.files=(await supabase.from("project_files").select("*").eq("project_id",pid).order("created_at",{ascending:false})).data||[];
  state.conditions=(await supabase.from("condition_items").select("*").eq("project_id",pid).order("created_at",{ascending:false})).data||[];
  state.scenarios=(await supabase.from("scenarios").select("*").eq("project_id",pid).order("created_at",{ascending:false})).data||[];
  state.boq=(await supabase.from("boq_items").select("*").eq("project_id",pid).order("created_at",{ascending:false})).data||[];
}
async function openProject(id){
  state.project=state.projects.find(p=>p.id===id)||null;
  if(!state.project) return;
  $("#currentProjectName").textContent=state.project.name;
  await loadProjectData();
  state.page="project";
  document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.page==="project"));
  render();
}
window.openProject=openProject;

function requireProject(){ if(!state.project){ $("#pageContent").innerHTML='<div class="empty">'+tr("selectProject")+'</div>'; return false;} return true; }

function render(){
  $("#currentProjectName").textContent=state.project?.name||"—";
  const map={dashboard:"dashboard",project:"project",floors:"floors",files:"plansFiles",condition:"condition",scenarios:"scenarios",boq:"boq"};
  $("#pageTitle").textContent=tr(map[state.page]||"dashboard");
  if(state.page==="dashboard") return renderDashboard();
  if(!requireProject()) return;
  if(state.page==="project") return renderProject();
  if(state.page==="floors") return renderFloors();
  if(state.page==="files") return renderFiles();
  if(state.page==="condition") return renderConditions();
  if(state.page==="scenarios") return renderScenarios();
  if(state.page==="boq") return renderBoq();
}

function renderDashboard(){
  const html=state.projects.length?state.projects.map(p=>`<tr class="click-row" onclick="openProject('${p.id}')"><td><strong>${esc(p.name)}</strong><br><small>${esc(p.city||"")}</small></td><td>${esc(p.building_type||"—")}</td><td><span class="pill">${esc(p.status||"survey")}</span></td><td><button class="ghost-btn">${tr("open")}</button></td></tr>`).join(""):"";
  $("#pageContent").innerHTML=`
    <div class="section-head"><h3>${tr("myProjects")}</h3><button id="newProjectBtn" class="primary-btn">+ ${tr("newProject")}</button></div>
    ${state.projects.length?`<div class="table-wrap"><table><thead><tr><th>${tr("projectName")}</th><th>${tr("buildingType")}</th><th>${tr("status")}</th><th></th></tr></thead><tbody>${html}</tbody></table></div>`:`<div class="empty">${tr("noProjects")}</div>`}
    <div id="newProjectPanel"></div>`;
  $("#newProjectBtn").onclick=()=>{$("#newProjectPanel").innerHTML=`
    <div class="panel" style="margin-top:16px"><div class="section-head"><h3>${tr("newProject")}</h3></div>
    <form id="projectForm" class="form-grid">
      <div><label>${tr("projectName")}</label><input class="field" name="name" required></div>
      <div><label>${tr("city")}</label><input class="field" name="city"></div>
      <div><label>${tr("buildingType")}</label><select class="field" name="building_type"><option>Residential</option><option>Commercial</option><option>Office</option><option>Mixed-use</option><option>Hospitality</option><option>Other</option></select></div>
      <div><label>${tr("yearBuilt")}</label><input class="field" type="number" name="year_built"></div>
      <div><label>${tr("landArea")}</label><input class="field" type="number" step="0.01" name="land_area"></div>
      <div><label>${tr("builtArea")}</label><input class="field" type="number" step="0.01" name="built_up_area"></div>
      <div class="full"><label>${tr("notes")}</label><textarea class="field" name="notes" rows="3"></textarea></div>
      <div class="full"><button class="primary-btn">${tr("save")}</button></div>
    </form></div>`;
    $("#projectForm").onsubmit=createProject;
  };
}
async function createProject(e){
  e.preventDefault(); const fd=new FormData(e.target);
  const payload=Object.fromEntries(fd.entries()); payload.user_id=state.user.id;
  ["year_built","land_area","built_up_area"].forEach(k=>{if(payload[k]==="")payload[k]=null});
  const {data,error}=await supabase.from("projects").insert(payload).select().single();
  if(error)return toast(error.message); toast(tr("created")); state.project=data; await loadProjects(); await loadProjectData(); openProject(data.id);
}

function renderProject(){
  const p=state.project;
  $("#pageContent").innerHTML=`
  <div class="grid cards">
    <div class="card stat"><strong>${state.floors.length}</strong><span>${tr("floorsCount")}</span></div>
    <div class="card stat"><strong>${state.units.length}</strong><span>${tr("unitsCount")}</span></div>
    <div class="card stat"><strong>${state.files.length}</strong><span>${tr("filesCount")}</span></div>
    <div class="card stat"><strong>${state.scenarios.length}</strong><span>${tr("scenariosCount")}</span></div>
  </div>
  <div class="panel" style="margin-top:16px"><h3>${tr("projectInfo")}</h3>
    <div class="form-grid">
      <div><label>${tr("projectName")}</label><div class="field">${esc(p.name)}</div></div>
      <div><label>${tr("city")}</label><div class="field">${esc(p.city||"—")}</div></div>
      <div><label>${tr("buildingType")}</label><div class="field">${esc(p.building_type||"—")}</div></div>
      <div><label>${tr("yearBuilt")}</label><div class="field">${esc(p.year_built||"—")}</div></div>
      <div><label>${tr("landArea")}</label><div class="field">${esc(p.land_area||"—")} m²</div></div>
      <div><label>${tr("builtArea")}</label><div class="field">${esc(p.built_up_area||"—")} m²</div></div>
      <div class="full"><label>${tr("notes")}</label><div class="field">${esc(p.notes||"—")}</div></div>
    </div>
  </div>
  <div class="notice">${tr("safetyNote")}</div>`;
}

function renderFloors(){
  const floorRows=state.floors.map(f=>`<tr><td>${f.floor_number}</td><td>${esc(f.name||"—")}</td><td>${esc(f.area||"—")} m²</td><td>${state.units.filter(u=>u.floor_id===f.id).length}</td></tr>`).join("");
  const unitRows=state.units.map(u=>{const f=state.floors.find(x=>x.id===u.floor_id);return `<tr><td>${esc(u.unit_number)}</td><td>${esc(f?.name||f?.floor_number||"—")}</td><td>${esc(u.unit_type||"—")}</td><td>${esc(u.area||"—")} m²</td><td>${u.bedrooms||0}</td><td>${u.bathrooms||0}</td></tr>`}).join("");
  $("#pageContent").innerHTML=`
  <div class="panel"><div class="section-head"><h3>${tr("floors")}</h3></div>
  <form id="floorForm" class="form-grid">
    <div><label>${tr("floorNumber")}</label><input name="floor_number" type="number" class="field" required></div>
    <div><label>${tr("floorName")}</label><input name="name" class="field"></div>
    <div><label>${tr("area")}</label><input name="area" type="number" step="0.01" class="field"></div>
    <div style="align-self:end"><button class="primary-btn">${tr("addFloor")}</button></div>
  </form></div>
  <div class="table-wrap"><table><thead><tr><th>#</th><th>${tr("floorName")}</th><th>${tr("area")}</th><th>${tr("unitsCount")}</th></tr></thead><tbody>${floorRows}</tbody></table></div>
  <div class="panel" style="margin-top:16px"><h3>${tr("addUnit")}</h3><form id="unitForm" class="form-grid">
    <div><label>${tr("floors")}</label><select name="floor_id" class="field" required>${state.floors.map(f=>`<option value="${f.id}">${esc(f.name||("#"+f.floor_number))}</option>`).join("")}</select></div>
    <div><label>${tr("unitNumber")}</label><input name="unit_number" class="field" required></div>
    <div><label>${tr("unitType")}</label><select name="unit_type" class="field"><option>Studio</option><option>1 Bedroom</option><option>2 Bedroom</option><option>3 Bedroom</option><option>4 Bedroom+</option><option>Office</option><option>Shop</option><option>Other</option></select></div>
    <div><label>${tr("area")}</label><input name="area" type="number" step="0.01" class="field"></div>
    <div><label>${tr("bedrooms")}</label><input name="bedrooms" type="number" class="field" value="0"></div>
    <div><label>${tr("bathrooms")}</label><input name="bathrooms" type="number" class="field" value="0"></div>
    <div class="full"><button class="primary-btn">${tr("addUnit")}</button></div>
  </form></div>
  <div class="table-wrap"><table><thead><tr><th>${tr("unitNumber")}</th><th>${tr("floors")}</th><th>${tr("unitType")}</th><th>${tr("area")}</th><th>${tr("bedrooms")}</th><th>${tr("bathrooms")}</th></tr></thead><tbody>${unitRows}</tbody></table></div>`;
  $("#floorForm").onsubmit=addFloor; $("#unitForm").onsubmit=addUnit;
}
async function addFloor(e){e.preventDefault();const p=Object.fromEntries(new FormData(e.target));p.project_id=state.project.id;p.floor_number=Number(p.floor_number);p.area=p.area?Number(p.area):null;const{error}=await supabase.from("floors").insert(p);if(error)return toast(error.message);toast(tr("created"));await loadProjectData();render();}
async function addUnit(e){e.preventDefault();const p=Object.fromEntries(new FormData(e.target));["area","bedrooms","bathrooms"].forEach(k=>p[k]=p[k]?Number(p[k]):0);const{error}=await supabase.from("units").insert(p);if(error)return toast(error.message);toast(tr("created"));await loadProjectData();render();}

function renderFiles(){
  const rows=state.files.map(f=>`<tr><td>${esc(f.file_name)}</td><td>${esc(f.category)}</td><td>${new Date(f.created_at).toLocaleDateString()}</td></tr>`).join("");
  $("#pageContent").innerHTML=`
  <div class="panel"><h3>${tr("uploadFile")}</h3><form id="fileForm" class="form-grid">
    <div class="full file-drop"><input id="fileInput" type="file" accept=".pdf,image/jpeg,image/png,image/webp" required></div>
    <div><label>${tr("category")}</label><select id="fileCategory" class="field"><option value="existing_plan">Existing Plan</option><option value="site_photo">Site Photo</option><option value="report">Report</option><option value="document">Document</option></select></div>
    <div style="align-self:end"><button class="primary-btn">${tr("upload")}</button></div>
  </form></div>
  ${state.files.length?`<div class="table-wrap"><table><thead><tr><th>File</th><th>${tr("category")}</th><th>Date</th></tr></thead><tbody>${rows}</tbody></table></div>`:`<div class="empty">${tr("noFiles")}</div>`}`;
  $("#fileForm").onsubmit=uploadFile;
}
async function uploadFile(e){
  e.preventDefault(); const file=$("#fileInput").files[0]; if(!file)return toast(tr("chooseFile"));
  const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"_"); const path=`${state.user.id}/${state.project.id}/${Date.now()}-${safe}`;
  const {error:upErr}=await supabase.storage.from("project-files").upload(path,file,{upsert:false}); if(upErr)return toast(upErr.message);
  const {error}=await supabase.from("project_files").insert({project_id:state.project.id,file_name:file.name,storage_path:path,file_type:file.type,category:$("#fileCategory").value});
  if(error)return toast(error.message); toast(tr("uploaded")); await loadProjectData(); render();
}

function renderConditions(){
  const rows=state.conditions.map(c=>`<tr><td>${esc(c.discipline)}</td><td>${esc(c.item_name)}</td><td><span class="pill ${c.condition==="good"||c.condition==="excellent"?"good":c.condition==="poor"||c.condition==="replace"?"bad":"warn"}">${esc(c.condition)}</span></td><td>${esc(c.priority)}</td><td>${esc(c.notes||"")}</td></tr>`).join("");
  $("#pageContent").innerHTML=`
  <div class="panel"><h3>${tr("addAssessment")}</h3><form id="conditionForm" class="form-grid">
    <div><label>${tr("discipline")}</label><select name="discipline" class="field"><option>Architecture</option><option>Structure</option><option>Electrical</option><option>Plumbing</option><option>HVAC</option><option>Fire Systems</option><option>Facade</option></select></div>
    <div><label>${tr("item")}</label><input name="item_name" class="field" required></div>
    <div><label>${tr("rating")}</label><select name="condition" class="field"><option value="excellent">Excellent</option><option value="good">Good</option><option value="fair">Fair</option><option value="poor">Poor</option><option value="replace">Replace</option></select></div>
    <div><label>${tr("priority")}</label><select name="priority" class="field"><option>urgent</option><option>high</option><option selected>medium</option><option>low</option><option>cosmetic</option></select></div>
    <div class="full"><label>${tr("notes")}</label><textarea name="notes" class="field"></textarea></div>
    <div class="full"><button class="primary-btn">${tr("addAssessment")}</button></div>
  </form></div>
  ${rows?`<div class="table-wrap"><table><thead><tr><th>${tr("discipline")}</th><th>${tr("item")}</th><th>${tr("rating")}</th><th>${tr("priority")}</th><th>${tr("notes")}</th></tr></thead><tbody>${rows}</tbody></table></div>`:`<div class="empty">${tr("noAssessment")}</div>`}`;
  $("#conditionForm").onsubmit=addCondition;
}
async function addCondition(e){e.preventDefault();const p=Object.fromEntries(new FormData(e.target));p.project_id=state.project.id;const{error}=await supabase.from("condition_items").insert(p);if(error)return toast(error.message);toast(tr("created"));await loadProjectData();render();}

function renderScenarios(){
 const rows=state.scenarios.map(s=>`<tr><td><strong>${esc(s.name)}</strong><br><small>${esc(s.description||"")}</small></td><td>${esc(s.objective||"—")}</td><td>${money(s.estimated_cost)}</td><td>${esc(s.estimated_duration_days||"—")}</td><td><span class="pill">${esc(s.status)}</span></td></tr>`).join("");
 $("#pageContent").innerHTML=`
 <div class="notice" style="margin-bottom:16px">Generated scenarios are conceptual planning tools. Structural and MEP changes require specialist review.</div>
 <div class="panel"><h3>${tr("newScenario")}</h3><form id="scenarioForm" class="form-grid">
  <div><label>Name</label><input name="name" class="field" required></div>
  <div><label>${tr("objective")}</label><select name="objective" class="field"><option>Maximum Units</option><option>Minimum Renovation Cost</option><option>Minimum Structural Changes</option><option>Best Space Efficiency</option><option>Balanced Layout</option></select></div>
  <div class="full"><label>${tr("description")}</label><textarea name="description" class="field"></textarea></div>
  <div><label>${tr("estCost")} (SAR)</label><input name="estimated_cost" type="number" class="field"></div>
  <div><label>${tr("duration")}</label><input name="estimated_duration_days" type="number" class="field"></div>
  <div class="full"><button class="primary-btn">${tr("addScenario")}</button></div>
 </form></div>
 ${rows?`<div class="table-wrap"><table><thead><tr><th>Scenario</th><th>${tr("objective")}</th><th>${tr("estCost")}</th><th>${tr("duration")}</th><th>${tr("status")}</th></tr></thead><tbody>${rows}</tbody></table></div>`:`<div class="empty">${tr("noScenarios")}</div>`}`;
 $("#scenarioForm").onsubmit=addScenario;
}
async function addScenario(e){e.preventDefault();const p=Object.fromEntries(new FormData(e.target));p.project_id=state.project.id;p.estimated_cost=p.estimated_cost?Number(p.estimated_cost):null;p.estimated_duration_days=p.estimated_duration_days?Number(p.estimated_duration_days):null;const{error}=await supabase.from("scenarios").insert(p);if(error)return toast(error.message);toast(tr("created"));await loadProjectData();render();}

function renderBoq(){
 const total=state.boq.reduce((a,b)=>a+Number(b.quantity||0)*Number(b.rate||0),0);
 const rows=state.boq.map(b=>`<tr><td>${esc(b.category||"—")}</td><td>${esc(b.description)}</td><td>${esc(b.unit||"—")}</td><td>${b.quantity}</td><td>${money(b.rate)}</td><td><strong>${money(Number(b.quantity||0)*Number(b.rate||0))}</strong></td></tr>`).join("");
 $("#pageContent").innerHTML=`
 <div class="grid cards" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:16px"><div class="card stat"><strong>${state.boq.length}</strong><span>${tr("boqItem")}</span></div><div class="card stat"><strong>${money(total)}</strong><span>${tr("estimatedTotal")}</span></div></div>
 <div class="panel"><h3>${tr("addBoq")}</h3><form id="boqForm" class="form-grid">
  <div><label>${tr("category")}</label><select name="category" class="field"><option>Demolition</option><option>Walls</option><option>Flooring</option><option>Ceiling</option><option>Painting</option><option>Doors</option><option>Kitchen</option><option>Bathrooms</option><option>Electrical</option><option>Plumbing</option><option>HVAC</option><option>Facade</option></select></div>
  <div><label>${tr("description")}</label><input name="description" class="field" required></div>
  <div><label>${tr("unit")}</label><input name="unit" class="field" placeholder="m² / item / lot"></div>
  <div><label>${tr("qty")}</label><input name="quantity" type="number" step="0.01" class="field" required></div>
  <div><label>${tr("rate")} (SAR)</label><input name="rate" type="number" step="0.01" class="field" required></div>
  <div style="align-self:end"><button class="primary-btn">${tr("addBoq")}</button></div>
 </form></div>
 ${rows?`<div class="table-wrap"><table><thead><tr><th>${tr("category")}</th><th>${tr("description")}</th><th>${tr("unit")}</th><th>${tr("qty")}</th><th>${tr("rate")}</th><th>${tr("total")}</th></tr></thead><tbody>${rows}</tbody></table></div>`:`<div class="empty">${tr("noBoq")}</div>`}`;
 $("#boqForm").onsubmit=addBoq;
}
async function addBoq(e){e.preventDefault();const p=Object.fromEntries(new FormData(e.target));p.project_id=state.project.id;p.quantity=Number(p.quantity);p.rate=Number(p.rate);const{error}=await supabase.from("boq_items").insert(p);if(error)return toast(error.message);toast(tr("created"));await loadProjectData();render();}

bootstrap();
