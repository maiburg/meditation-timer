import { AndroidActivityEventData, AndroidApplication, Application as app } from '@nativescript/core';

export const setNativeEvents = () => {
  [
    'activityCreatedEvent',
    'activityStartedEvent',
    'activityDestroyedEvent',
    'activityPausedEvent',
    'activityResumedEvent',
    'activityStoppedEvent',
    'saveActivityStateEvent',
    'activityResultEvent',
    'activityBackPressedEvent'
  ].forEach(event =>
    app.android.on(AndroidApplication[event], (args: AndroidActivityEventData) => console.logAndroid(args.eventName))
  );
};
