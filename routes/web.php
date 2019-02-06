<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function () {
    return redirect('/admin');
});

Auth::routes();

Route::group(['middleware' => ['auth']], function () {
    Route::resource('roles', 'RoleController');
    Route::resource('users', 'UserController');

    Route::resource('deputies', 'DeputyController');
    Route::get('departments/{department}/deputies', 'DeputyController@getDeputies')
        ->where('depto_id', '[0-9]+')->where('muni_id', '[0-9]+');

    Route::get('admin', 'DashboardController@index')->name('admin.dash');
});
