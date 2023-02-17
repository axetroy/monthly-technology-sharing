class HistoryRouter {
  constructor() {
    this.routers = {};

    this.listenPopState();
    this.listenLink();
  }

  // 监听popstate
  listenPopState() {
    window.addEventListener(
      "popstate",
      (e) => {
        const state = e.state || {};
        const path = state.path || "";
        this.handle(path);
      },
      false
    );
  }

  // 全局监听 a 链接
  listenLink() {
    window.addEventListener(
      "click",
      (e) => {
        let dom = e.target;
        if (dom.tagName.toUpperCase() === "A" && dom.getAttribute("href")) {
          e.preventDefault();
          this.push(dom.getAttribute("href"));
        }
      },
      false
    );
  }

  register(path, callback = function () {}) {
    this.routers[path] = callback;
  }
  notFound(callback = function () {}) {
    this.routers["__NOT__FOUND__"] = callback;
  }
  push(path) {
    history.pushState({ path }, null, path);
    this.handle(path);
  }
  replace(path) {
    history.replaceState({ path }, null, path);
    this.handle(path);
  }
  handle(path) {
    let handler;

    if (!this.routers.hasOwnProperty(path)) {
      handler = this.routers["__NOT__FOUND__"] || function () {};
    } else {
      handler = this.routers[path];
    }

    handler.call(this);
  }

  load() {
    const path = location.pathname;

    this.handle(path);
  }
}

const router = new HistoryRouter();
let container = document.getElementById("container");

router.register("/", () => (container.innerHTML = "我是首页"));

router.register("/page1", () => (container.innerHTML = "我是page1"));
router.register("/page2", () => (container.innerHTML = "我是page2"));
router.register("/page3", () => (container.innerHTML = "我是page3"));

document.getElementById("btn").onclick = () => router.push("/page2");

router.notFound(() => (container.innerHTML = "页面未找到"));

router.load();
