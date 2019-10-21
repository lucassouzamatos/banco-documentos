"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.put("users/:id", "UserController.update");
  Route.get("users/:id", "UserController.show");
  Route.get("users", "UserController.index");
  Route.post("users", "UserController.store");
  Route.post("auth", "UserController.auth");
  Route.post("auth/google", "AuthController.google");

  Route.get("studio-artists/:studioId", "StudioArtistController.index");
  Route.post("studio-artists", "StudioArtistController.store");
  Route.delete("studio-artists/:id", "StudioArtistController.destroy");

  Route.get("states", "StateController.index");
  Route.get("cities", "CityController.index");

  Route.put("arts/:id", "ArtController.update");
  Route.get("arts/:id", "ArtController.show");
  Route.get("arts", "ArtController.index");
  Route.post("arts", "ArtController.store");
}).prefix("api/v1");
