const p=new URLSearchParams(location.search),setup=p.get("setup")||"thruster",labels={thruster:"Thruster",twin:"Twin · Keel Fins",quad:"Quad"};
const tr=k=>window.I18N?window.I18N.t(k):k;
function render(){document.getElementById("page-title").innerHTML=(labels[setup]||tr("sys.fallback"))+"<br><em>"+tr("sys.h1em")+"</em>";document.getElementById("page-sub").textContent=tr("sys.sub");}
document.querySelectorAll("[data-system]").forEach(a=>a.href="../designer/index.html?setup="+encodeURIComponent(setup)+"&system="+encodeURIComponent(a.dataset.system));
window.addEventListener("langchange",render);render();
