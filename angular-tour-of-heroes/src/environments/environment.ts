// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/**
 * Set if this is in production- or development-mode.
 */
export const environment = {
  production: false
};

/**
 * Constant to set the URL and port of the server and the websocket.
 */
export const SERVER_URL = {
  server: "http://0.0.0.0:8000",
  websocket: "ws://0.0.0.0:8000/ws"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
