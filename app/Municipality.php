<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Municipality extends Model
{
    protected $fillable = [
        'name', 'prime', 'legal', 'department_id'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    public static function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'prime' => 'required|boolean',
            'legal' => 'required|boolean',
            'department_id' => 'required|numeric'
        ];
    }

    public function getPrimeAttribute($value)
    {
        return $value ? "Si" : "No";
    }
    
    public function getLegalAttribute($value)
    {
        return $value ? "Si" : "No";
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}