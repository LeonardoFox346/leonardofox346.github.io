/**
 * 页面加载动画控制器 v2
 * 支持5秒后显示慢速提示
 */

(function() {
  'use strict';

  // 加载动画配置
  const config = {
    // 最小显示时间（毫秒）- 防止动画一闪而过
    minDisplayTime: 1500,
    // 淡入淡出时间
    fadeDuration: 500,
    // 慢速提示显示时间（毫秒）- 5秒
    slowHintDelay: 5000
  };

  // 记录开始时间
  const startTime = performance.now();
  let loaded = false;
  let minTimeElapsed = false;

  // 获取加载屏幕元素
  function getLoadingScreen() {
    return document.getElementById('loading-screen');
  }

  // 获取慢速提示元素
  function getSlowHint() {
    return document.querySelector('.loading-slow-hint');
  }

  // 显示慢速提示
  function showSlowHint() {
    const slowHint = getSlowHint();
    if (slowHint && !loaded) {
      slowHint.classList.add('visible');
    }
  }

  // 隐藏加载动画
  function hideLoading() {
    const loadingScreen = getLoadingScreen();
    if (!loadingScreen) return;

    // 计算已经显示的时间
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, config.minDisplayTime - elapsed);

    // 确保最小显示时间
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      
      // 完全隐藏后移除元素
      setTimeout(() => {
        if (loadingScreen.parentNode) {
          loadingScreen.style.display = 'none';
        }
      }, config.fadeDuration);
    }, remaining);
  }

  // 5秒后显示慢速提示
  function initSlowHint() {
    setTimeout(() => {
      showSlowHint();
    }, config.slowHintDelay);
  }

  // 监听页面加载完成
  function onPageLoad() {
    loaded = true;
    if (minTimeElapsed) {
      hideLoading();
    }
  }

  // 监听最小时间
  setTimeout(() => {
    minTimeElapsed = true;
    if (loaded) {
      hideLoading();
    }
  }, config.minDisplayTime);

  // 绑定加载事件
  if (document.readyState === 'complete') {
    onPageLoad();
  } else {
    window.addEventListener('load', onPageLoad);
  }

  // 初始化慢速提示定时器
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlowHint);
  } else {
    initSlowHint();
  }

  // 提供全局控制方法
  window.LoadingControl = {
    hide: hideLoading,
    show: function() {
      const loadingScreen = getLoadingScreen();
      if (loadingScreen) {
        loaded = false;
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('hidden');
        // 重置慢速提示
        const slowHint = getSlowHint();
        if (slowHint) {
          slowHint.classList.remove('visible');
        }
        // 重新启动慢速提示定时器
        initSlowHint();
      }
    }
  };

})();
