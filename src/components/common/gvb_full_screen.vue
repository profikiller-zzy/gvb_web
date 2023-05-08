<!-- 全屏和退出全屏组件 -->

<template>
  <i v-if="IsFull" @click="fullScreen" class="iconfont icon-tuichuquanping"></i>
  <i v-else @click="fullScreen" class="iconfont icon-quanping"></i>
</template>

<script setup>
import {ref} from "vue";

const IsFull = ref(false)

// 判断是否处于全屏状态
function isFullScreen() {
  return document.fullscreenElement == null
}

// 退出全屏
function exitFullScreen() {
  let exitMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.exitFullScreen;
  if (exitMethod) {
    exitMethod.call(document);
  } else if (typeof window.ActiveXObject !== "undefined") {
    let wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
}

// 全屏或取消全屏
function fullScreen() {
  let element = document.documentElement
  // 判断一下是否处于全屏
  IsFull.value = !IsFull.value
  if (!isFullScreen()) {
    // 退出全屏
    exitFullScreen()
    return
  }
  // 全屏


  let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
    let wScript = new ActiveXObject("WScript.Shell");
    if (wScript !== null) {
      wScript.SendKeys("{F11}");
    }
  }
}
</script>
