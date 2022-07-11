import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';

import { AppModule } from '@app/app.module';
import { setAppEvents } from '@app/globals/app-events';

setAppEvents();

console.log('main before bootstrap');
runNativeScriptAngularApp({ appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule) });
console.log('main before bootstrap');
