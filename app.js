const pageLoadTime = 30000;
const clickDelay = 3000;

$(document).ready(() => {
  fetch("https://raw.githubusercontent.com/ByWaleed/Brightspace-Downloader/main/modules.json")
    .then((response) => response.json())
    .then((modules) => {
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        const url =
          "https://brightspace.hud.ac.uk/d2l/le/content/" + module.id + "/Home";

        const frame = createFrame(url, module.id);
        document.body.appendChild(frame);

        $(frame.contentDocument).ready(function (event) {
          setTimeout(() => {
            let frameDoc = frame.contentDocument;
            frameDoc.getElementById("TreeItemTOC").click();
            setTimeout(() => {
              let mainSection = frameDoc.getElementById("d2l_two_panel_selector_main");
              mainSection.getElementsByTagName('button')[0].click();
            }, clickDelay);
          }, pageLoadTime);
        });
      }
    });

  const createFrame = (url, id) => {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", url);
    ifrm.setAttribute("id", id);
    ifrm.style.width = "1080px";
    ifrm.style.height = "500px";
    return ifrm;
  };
});
