<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $admin = [
            [
                'username' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin123'),
                'role' => 'admin', 
            ]
        ];
        $operator = [
            [
                'username' => 'Operator',
                'email' => 'operator@gmail.com',
                'password' => bcrypt('operator123'),
                'role' => 'operator', 
            ]
        ];

        User::insert($admin);
        User::insert($operator);
    }
}
