<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin', 'password' => Hash::make('password')]
        );
        $admin->assignRole('Admin');
        $manager = User::firstOrCreate(
            ['email' => 'manager@example.com'],
            ['name' => 'Manager', 'password' => Hash::make('password')]
        );
        $manager->assignRole('Manager');
        $employee = User::firstOrCreate(
            ['email' => 'employee@example.com'],
            ['name' => 'Employeer', 'password' => Hash::make('password')]
        );
        $employee->assignRole('Employee');
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            ['name' => 'Regular User', 'password' => Hash::make('password')]
        );
        $user->assignRole('User');
    }
}
