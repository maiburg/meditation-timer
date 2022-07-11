import { Application as app, ApplicationEventData } from '@nativescript/core';

import { setNativeEvents } from '@app/globals/app-events-native';
import { setStatusBarColors } from '@app/utils';

export const setAppEvents = () => {
  setNativeEvents();

  app.on(app.launchEvent, (args: ApplicationEventData) => console.logNativeScript(args.eventName));
  app.on(app.displayedEvent, (args: ApplicationEventData) => console.logNativeScript(args.eventName));
  app.on(app.suspendEvent, (args: ApplicationEventData) => console.logNativeScript(args.eventName));
  app.on(app.exitEvent, (args: ApplicationEventData) => console.logNativeScript(args.eventName));
  app.on(app.lowMemoryEvent, (args: ApplicationEventData) => console.logNativeScript(args.eventName));
  app.on(app.uncaughtErrorEvent, (args: ApplicationEventData) => console.logNativeScript(args.eventName));
  app.on(app.orientationChangedEvent, (args: ApplicationEventData) => console.logNativeScript(args.eventName));
  app.on(app.resumeEvent, (args: ApplicationEventData) => {
    console.logNativeScript(args.eventName);
    setStatusBarColors();
  });
};
