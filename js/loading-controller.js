/**
 * 页面加载动画控制器 v5
 * 30秒自动关闭、翻牌动画、苹果风格完成动画
 */

(function() {
  'use strict';

  // 加载动画配置
  const config = {
    minDisplayTime: 1500,
    fadeDuration: 600,
    slowHintDelay: 5000,
    completeDuration: 1800,
    maxLoadTime: 30000
  };

  const startTime = performance.now();
  let loaded = false;
  let minTimeElapsed = false;
  let autoCloseTimer = null;
  let countdownTimer = null;
  let remainingSeconds = 30;

  function getLoadingScreen() {
    return document.getElementById('loading-screen');
  }

  function getLoadingContent() {
    return document.getElementById('loadingContent');
  }

  function getLoadingComplete() {
    return document.getElementById('loadingComplete');
  }

  function getSlowHint() {
    return document.querySelector('.loading-slow-hint');
  }

  function getCountdownElement() {
    return document.getElementById('loadingCountdown');
  }

  // 显示慢速提示
  function showSlowHint() {
    const slowHint = getSlowHint();
    if (slowHint && !loaded) {
      slowHint.classList.add('visible');
    }
  }

  // 显示倒计时
  function showCountdown() {
    const countdownEl = getCountdownElement();
    if (countdownEl && !loaded) {
      countdownEl.classList.add('show');
      updateCountdown();
      
      countdownTimer = setInterval(() => {
        remainingSeconds--;
        updateCountdown();
        
        if (remainingSeconds <= 0) {
          clearInterval(countdownTimer);
        }
      }, 1000);
    }
  }

  function updateCountdown() {
    const countdownEl = getCountdownElement();
    if (countdownEl) {
      countdownEl.textContent = remainingSeconds + 's';
      
      if (remainingSeconds <= 10) {
        countdownEl.style.color = '#ff6b6b';
      }
    }
  }

  // 苹果风格完成动画：先画圆，再画√，最后显示文字
  function showCompleteAnimation(callback) {
    const loadingContent = getLoadingContent();
    const loadingComplete = getLoadingComplete();
    
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }
    
    if (loadingContent && loadingComplete) {
      // 淡出原内容
      loadingContent.classList.add('fade-out');
      
      setTimeout(() => {
        loadingComplete.classList.add('show');
        
        // 获取动画元素
        const circleProgress = loadingComplete.querySelector('.circle-progress');
        const checkMark = loadingComplete.querySelector('.check-mark');
        const completeText = loadingComplete.querySelector('.complete-text');
        
        // 第1步：画圆（0ms开始）
        if (circleProgress) {
          circleProgress.classList.add('animate');
        }
        
        // 第2步：画√（800ms后开始，圆画完之后）
        setTimeout(() => {
          if (checkMark) {
            checkMark.classList.add('animate');
          }
        }, 800);
        
        // 第3步：显示文字（1200ms后）
        setTimeout(() => {
          if (completeText) {
            completeText.classList.add('show');
          }
        }, 1200);
        
        // 动画全部完成后回调
        setTimeout(() => {
          if (callback) callback();
        }, config.completeDuration);
        
      }, 400);
    } else {
      if (callback) callback();
    }
  }

  // 隐藏加载动画
  function hideLoading(force = false) {
    const loadingScreen = getLoadingScreen();
    if (!loadingScreen || loadingScreen.classList.contains('hidden')) return;

    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }

    const elapsed = performance.now() - startTime;
    const remaining = force ? 0 : Math.max(0, config.minDisplayTime - elapsed);

    setTimeout(() => {
      if (!force && loaded) {
        // 正常完成 - 显示苹果风格动画
        showCompleteAnimation(() => {
          // 使用收缩退出动画
          loadingScreen.classList.add('shrink-out');
          
          setTimeout(() => {
            if (loadingScreen.parentNode) {
              loadingScreen.style.display = 'none';
              loadingScreen.classList.remove('shrink-out');
            }
          }, 800); // 收缩动画时长
        });
      } else {
        // 强制关闭或超时 - 直接淡出
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.style.display = 'none';
          }
        }, config.fadeDuration);
      }
    }, remaining);
  }

  // 30秒自动关闭
  function initAutoClose() {
    autoCloseTimer = setTimeout(() => {
      if (!loaded) {
        console.log('[Loading] 30秒超时，自动关闭加载动画');
        hideLoading(true);
      }
    }, config.maxLoadTime);
  }

  // 5秒后显示慢速提示
  function initSlowHint() {
    setTimeout(() => {
      showSlowHint();
    }, config.slowHintDelay);
  }

  // 页面加载完成
  function onPageLoad() {
    if (loaded) return;
    loaded = true;
    
    if (minTimeElapsed) {
      hideLoading();
    }
  }

  // 最小显示时间
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

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSlowHint();
      initAutoClose();
      showCountdown();
    });
  } else {
    initSlowHint();
    initAutoClose();
    showCountdown();
  }

  // 全局控制方法
  window.LoadingControl = {
    hide: () => hideLoading(false),
    forceHide: () => hideLoading(true),
    show: function() {
      const loadingScreen = getLoadingScreen();
      const loadingContent = getLoadingContent();
      const loadingComplete = getLoadingComplete();
      
      if (loadingScreen) {
        loaded = false;
        remainingSeconds = 30;
        
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('hidden');
        
        if (loadingContent) {
          loadingContent.classList.remove('fade-out');
        }
        
        if (loadingComplete) {
          loadingComplete.classList.remove('show');
          
          // 重置动画状态
          const circleProgress = loadingComplete.querySelector('.circle-progress');
          const checkMark = loadingComplete.querySelector('.check-mark');
          const completeText = loadingComplete.querySelector('.complete-text');
          
          if (circleProgress) circleProgress.classList.remove('animate');
          if (checkMark) checkMark.classList.remove('animate');
          if (completeText) completeText.classList.remove('show');
        }
        
        const slowHint = getSlowHint();
        if (slowHint) {
          slowHint.classList.remove('visible');
        }
        
        const countdownEl = getCountdownElement();
        if (countdownEl) {
          countdownEl.classList.remove('show');
          countdownEl.style.color = '';
          updateCountdown();
        }
        
        initSlowHint();
        initAutoClose();
        showCountdown();
      }
    }
  };

  window.LoadingControl.config = config;

})();
