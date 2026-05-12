// 文件路径: /source/js/console_egg.js
// 极客身份: LeonardoFox | 安全协议版本: 2.5.0 (Silent Mode)
(function() {
    const _originalLog = console.log;
    const _originalWarn = console.warn;
    const _originalError = console.error;
    const _originalClear = console.clear;

    // 默认彻底静默，不给第三方插件任何“发声”机会
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};

    const mainColor = '#0060ff'; // EvolutionX Blue
    const warnColor = '#ff4d4d'; // 警示红

    const renderSecurityProtocol = () => {
        _originalClear();

        // 1. 打印 ASCII Banner (EvolutionX Blue)
        _originalLog(`%c
 _        _______  _______  _        _______  _______  ______   _______  _______  _______          
( \\      (  ____ \\(  ___  )( (    /|(  ___  )(  ____ )(  __  \\ (  ___  )(  ____ \\(  ___  )|\\     /|
| (      | (    \\/| (   ) ||  \\  ( || (   ) || (    )|| (  \\  )| (   ) || (    \\/| (   ) |( \\   / )
| |      | (__    | |   | ||   \\ | || (___) || (____)|| |   ) || |   | || (__    | |   | | \\ (_) / 
| |      |  __)   | |   | || (\\ \\) ||  ___  ||     __)| |   | || |   | ||  __)   | |   | |  ) _ (  
| |      | (      | |   | || | \\   || (   ) || (\\ (   | |   ) || |   | || (      | |   | | / ( ) \\ 
| (____/\\| (____/\\| (___) || )  \\  || )   ( || ) \\ \\__| (__/  )| (___) || )      | (___) |( /   \\ )
(_______/(_______/(_______)|/    )_)|/     \\||/   \\__/(______/ (_______)|/       (_______)|/     \\|
                                                                                                      
        `, `color: ${mainColor}; font-weight: bold;`);

        // 2. 核心锁定声明
        _originalLog(`%c 🔒 SECURITY PROTOCOL: LOCKED `, `color: #fff; background: ${warnColor}; padding:5px 10px; font-weight: bold; border-radius: 4px;`);
        _originalLog(`%c此控制台已被 LeonardoFox 安全协议锁定。系统正实时记录您的操作行为。`, `color: ${warnColor}; font-weight: 600; margin-top: 10px;`);

        // 3. 法律高亮区
        _originalLog(`%c 《中华人民共和国网络安全法》告知： `, `color: #fff; background: #333; padding: 2px 5px; margin-top: 10px;`);

        const legalStyle = `color: ${warnColor}; font-family: "Microsoft YaHei", sans-serif; font-size: 12px; line-height: 1.6;`;

        _originalLog(`%c  第27条：不得从事非法侵入他人网络、干扰他人网络正常功能等活动。`, legalStyle);
        _originalLog(`%c  第44条：任何个人和组织不得窃取或者以其他非法方式获取个人信息。`, legalStyle);
        _originalLog(`%c  第63条：违反本法规定，情节严重者将依法追究刑事责任。`, legalStyle);

        // 4. 隐蔽提示 (不再显示具体指令名称)
        _originalLog(`%c\n[SYSTEM] 非授权用户请立即关闭开发者工具。授权用户请执行验证程序以解锁。`, `color: #666; font-style: italic;`);
        _originalLog("\n");
    };

    // 隐蔽的解锁指令：access_debug_panel()
    window.access_debug_panel = function() {
        console.log = _originalLog;
        console.warn = _originalWarn;
        console.error = _originalError;
        console.clear();
        _originalLog("%c [SUCCESS] 身份验证通过。核心日志已解锁。 ", `color: #fff; background: #28a745; padding: 5px; border-radius: 4px;`);
        _originalLog("%c LeonardoFox Debugger Terminal v2.5.0-Stable ", `color: ${mainColor}; font-weight: bold;`);
        return "ACCESS_GRANTED";
    };

    renderSecurityProtocol();
})();