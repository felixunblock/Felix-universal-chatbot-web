// SmartChat website widget loader. Usage:
// <script src="https://<host>/<base>/widget.js" data-key="WIDGET_KEY"
//         data-accent="#5B8DEF" data-name="Help"></script>
(function () {
  var s = document.currentScript;
  if (!s) return;
  var key = s.getAttribute("data-key") || "";
  if (!key) return;
  var accent = s.getAttribute("data-accent") || "#5B8DEF";
  if (!/^#[0-9a-fA-F]{6}$/.test(accent)) accent = "#5B8DEF";
  var name = s.getAttribute("data-name") || "Assistant";
  var base = s.src.replace(/widget\.js.*$/, "");
  var embedUrl = base + "embed.html?key=" + encodeURIComponent(key) +
    "&accent=" + encodeURIComponent(accent) + "&name=" + encodeURIComponent(name);

  var open = sessionStorage.getItem("scw-open") === "1";

  // Floating button.
  var btn = document.createElement("button");
  btn.setAttribute("aria-label", name);
  btn.style.cssText =
    "position:fixed;bottom:20px;right:20px;width:56px;height:56px;border-radius:50%;" +
    "border:0;cursor:pointer;z-index:2147483000;background:" + accent + ";" +
    "box-shadow:0 4px 16px rgba(0,0,0,.35);display:flex;align-items:center;" +
    "justify-content:center;transition:transform .15s";
  btn.innerHTML =
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none">' +
    '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-4 4a.6.6 0 0 1-1-.45V5.5Z" fill="#fff"/></svg>';
  btn.onmouseenter = function () { btn.style.transform = "scale(1.06)"; };
  btn.onmouseleave = function () { btn.style.transform = "scale(1)"; };

  // Chat iframe panel.
  var frame = document.createElement("iframe");
  frame.title = name;
  frame.style.cssText =
    "position:fixed;bottom:88px;right:20px;width:370px;height:560px;max-width:calc(100vw - 32px);" +
    "max-height:calc(100vh - 110px);border:0;border-radius:16px;z-index:2147483000;" +
    "box-shadow:0 8px 40px rgba(0,0,0,.45);display:none;background:#111318";

  function setOpen(v) {
    open = v;
    frame.style.display = v ? "block" : "none";
    sessionStorage.setItem("scw-open", v ? "1" : "0");
    if (v && !frame.src) frame.src = embedUrl;
  }
  btn.addEventListener("click", function () { setOpen(!open); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) setOpen(false);
  });

  function mount() {
    document.body.appendChild(btn);
    document.body.appendChild(frame);
    if (open) setOpen(true);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
