<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CriterionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $criterionId = $this->route('criterion')?->id;

        return [
            'code' => [
                'nullable',
                'string',
                'max:50',
                Rule::unique('criteria')->ignore($criterionId),
            ],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:benefit,cost'],
            'weight' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string', 'max:2000'],
            'order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->filled('order')) {
            $this->merge([
                'order' => (int) $this->order,
            ]);
        } else {
            $this->merge([
                'order' => 0,
            ]);
        }
    }
}
