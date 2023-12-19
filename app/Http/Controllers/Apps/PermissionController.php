<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function __invoke(Request $request)
    {
        $permissions = Permission::query()->when(request()->q, function ($permissions) {
            return $permissions->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);

        return Inertia::render('apps/permission/index', [
            'permissions' => $permissions
        ]);
    }
}
