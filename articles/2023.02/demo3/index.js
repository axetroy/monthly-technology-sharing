class HashRouter {
  constructor() {
    /**
     * 用于存储不同hash值对应的回调函数
     * @type { {[key: string]: () => void} }
     */
    this.routers = {};

    window.addEventListener("hashchange", this.load.bind(this), false);
  }

  /**
   * 用于注册每个视图
   * @param {string} hash
   * @param {() => void} callback
   */
  register(hash, callback = function () {}) {
    this.routers[hash] = callback;
  }

  load() {
    const hash = location.hash.replace(/^#!?/, "");

    const handler = this.routers[hash] || this.routers["__NOT__FOUND__"]; // 如果没有注册路由，则使用 index

    handler.call(this);
  }

  /**
   * 注册 404 路由
   * @param {() => void} callback
   */
  notFound(callback) {
    this.routers["__NOT__FOUND__"] = callback;
  }
}

const router = new HashRouter();
let container = document.getElementById("container");

// 注册首页回调函数
router.register("", () => (container.innerHTML = "我是首页"));

// 注册其他视图回到函数
router.register("/page1", () => (container.innerHTML = "我是page1"));
router.register("/page2", () => (container.innerHTML = "我是page2"));
router.register("/page3", () => (container.innerHTML = "我是page3"));

router.notFound(() => (container.innerHTML = "404 not found"));

// 加载视图
router.load();
