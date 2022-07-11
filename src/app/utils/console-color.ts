const ns = require('@nativescript/core');

const colorReset = '\x1b[0m';
const colorDim = '\x1b[2m';

const colorBlack = '\x1b[30m';
const colorRed = '\x1b[31m';
const colorMagenta = '\x1b[35m';
const colorCyan = '\x1b[36m';
const colorGreen = '\x1b[32m';
const colorBlue = '\x1b[34m';

if (ns.Device.os === 'Android') {
  [
    ['warn', colorMagenta],
    ['error', colorRed],
    ['log', colorCyan]
  ].forEach(pair => {
    const method = pair[0],
      reset = colorReset,
      color = colorBlack + pair[1];
    console[method] = console[method].bind(console, color, method.toUpperCase(), reset);
  });
}

if (ns.Device.os === 'iOS') {
  ['warn', 'error', 'log'].forEach(method => {
    console[method] = console[method].bind(console, `########## ${method.toUpperCase()}`);
  });
}

interface Console {
  errorColor(message?: any, ...optionalParams: any[]): void;
  logColor(message?: any, ...optionalParams: any[]): void;
  warnColor(message?: any, ...optionalParams: any[]): void;
  logNativeScript(message?: any, ...optionalParams: any[]): void;
  logIos(message?: any, ...optionalParams: any[]): void;
  logAndroid(message?: any, ...optionalParams: any[]): void;
}

console.logNativeScript = (message?: any, ...optionalParams: any[]) => {
  message = `NATIVESCRIPT EVENT: ${message}`;
  const params = ns.Device.os === 'Android' ? [colorBlue, message, colorReset] : [message];
  console.log(...params);
};

console.logIos = (message?: any, ...optionalParams: any[]) => {
  message = `IOS EVENT: ${message}`;
  const params = ns.Device.os === 'Android' ? [colorDim, message, colorReset] : [message];
  console.log(...params);
};

console.logAndroid = (message?: any, ...optionalParams: any[]) => {
  message = `ANDROID EVENT: ${message}`;
  const params = ns.Device.os === 'Android' ? [colorGreen, message, colorReset] : [message];
  console.log(...params);
};

console.logColor = (message?: any, ...optionalParams: any[]) => {
  const params = ns.Device.os === 'Android' ? [colorCyan, message, colorReset] : [message];
  console.log(...params);
};

console.errorColor = (message: string) => {
  const params = ns.Device.os === 'Android' ? [colorRed, message, colorReset] : [message];
  console.error(...params);
};

console.warnColor = (message?: any, ...optionalParams: any[]) => {
  const params = ns.Device.os === 'Android' ? [colorMagenta, message, colorReset] : [message];
  console.warn(...params);
};
