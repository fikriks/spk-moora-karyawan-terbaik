<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
        'users' => User::all(),
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'role' => 'required',
        'password' => 'required|min:6'
    ]);

    $data['password'] = bcrypt($data['password']);

    User::create($data);

    return redirect()->route('users.index')->with('success', 'User created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
        'user' => $user
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
{
    $data = $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'role' => 'required',
        'password' => 'nullable|min:6'
    ]);

    if ($request->password) {
        $data['password'] = bcrypt($request->password);
    } else {
        unset($data['password']);
    }

    $user->update($data);

    return redirect()->route('users.index')->with('success', 'User updated');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
{
    $user->delete();
    return redirect()->back()->with('success', 'User deleted');
}

}