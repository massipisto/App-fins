/* FINLAB · i18n — ES / IT / DE
 * Script clásico (no módulo). Expone window.I18N = { t, setLang, getLang }.
 * Uso en HTML:  data-i18n="clave"  |  data-i18n-html="clave"  |  data-i18n-alt="clave"
 *               data-i18n-title="clave"  |  data-i18n-aria="clave"
 * Al cambiar de idioma se dispara el evento "langchange" en window.
 * Cada entrada de T es:  "clave": [alemán, español, italiano]
 */
(function () {
  const LANGS = { es: "ES", it: "IT", de: "DE" };
  const ORDER = ["de", "es", "it"];
  const DEFAULT = "es";
  const STORE = "finlab-lang";

  const T = {
    /* ───────── Página de inicio ───────── */
    "page.title": ["FINLAB · Setup wählen", "FINLAB · Elige tu setup", "FINLAB · Scegli il setup"],
    "step.eyebrow": ["SCHRITT 01 / FINNENART", "PASO 01 / TIPO DE QUILLA", "PASSO 01 / TIPO DI DERIVA"],
    "step.h1": ["Womit surfst<br><em>du?</em>", "¿Con qué<br><em>surfeas?</em>", "Con cosa<br><em>surfi?</em>"],
    "step.sub": [
      "Wähle die Finnenart, mit der du starten möchtest. Anschließend kannst du Form, Profil und Geometrie frei anpassen.",
      "Elige el tipo de quilla con el que quieres empezar. Después podrás ajustar libremente la forma, el perfil y la geometría.",
      "Scegli il tipo di deriva con cui vuoi iniziare. In seguito potrai adattare liberamente forma, profilo e geometria."
    ],
    "setup.thruster.title": ["Sidefin · Thruster", "Quilla lateral · Thruster", "Deriva laterale · Thruster"],
    "setup.thruster.text": [
      "Asymmetrische Seitenfinne als Ausgangspunkt für dein Thruster-Setup.",
      "Quilla lateral asimétrica como punto de partida para tu setup thruster.",
      "Deriva laterale asimmetrica come punto di partenza per il tuo setup thruster."
    ],
    "setup.thruster.alt": ["Thruster: drei Finnen", "Thruster: tres quillas", "Thruster: tre derive"],
    "setup.twin.title": ["Keel · Twin", "Keel · Twin", "Keel · Twin"],
    "setup.twin.text": [
      "Breite, flachere Seitenfinne für klassische Twin-Fin-Boards.",
      "Quilla lateral más ancha y plana para tablas twin fin clásicas.",
      "Deriva laterale più larga e piatta per tavole twin fin classiche."
    ],
    "setup.twin.alt": ["Twin: zwei Keel-Finnen", "Twin: dos quillas keel", "Twin: due derive keel"],
    "setup.quad.title": ["Quad · Sidefin", "Quad · Quilla lateral", "Quad · Deriva laterale"],
    "setup.quad.text": [
      "Seitenfinne als Basis für vordere oder hintere Quad-Finnen.",
      "Quilla lateral como base para las quillas delanteras o traseras del quad.",
      "Deriva laterale come base per le derive anteriori o posteriori del quad."
    ],
    "setup.quad.alt": ["Quad: vier Finnen", "Quad: cuatro quillas", "Quad: quattro derive"],
    "setup.single.title": ["Singlefin", "Monoquilla", "Single fin"],
    "setup.single.text": [
      "Eine einzelne Centerfinne. Immer mit US Box.",
      "Una única quilla central. Siempre con US Box.",
      "Una sola deriva centrale. Sempre con US Box."
    ],
    "setup.single.alt": ["Singlefin: eine Centerfinne", "Monoquilla: una quilla central", "Single fin: una deriva centrale"],
    "setup.choose": ["Setup auswählen ↗", "Elegir setup ↗", "Scegli il setup ↗"],
    "setup.chooseCenter": ["Centerfin gestalten ↗", "Diseñar quilla central ↗", "Progetta la deriva centrale ↗"],
    "footer.hint": ["Wähle ein Setup, um fortzufahren.", "Elige un setup para continuar.", "Scegli un setup per continuare."],

    /* ───────── Descripciones de forma (app.js) ───────── */
    "desc.keel": [
      "Breite, eher kompakte Fläche mit ausgeprägter Tip-Chord – typisch für eine klassische Keel-Finne.",
      "Superficie ancha y más bien compacta con una cuerda de punta marcada, típica de una quilla keel clásica.",
      "Superficie ampia e piuttosto compatta con una corda di punta marcata, tipica di una classica deriva keel."
    ],
    "desc.upright": [
      "Aufrechter Shape mit stärker verjüngter Spitze und wenig Sweep. Die Fläche sitzt näher an der Senkrechten.",
      "Forma erguida con la punta más afilada y poco sweep. La superficie queda más cerca de la vertical.",
      "Forma eretta con la punta più rastremata e poco sweep. La superficie resta più vicina alla verticale."
    ],
    "desc.raked": [
      "Deutlich nach hinten gezogene Vorderkante und schlankere Spitze – ein stärker geraketer Umriss.",
      "Borde de ataque claramente echado hacia atrás y punta más fina: un contorno con mucho rake.",
      "Bordo d'attacco nettamente spostato all'indietro e punta più sottile: un profilo con molto rake."
    ],
    "desc.pivot": [
      "Relativ gerade Vorder- und Hinterkante mit moderater Verjüngung – ein eher klassischer Pivot-Umriss.",
      "Bordes de ataque y de salida relativamente rectos con un afinado moderado: un contorno pivot más clásico.",
      "Bordi d'attacco e d'uscita relativamente dritti con una rastremazione moderata: un profilo pivot più classico."
    ],

    /* ───────── Diseñador: cabecera ───────── */
    "head.h1": ["Forme deine <em>Finne.</em>", "Da forma a tu <em>quilla.</em>", "Dai forma alla tua <em>deriva.</em>"],
    "head.sub": [
      "Parametrische Finnenkonstruktion · Maße in mm · Live-3D-Modell",
      "Construcción paramétrica de quillas · Medidas en mm · Modelo 3D en vivo",
      "Costruzione parametrica delle derive · Misure in mm · Modello 3D live"
    ],
    "head.status": ["Lokale Geometrie", "Geometría local", "Geometria locale"],
    "head.reset": ["Zurücksetzen", "Restablecer", "Ripristina"],

    /* ───────── Vistas ───────── */
    "views.eyebrow": ["LIVE-KONSTRUKTIONSANSICHTEN", "VISTAS DE CONSTRUCCIÓN EN VIVO", "VISTE DI COSTRUZIONE LIVE"],
    "views.hint": [
      "Alle Ansichten gleichzeitig · Maße in mm",
      "Todas las vistas a la vez · Medidas en mm",
      "Tutte le viste insieme · Misure in mm"
    ],
    "view.top": ["Draufsicht", "Vista superior", "Vista dall'alto"],
    "view.top.sub": ["Profil an der Base", "Perfil en la base", "Profilo alla base"],
    "view.front": ["Frontansicht", "Vista frontal", "Vista frontale"],
    "view.front.sub": ["Dickenverlauf", "Evolución del espesor", "Andamento dello spessore"],
    "view.side": ["Seitenansicht", "Vista lateral", "Vista laterale"],
    "view.side.sub": ["Outline", "Contorno", "Contorno"],
    "view.3d": ["3D-Modell", "Modelo 3D", "Modello 3D"],
    "view.3d.sub": ["Interaktiv drehen & zoomen", "Gira y haz zoom", "Ruota e ingrandisci"],
    "view.loading": ["3D-Modell wird geladen …", "Cargando el modelo 3D …", "Caricamento del modello 3D …"],
    "view.drag": ["Drag: Drehen", "Arrastrar: girar", "Trascina: ruota"],
    "view.zoom": ["Pinch/Scroll: Zoom", "Pellizcar/Scroll: zoom", "Pizzica/Scroll: zoom"],
    "aria.top": ["Draufsicht der Finne", "Vista superior de la quilla", "Vista dall'alto della deriva"],
    "aria.front": ["Frontansicht der Finne", "Vista frontal de la quilla", "Vista frontale della deriva"],
    "aria.side": ["Seitenansicht der Finne", "Vista lateral de la quilla", "Vista laterale della deriva"],
    "aria.foil": [
      "Querschnitt des Finnenprofils",
      "Sección transversal del perfil de la quilla",
      "Sezione trasversale del profilo della deriva"
    ],

    /* ───────── Pestañas y panel Forma ───────── */
    "tab.shape": ["01 Form", "01 Forma", "01 Forma"],
    "tab.foil": ["02 Profil", "02 Perfil", "02 Profilo"],
    "tab.setup": ["03 Setup", "03 Setup", "03 Setup"],
    "tab.export": ["04 Export", "04 Exportar", "04 Esporta"],
    "shape.eyebrow": ["OUTLINE", "CONTORNO", "CONTORNO"],
    "shape.title": ["Finnenform", "Forma de la quilla", "Forma della deriva"],
    "field.finType": ["Finnenmodell", "Modelo de quilla", "Modello di deriva"],
    "fin.center.opt": ["Centerfin · symmetrisch", "Quilla central · simétrica", "Deriva centrale · simmetrica"],
    "fin.side.opt": ["Sidefin · asymmetrisch", "Quilla lateral · asimétrica", "Deriva laterale · asimmetrica"],
    "fin.center": ["Centerfin", "Quilla central", "Deriva centrale"],
    "fin.side": ["Sidefin", "Quilla lateral", "Deriva laterale"],
    "field.template": ["Template", "Plantilla", "Modello di partenza"],
    "tpl.upright": ["Upright · Centerfin", "Upright · Quilla central", "Upright · Deriva centrale"],
    "tpl.hpsb": ["Thruster · Referenz-Outline", "Thruster · Contorno de referencia", "Thruster · Contorno di riferimento"],
    "tpl.raked": ["Raked · BC Fin 7 (Annäherung)", "Raked · BC Fin 7 (aproximación)", "Raked · BC Fin 7 (approssimazione)"],
    "tpl.pivot": [
      "Pivot Singlefin · BC Fin 15 (Annäherung)",
      "Pivot monoquilla · BC Fin 15 (aproximación)",
      "Pivot single fin · BC Fin 15 (approssimazione)"
    ],
    "tpl.keel": ["Keel · BC Fin 25 (Annäherung)", "Keel · BC Fin 25 (aproximación)", "Keel · BC Fin 25 (approssimazione)"],
    "tpl.custom": ["Custom / SVG-Import", "Personalizado / importar SVG", "Personalizzato / importa SVG"],

    "ctl.height": ["Height", "Altura", "Altezza"],
    "ctl.base": ["Root chord", "Cuerda en la base", "Corda alla base"],
    "ctl.tip": ["Tip chord", "Cuerda en la punta", "Corda alla punta"],
    "ctl.sweep": ["Sweep / Rake", "Sweep / Rake", "Sweep / Rake"],
    "ctl.thickness": ["Max. thickness", "Espesor máx.", "Spessore max."],
    "ctl.foilPos": ["Max. thickness position", "Posición del espesor máx.", "Posizione dello spessore max."],
    "ctl.cant": ["Cant angle", "Ángulo de cant", "Angolo di cant"],
    "ctl.concavity": ["Innenkonkavität", "Concavidad interior", "Concavità interna"],

    "editor.add": ["+ Punkt", "+ Punto", "+ Punto"],
    "editor.del": ["− Punkt", "− Punto", "− Punto"],
    "editor.hint": [
      "Punkte direkt in der Seitenansicht ziehen. Endpunkte bleiben fixiert. Die Kurve wird weich interpoliert.",
      "Arrastra los puntos directamente en la vista lateral. Los extremos quedan fijos. La curva se interpola suavemente.",
      "Trascina i punti direttamente nella vista laterale. Gli estremi restano fissi. La curva viene interpolata in modo morbido."
    ],
    "import.label": ["Eigene Outline importieren (SVG)", "Importar tu propio contorno (SVG)", "Importa il tuo contorno (SVG)"],
    "import.clear": ["Importierte Kontur entfernen", "Quitar contorno importado", "Rimuovi contorno importato"],
    "status.default": ["Standard-Outline aktiv", "Contorno estándar activo", "Contorno standard attivo"],
    "status.template": [
      "Blending-Curves-inspirierte Startkontur",
      "Contorno inicial inspirado en Blending Curves",
      "Contorno iniziale ispirato a Blending Curves"
    ],
    "status.points": ["Stützpunkte · importiert", "puntos de apoyo · importado", "punti di appoggio · importato"],
    "status.fail": ["Import fehlgeschlagen:", "Error al importar:", "Importazione non riuscita:"],
    "note.shape.a": [
      "Die Thruster-Startkontur basiert auf deiner bereitgestellten Vorlage. Weitere Ausgangsformen nach den Formfamilien von Blending Curves. Referenzen:",
      "El contorno inicial del thruster se basa en la plantilla que aportaste. El resto de formas de partida siguen las familias de formas de Blending Curves. Referencias:",
      "Il contorno iniziale del thruster si basa sul modello che hai fornito. Le altre forme di partenza seguono le famiglie di forme di Blending Curves. Riferimenti:"
    ],
    "note.shape.b": [
      "Die weiteren Konturen sind Annäherungen, keine digitalisierten Original-PDFs.",
      "Los demás contornos son aproximaciones, no los PDF originales digitalizados.",
      "Gli altri contorni sono approssimazioni, non i PDF originali digitalizzati."
    ],

    /* ───────── Panel Perfil ───────── */
    "foil.eyebrow": ["QUERSCHNITT", "SECCIÓN TRANSVERSAL", "SEZIONE TRASVERSALE"],
    "foil.title": ["Profil & Dicke", "Perfil y espesor", "Profilo e spessore"],
    "field.foilType": ["Profiltyp", "Tipo de perfil", "Tipo di profilo"],
    "foil.symmetric": ["Symmetrisch 50/50", "Simétrico 50/50", "Simmetrico 50/50"],
    "foil.flat": ["Flat Foil · flache Innenseite", "Flat foil · cara interior plana", "Flat foil · lato interno piatto"],
    "foil.concave": [
      "Concave · leicht konkav innen",
      "Concave · interior ligeramente cóncavo",
      "Concave · interno leggermente concavo"
    ],
    "foil.caption": [
      "Profilquerschnitt an der größten Dicke",
      "Sección del perfil en el espesor máximo",
      "Sezione del profilo allo spessore massimo"
    ],
    "note.foil": [
      "Vereinfachtes parametrisches Foil. Für hydrodynamisch validierte Profile müssen wir später Messdaten bzw. definierte Profilkoordinaten hinterlegen.",
      "Foil paramétrico simplificado. Para perfiles validados hidrodinámicamente tendremos que añadir más adelante datos de medición o coordenadas de perfil definidas.",
      "Foil parametrico semplificato. Per profili validati idrodinamicamente dovremo inserire in seguito dati di misura o coordinate di profilo definite."
    ],

    /* ───────── Panel Setup ───────── */
    "asm.eyebrow": ["MONTAGE", "MONTAJE", "MONTAGGIO"],
    "asm.title": ["Setup", "Setup", "Setup"],
    "field.setup": ["Finnen-Setup", "Setup de quillas", "Setup delle derive"],
    "opt.single": ["Singlefin", "Monoquilla", "Single fin"],
    "field.box": ["Finbox-System", "Sistema de cajetines", "Sistema di attacchi (box)"],
    "box.none": ["Ohne Box / freie Base", "Sin caja / base libre", "Senza box / base libera"],
    "note.setup": [
      "Aktuell wird eine einzelne Referenzfinne modelliert. Die vollständige Board-Anordnung und die maßhaltigen Box-Aufnahmen folgen als eigener Konstruktionsschritt.",
      "Por ahora se modela una única quilla de referencia. La disposición completa en la tabla y los alojamientos de caja con medidas exactas llegarán como un paso de construcción aparte.",
      "Per ora viene modellata una sola deriva di riferimento. La disposizione completa sulla tavola e gli alloggiamenti box con misure precise seguiranno come fase di costruzione a parte."
    ],

    /* ───────── Panel Export ───────── */
    "export.eyebrow": ["FERTIGUNG", "FABRICACIÓN", "PRODUZIONE"],
    "export.title": ["Export", "Exportar", "Esporta"],
    "ex.stl.p": [
      "Geschlossener triangulierter Körper für CAM-Import und 3D-Druck.",
      "Cuerpo triangulado cerrado para importar en CAM e imprimir en 3D.",
      "Corpo triangolato chiuso per importazione CAM e stampa 3D."
    ],
    "ex.stl.b": ["STL herunterladen", "Descargar STL", "Scarica STL"],
    "ex.svg.p": [
      "Vektor-Kontur zum Weiterbearbeiten oder für den erneuten Import.",
      "Contorno vectorial para seguir editándolo o volver a importarlo.",
      "Contorno vettoriale da modificare ulteriormente o da reimportare."
    ],
    "ex.svg.b": ["SVG herunterladen", "Descargar SVG", "Scarica SVG"],
    "ex.dxf.p": [
      "Kontur der Seitenansicht als geschlossene Polylinie.",
      "Contorno de la vista lateral como polilínea cerrada.",
      "Contorno della vista laterale come polilinea chiusa."
    ],
    "ex.dxf.b": ["DXF herunterladen", "Descargar DXF", "Scarica DXF"],
    "ex.json.t": ["Projektdatei · JSON", "Archivo de proyecto · JSON", "File di progetto · JSON"],
    "ex.json.p": [
      "Alle Parameter zum späteren Weiterbearbeiten.",
      "Todos los parámetros para seguir trabajando más adelante.",
      "Tutti i parametri per continuare a lavorarci in seguito."
    ],
    "ex.json.b": ["Projekt speichern", "Guardar proyecto", "Salva progetto"],
    "note.export": [
      "Beta-Export: Maßeinheit mm. STL ist ein Mesh und noch keine CAM-Strategie. Vor Fertigung in FreeCAD/MeshLab prüfen.",
      "Exportación beta: unidad mm. El STL es una malla y todavía no una estrategia CAM. Revísalo en FreeCAD/MeshLab antes de fabricar.",
      "Esportazione beta: unità mm. L'STL è una mesh e non ancora una strategia CAM. Verificalo in FreeCAD/MeshLab prima della produzione."
    ],

    /* ───────── Lecturas y pie ───────── */
    "ro.height": ["HÖHE", "ALTURA", "ALTEZZA"],
    "ro.base": ["BASIS", "BASE", "BASE"],
    "ro.tip": ["TIP-CHORD", "CUERDA PUNTA", "CORDA PUNTA"],
    "ro.thick": ["MAX. DICKE", "ESPESOR MÁX.", "SPESSORE MAX."],
    "ro.area": ["FLÄCHE · GESCH.", "ÁREA · EST.", "AREA · STIM."],
    "ro.volume": ["VOLUMEN · GESCH.", "VOLUMEN · EST.", "VOLUME · STIM."],
    "footer.note": [
      "Eigenständige Geometrie · Beta 0.2 · Nicht fertigungstechnisch validiert",
      "Geometría propia · Beta 0.2 · Sin validar para fabricación",
      "Geometria autonoma · Beta 0.2 · Non validato per la produzione"
    ],

    /* ───────── Página Sistema de quillas (fin-system) ───────── */
    "sys.back": ["← Zurück zur Setup-Auswahl", "← Volver a la selección de setup", "← Torna alla selezione del setup"],
    "sys.eyebrow": ["SCHRITT 02 / FINNEN-SYSTEM", "PASO 02 / SISTEMA DE QUILLAS", "PASSO 02 / SISTEMA DI DERIVE"],
    "sys.h1em": ["Finnen-System?", "¿Sistema de quillas?", "Sistema di derive?"],
    "sys.fallback": ["Finnen-Setup", "Setup de quillas", "Setup delle derive"],
    "sys.sub": [
      "Wähle zwischen Futures und FCS I. Danach öffnet sich die passende Gestaltungsseite.",
      "Elige entre Futures y FCS I. Después se abrirá la página de diseño correspondiente.",
      "Scegli tra Futures e FCS I. Poi si aprirà la pagina di progettazione corrispondente."
    ],
    "sys.futures.alt": ["Schematische Futures Finbox", "Esquema de una caja Futures", "Schema di un box Futures"],
    "sys.futures.p": [
      "Ein durchgehender Finnenkasten mit Fixierung über eine Schraube.",
      "Una caja de quilla continua con fijación mediante un tornillo.",
      "Un unico box continuo con fissaggio tramite una vite."
    ],
    "sys.fcs1.alt": ["Schematische FCS I Plugs", "Esquema de los plugs FCS I", "Schema dei plug FCS I"],
    "sys.fcs1.p": [
      "Zwei separate Plugs mit Schraubfixierung.",
      "Dos plugs separados con fijación por tornillo.",
      "Due plug separati con fissaggio a vite."
    ],
    "sys.choose": ["System auswählen ↗", "Elegir sistema ↗", "Scegli il sistema ↗"],
    "sys.footer": [
      "Im nächsten Schritt geht es zur individuellen Finnen-Gestaltung.",
      "En el siguiente paso se diseña la quilla a tu medida.",
      "Nel passo successivo si passa alla progettazione personalizzata della deriva."
    ],

    /* ───────── Errores ───────── */
    "err.load3d": ["Die 3D-Datei konnte nicht geladen werden.", "No se pudo cargar el archivo 3D.", "Impossibile caricare il file 3D."],
    "err.unknownJs": [
      "Unbekannter JavaScript- oder Netzwerkfehler",
      "Error desconocido de JavaScript o de red",
      "Errore sconosciuto di JavaScript o di rete"
    ],
    "err.checkNet": [
      "Prüfe die Internetverbindung und lade die Seite erneut.",
      "Comprueba la conexión a internet y recarga la página.",
      "Controlla la connessione a internet e ricarica la pagina."
    ],
    "err.preview3d": ["Die 3D-Vorschau ist fehlgeschlagen.", "Falló la vista previa 3D.", "Anteprima 3D non riuscita."],
    "err.unknown": ["Unbekannter Fehler", "Error desconocido", "Errore sconosciuto"],
    "err.init3d": [
      "3D-Vorschau konnte nicht gestartet werden.",
      "No se pudo iniciar la vista previa 3D.",
      "Impossibile avviare l'anteprima 3D."
    ],
    "err.webgl": [
      "Bitte Safari neu laden oder WebGL in den Geräteeinstellungen prüfen.",
      "Recarga Safari o revisa WebGL en los ajustes del dispositivo.",
      "Ricarica Safari o controlla WebGL nelle impostazioni del dispositivo."
    ],
    "err.svgBroken": ["Die SVG-Datei ist fehlerhaft.", "El archivo SVG está dañado.", "Il file SVG è difettoso."],
    "err.svgNone": [
      "Keine SVG-Kontur gefunden (path, polygon oder polyline).",
      "No se encontró ningún contorno SVG (path, polygon o polyline).",
      "Nessun contorno SVG trovato (path, polygon o polyline)."
    ],
    "err.fewPoints": [
      "Die Kontur enthält zu wenige Punkte.",
      "El contorno tiene muy pocos puntos.",
      "Il contorno contiene troppo pochi punti."
    ],
    "err.noArea": [
      "Die Kontur hat keine brauchbare Fläche.",
      "El contorno no tiene un área utilizable.",
      "Il contorno non ha un'area utilizzabile."
    ],
    "err.notClosed": [
      "Die importierte Kontur ist nicht geschlossen oder hat keine Fläche.",
      "El contorno importado no está cerrado o no tiene área.",
      "Il contorno importato non è chiuso o non ha area."
    ],
    "err.notFinOutline": [
      "Die SVG-Kontur muss eine geschlossene Finnen-Seitenkontur sein.",
      "El contorno SVG debe ser un contorno lateral cerrado de quilla.",
      "Il contorno SVG deve essere un contorno laterale chiuso di deriva."
    ]
  };

  // { de:{clave:texto}, es:{…}, it:{…} }
  const dict = { de: {}, es: {}, it: {} };
  Object.keys(T).forEach(k => ORDER.forEach((l, i) => { dict[l][k] = T[k][i]; }));

  function detect() {
    let l = null;
    try { l = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (!l) { try { l = localStorage.getItem(STORE); } catch (e) {} }
    if (!l) l = (navigator.language || "").slice(0, 2).toLowerCase();
    return dict[l] ? l : DEFAULT;
  }

  let lang = detect();

  function t(key) {
    return (dict[lang] && dict[lang][key]) || (dict[DEFAULT] && dict[DEFAULT][key]) || key;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => { el.setAttribute("alt", t(el.dataset.i18nAlt)); });
    document.querySelectorAll("[data-i18n-title]").forEach(el => { el.setAttribute("title", t(el.dataset.i18nTitle)); });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    document.querySelectorAll(".lang-switch button").forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function setLang(l) {
    if (!dict[l]) return;
    lang = l;
    try { localStorage.setItem(STORE, l); } catch (e) {}
    apply();
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: l } }));
  }

  function buildSwitcher() {
    const bar = document.querySelector(".topbar");
    if (!bar || bar.querySelector(".lang-switch")) return;
    const right = document.createElement("div");
    right.className = "topbar-right";
    const version = bar.querySelector(".version");
    const sw = document.createElement("div");
    sw.className = "lang-switch";
    sw.setAttribute("role", "tablist");
    sw.setAttribute("aria-label", "Idioma / Lingua / Sprache");
    Object.keys(LANGS).forEach(code => {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.lang = code;
      b.setAttribute("role", "tab");
      b.textContent = LANGS[code];
      b.addEventListener("click", () => setLang(code));
      sw.appendChild(b);
    });
    right.appendChild(sw);
    if (version) right.appendChild(version);
    bar.appendChild(right);
  }

  function init() {
    buildSwitcher();
    apply();
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  window.I18N = { t, setLang, getLang: () => lang };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
