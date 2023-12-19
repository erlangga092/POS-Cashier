<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::query()->when(request()->q, function ($roles) {
            return $roles->where('name', 'like', '%' . request()->q . '%');
        })->with('permissions')->latest()->paginate(10);

        return Inertia::render('apps/roles/index', compact('roles'));
    }

    public function create()
    {
        $permissions = Permission::all();
        return Inertia::render('apps/roles/create', compact('permissions'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'permissions' => 'required'
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->givePermissionTo($request->permissions);
        return redirect()->route('apps.roles.index');
    }

    public function fetchRoles()
    {
        $roles = Role::query()->with('permissions')->latest()->paginate(10);
        return response()->json([
            'data' => $roles
        ]);
    }
}
