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

  Route.put("reviews/:id", "ReviewController.update");
  Route.get("reviews/:id", "ReviewController.show");
  Route.get("reviews", "ReviewController.index");
  Route.post("reviews", "ReviewController.store");

  Route.put("likes/:id", "ReviewLikeController.update");
  Route.get("likes/:id", "ReviewLikeController.show");
  Route.get("likes", "ReviewLikeController.index");
  Route.post("likes", "ReviewLikeController.store");

  Route.get("styles", "StyleController.index");

  Route.get("schedules", "ScheduleController.index");
  Route.post("schedules", "ScheduleController.store");
  Route.get("schedules/:id", "ScheduleController.show");
  Route.get("schedules/user/:user_id", "ScheduleController.show");

  Route.delete("interests/:id", "InterestController.destroy");
  Route.get("interests", "InterestController.index");
  Route.post("interests", "InterestController.store");

  Route.delete("artist-styles/:id", "ArtistStyleController.destroy");
  Route.get("artist-styles", "ArtistStyleController.index");
  Route.post("artist-styles", "ArtistStyleController.store");

  Route.delete("schedule-dates/:id", "ScheduleDateController.destroy");
  Route.get("schedule-dates", "ScheduleDateController.index");
  Route.post("schedule-dates", "ScheduleDateController.store");

  Route.delete("scheduleds/:id", "ScheduledController.destroy");
  Route.get("scheduleds", "ScheduledController.index");
  Route.post("scheduleds", "ScheduledController.store");
  Route.put("scheduleds/:id", "ScheduledController.update");
}).prefix("api/v1");
