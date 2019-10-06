'use strict'

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
const Route = use('Route')

Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.post('users', 'UserController.store')
  Route.put('users/:id', 'UserController.update')
  Route.post('auth', 'UserController.auth')
  Route.get('auth/google', 'AuthController.google')
  Route.get('authenticated/google', 'AuthController.callback')
}).prefix('api/v1')
