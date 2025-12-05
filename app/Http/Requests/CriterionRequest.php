<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CriterionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Ubah sesuai policy/roles, sementara allow authenticated users
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('criterion') ? $this->route('criterion')->id : null;

        return [
            'code' => ['nullable','string','max:50','unique:criteria,code' . ($id ? ",$id" : '')],
            'name' => ['required','string','max:255'],
            'type' => ['required','in:benefit,cost'],
            'weight' => ['required','numeric','min:0'],
            'description' => ['nullable','string','max:2000'],
            'order' => ['nullable','integer','min:0'],
        ];
    }
}