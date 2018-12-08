@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">

             
                    <label>Name</label>
                    <input type="text" id="person_name" class="form-control">

                    <label>State</label>
                    <input type="text" id="state_name" class="form-control">
                    <br>
                    <button id="save_button" class="btn btn-primary">Save</button>
              
               

                 
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
  <script type="text/javascript">
    $("#save_button").click(function(){
        anable_btn();       

           $.ajax({
                type: "POST",
                url: "{{ route('user.store') }}",
            data: {
                 person_name: $("#person_name").val(),                         
                 state_name: $("#state_name").val(),                         
                 _token: "{{Session::token()}}"
            },
            success: function(result){
                

                disanable_btn();              

            }
          });



    });  

    function anable_btn(){
        $("#save_button").html("Processing ...");
        $("#save_button").attr("disabled","disabled");
    }

    function disanable_btn(){
        $("#save_button").html("Add user");
        $("#save_button").attr("disabled",false);
    }   
  </script>
@endpush