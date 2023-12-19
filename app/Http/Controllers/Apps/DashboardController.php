<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Profit;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $day = date('d');
        $week = Carbon::now()->subDays(7);

        $chart_sales_weeek = DB::table('transactions')
            ->select(DB::raw("DATE_TRUNC('day', created_at) as date, SUM(grand_total) as total"))
            ->where('created_at', '>=', $week)
            ->groupBy(DB::raw("DATE_TRUNC('day', created_at)"))
            ->get();

        if (count($chart_sales_weeek)) {
            foreach ($chart_sales_weeek as $result) {
                $sales_date[] = $result->date;
                $grand_total[] = (int)$result->grand_total;
            }
        } else {
            $sales_date[] = "";
            $grand_total[] = "";
        }

        $count_sales_today = Transaction::query()->whereDay('created_at', $day)->count();
        $sum_sales_today = Transaction::query()->whereDay('created_at', $day)->sum('grand_total');
        $sum_profits_today = Profit::query()->whereDay('created_at', $day)->sum('total');
        $products_limit_stock = Product::query()->where('stock', '<=', 10)->get();

        $chart_best_products = DB::table('transaction_details')
            ->select('products.title', DB::raw('SUM(transaction_details.qty) as total'))
            ->join('products', 'products.id', '=', 'transaction_details.product_id')
            ->groupBy('products.title') // Mengganti 'transaction_details.product_id' dengan 'products.title'
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();

        if (count($chart_best_products)) {
            foreach ($chart_best_products as $result) {
                $product[] = $result->title;
                $total[] = (int)$result->total;
            }
        } else {
            $product[] = "";
            $total[] = "";
        }

        return Inertia::render('apps/dashboard/index', [
            'sales_date' => $sales_date,
            'grand_total' => $grand_total,
            'count_sales_today' => (int)$count_sales_today,
            'sum_sales_today' => (int)$sum_sales_today,
            'sum_profits_today' => (int)$sum_profits_today,
            'products_limit_stock' => $products_limit_stock,
            'product' => $product,
            'total' => $total
        ]);
    }
}
