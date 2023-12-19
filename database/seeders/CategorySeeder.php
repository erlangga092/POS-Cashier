<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Category::create([
            'name' => 'Makanan',
            'description' => 'Makanan'
        ]);

        \App\Models\Category::create([
            'name' => 'Minuman',
            'description' => 'Minuman'
        ]);

        \App\Models\Category::create([
            'name' => 'Elektronik',
            'description' => 'Elektronik'
        ]);
    }
}
