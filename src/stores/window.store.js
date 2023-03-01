import { reactive } from "vue";
const ipcRenderer = window.require("electron").ipcRenderer;

export default reactive({
  view: null,

  changeView(view) {
    this.view = view.view;
    ipcRenderer.postMessage("changeView", view);
  },

  restartApp() {
    ipcRenderer.postMessage("reload");
  },
});

// win.setShowInTaskbar(false);
