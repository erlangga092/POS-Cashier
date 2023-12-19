<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', function () {
    return Inertia::render('auth/login');
})->middleware('guest');


// prefix apps
Route::prefix('apps')->group(function () {

    // auth middleware
    Route::group(['middleware' => ['auth']], function () {

        // dashboard
        Route::get('dashboard', \App\Http\Controllers\Apps\DashboardController::class)
            ->name('apps.dashboard');

        // permissions
        Route::get('permissions', \App\Http\Controllers\Apps\PermissionController::class)
            ->name('apps.permissions.index')
            ->middleware('permission:permissions.index');

        // roles
        Route::resource('roles', \App\Http\Controllers\Apps\RoleController::class, [
            'as' => 'apps'
        ])->middleware('permission:roles.index|roles.create|roles.edit|roles.delete');

        Route::get('fetch-roles', [\App\Http\Controllers\Apps\RoleController::class, 'fetchRoles']);
    });
});
