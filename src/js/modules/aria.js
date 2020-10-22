// import { AriaModal, AriaTab } from "./library/_aria";

import {convertKeycodeToKeygroup} from "./keyboard";

/**
 * button[aria-expanded="false"][aria-label="open"][aria-controls="modal"]
 * div#modal[role="dialog"][aria-labeledby="modalLabel"][aria-hidden="true"]
 *   h2#modalLabel
 *   button[aria-expanded="false"][aria-label="open"][aria-controls="modal"]
 */
export class AriaModal {
  /**
   * ハンバーガーやモーダルウィンドウ等のARIAを実装する（スタイルは別途作成）
   * @param {Object} target 操作対象要素
   * @param {?Object} param1 オプション { className, expandLabel, shrinkLabel }
   */
  constructor(
    target,
    {
      className = "is-active",
      expandedLabel = "close",
      shrinkedLabel = "open",
    } = {}
  ) {
    this.target = target;
    this.buttons = document.querySelectorAll(`*[aria-controls="${target.id}"]`);
    this.className = className;
    this.expandedLabel = expandedLabel;
    this.shrinkedLabel = shrinkedLabel;
    if (!this.target) {
      console.error("there is no element specified by aria-controls.");
      return null;
    }
  }

  /**
   * 要素を表示する
   * @param {Function} callback コールバック関数 第一引数に{target, buttons, className}を持つ
   */
  expand(callback) {
    for (let button of this.buttons) {
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", this.expandedLabel);
      button.classList.add(this.className);
    }
    this.target.setAttribute("aria-hidden", "false");
    this.target.classList.add(this.className);

    if (typeof callback == "function") callback(this);
    return this;
  }

  /**
   * 要素を非表示にする
   * @param {Function} callback コールバック関数 第一引数に{target, buttons, className}を持つ
   */
  shrink(callback) {
    this.target.setAttribute("aria-hidden", "true");
    for (let button of this.buttons) {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", this.shrinkedLabel);
      button.classList.remove(this.className);
    }
    this.target.classList.remove(this.className);
    if (typeof callback == "function") callback(this);
    return this;
  }

  /**
   * トグルスイッチを一括設定する
   * @param {String} eventType eventタイプ clickなど
   * @param expandCallback
   * @param shrinkCallback
   */
  setToggle(eventType, expandCallback, shrinkCallback) {
    for (let button of this.buttons) {
      button.addEventListener(
        eventType,
        (evt) => {
          if (this.target.getAttribute("aria-hidden") === "true") {
            this.expand(expandCallback);
          } else {
            this.shrink(shrinkCallback);
          }
        },
        false
      );
      button.addEventListener("keydown", (evt) => {
        const keygroups = convertKeycodeToKeygroup(evt.keyCode);
        if (keygroups.includes("negative")) {
          this.shrink();
        }
      });
    }
    this.target.addEventListener("keydown", (evt) => {
      const keygroups = convertKeycodeToKeygroup(evt.keyCode);
      if (keygroups.includes("negative")) {
        this.shrink();
      }
    });
    return this;
  }
}

/**
 * ul[role="tablist"]
 *   li[role="tab"][aria-selected="true"][aria-controls="panel1"][tabindex="0"]
 *   li[role="tab"][aria-selected="false"][aria-controls="panel2"][tabindex="0"]
 *   li[role="tab"][aria-selected="false"][aria-controls="panel3"][tabindex="0"]
 * div
 *   div#panel1[aria-hidden="false"]
 *   div#panel2[aria-hidden="true"]
 *   div#panel3[aria-hidden="true"]
 */
export class AriaTab {
  /**
   * タブ切り替えのARIA実装する（スタイルは別途作成）
   * @param {Object} tablistElement role=tablist, 子にrole=tab,aria-selected,aria-controlsが必要
   * @param className
   */
  constructor(tablistElement, {className = "is-active"} = {}) {
    this.tabs = [...tablistElement.querySelectorAll(`*[aria-selected]`)];
    if (!this.tabs) {
      console.error("there is no element specified by aria-selected.");
      return null;
    }
    this.tabpairs = this.tabs.map(
      (elem) => new TabPair(elem, {className: className})
    );
  }

  /**
   * IDを指定して特定のタブを活性化する
   * @param {String} id 対象とするtabpanel要素のID
   * @param {Function} activateCallback タブが活性化したときに実行する関数 第一引数に{id, tab, tabpanel}を持つ
   * @param {Function} deactivateCallback タブが非活性化したときに実行する関数 第一引数に{id, tab, tabpanel}を持つ
   */
  select(id, activateCallback, deactivateCallback) {
    this.tabpairs.forEach((tabpair) => {
      if (tabpair.id === id) {
        tabpair.activate(activateCallback);
      } else {
        tabpair.deactivate(deactivateCallback);
      }
    });
    return this;
  }

  /**
   * タブ切り替えを一括設定する
   * @param {String} eventType eventタイプ clickなど
   * @param {Function} activateCallback タブが活性化したときに実行する関数 第一引数に{id, tab, tabpanel}を持つ
   * @param {Function} deactivateCallback タブが非活性化したときに実行する関数 第一引数に{id, tab, tabpanel}を持つ
   */
  setRadio(eventType, activateCallback, deactivateCallback) {
    this.tabpairs.forEach((tabpair) => {
      tabpair.tab.addEventListener(
        eventType,
        (evt) => {
          this.select(tabpair.id, activateCallback, deactivateCallback);
        },
        false
      );
      tabpair.tab.addEventListener("keydown", (evt) => {
        const keygroups = convertKeycodeToKeygroup(evt.keyCode);
        if (keygroups.includes("positive")) {
          this.select(tabpair.id, activateCallback, deactivateCallback);
        }
      });
    });
    return this;
  }

  /**
   * tabpaiersが特定のIDを持つか調べる
   * @param {String} id
   * @return {Boolean} 持っていればtrue
   */
  hasId(id) {
    for (let tabpair of this.tabpairs) {
      if (tabpair.id === id) return true;
    }
    return false;
  }
}

class TabPair {
  constructor(tab, {className = "is-active"} = {}) {
    this.id = tab.getAttribute("aria-controls");
    this.tab = tab;
    this.tabpanel = document.getElementById(this.id);
    this.className = className;
  }

  activate(callback) {
    this.tab.setAttribute("aria-selected", "true");
    this.tabpanel.setAttribute("aria-hidden", "false");
    this.tab.classList.add(this.className);
    this.tabpanel.classList.add(this.className);
    if (typeof callback == "function") callback(this);
    return this;
  }

  deactivate(callback) {
    this.tab.setAttribute("aria-selected", "false");
    this.tabpanel.setAttribute("aria-hidden", "true");
    this.tab.classList.remove(this.className);
    this.tabpanel.classList.remove(this.className);
    if (typeof callback == "function") callback(this);
    return this;
  }
}