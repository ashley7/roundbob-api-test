@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <h3>People with states</h3>

                    <label>Name</label>
                    <input type="text" id="name" class="form-control">

                    <label>State</label>
                    <input type="text" id="state" class="form-control">
                    <br>
                    <button id="save_button" class="btn btn-primary">Save</button>

                    <span id="message"></span>
                <br><br>
                <table class="nowrap table table-bordered table-striped" id="users_data_table">
                    <thead>
                        <th class="text-center">Name</th>
                        <th class="text-center">State</th>               
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>     
              
               

                 
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('styles')
  <style type="text/css">
      #message{
        float: right;
      }

      table{
        margin-top: 20px;
      }
  </style>
@endsection

@push('scripts')

  

  <script type="text/javascript">

    var user_table = $('#users_data_table').DataTable({
            "ordering": true,
            "ajax": {
                "url": "/user",
                "dataSrc": ""
            },
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excel',
                    messageTop: ' '
                },
                {
                    extend: 'csv',
                    messageTop: ' '
                },
                {
                    extend: 'pdf',
                    messageTop: ' '
                }
            ]
        });

    $("#save_button").click(function(){
        anable_btn();
        user_table.ajax.reload(null,false);    
           $.ajax({
                type: "POST",
                url: "{{ route('user.store') }}",
            data: {
                 name: $("#name").val(),                         
                 state: $("#state").val(),                         
                 _token: "{{Session::token()}}"
            },
            success: function(result){
                for (var i = 0; i < result.length; i++) {
                    $("#message").html(result[i]);
                }
                disanable_btn();
                user_table.ajax.reload(null,false);        
            }
          });
    });  

    function anable_btn(){
        $("#save_button").html("Processing ...");
        $("#save_button").attr("disabled","disabled");
        $("#message").html(" ");
    }

    function disanable_btn(){
        $("#save_button").html("Add user");
        $("#save_button").attr("disabled",false);
        $("#name").val(" ")
        $("#state").val(" ")
    }   
  </script>
@endpush