<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionResource;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'field' => Rule::in(['created_at', 'name']),
            'direction' => Rule::in(['asc', 'desc'])
        ]);

        $limit = $request->input('limit', 5);

        $permissions = PermissionResource::collection(
            Permission::query()
                ->when(
                    value: $request->search,
                    callback: fn ($query, $value) => $query->where('name', 'ilike', '%' . $value . '%')
                )
                ->when(
                    value: $request->field && $request->direction,
                    callback: fn ($query) => $query->orderBy($request->field, $request->direction),
                    default: fn ($query) => $query->latest()
                )
                ->paginate($limit)
                ->withQueryString()
        );

        return inertia('apps/permission/index', [
            'permissions' => fn () => $permissions,
            'state' => $request->only('limit', 'page', 'search', 'field', 'direction')
        ]);
    }
}
