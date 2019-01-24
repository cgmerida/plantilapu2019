
<ul class="list-inline">
    @if ($candidate_id > 0)
        @can('candidates.edit')
        <li class="list-inline-item">
            <a href="{{ route('candidates.edit', $candidate_id) }}" 
            title="{{ trans('app.edit_title') }}" data-toggle="tooltip"
            class="btn btn-outline-primary btn-sm">
                <span class="ti-pencil"></span>
            </a>
        </li>
        @endcan
        
        @can('candidates.destroy')
        <li class="list-inline-item">
            {!! Form::open([
                'class'=>'delete',
                'route'  => ['candidates.destroy', $candidate_id], 
                'method' => 'DELETE',
                ]) 
            !!}

                <button class="btn btn-outline-danger btn-sm" title="{{ trans('app.delete_title') }}">
                    <i class="ti-trash"></i>
                </button>
                
            {!! Form::close() !!}
        </li>
        @endcan
    @endif
</ul>