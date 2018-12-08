const elixir = require('laravel-elixir');

require('laravel-elixir-vue');

elixir(function(mix){

	mix.styles([
		'./public/css/jquery.dataTables.min.css',
		'./pulic/css/jquery.dataTables.min.css',   
		],'./public/css/table.css')

	   .scripts([
	   	    './public/js/jquery-3.3.1.js',
			'./public/js/jquery.dataTables.min.js',
			'./public/js/dataTables.buttons.min.js',
			'./public/js/buttons.flash.min.js',
			'./public/js/jszip.min.js',
			'./public/js/pdfmake.min.js',
			'./public/js/vfs_fonts.js',
			'./public/js/buttons.html5.min.js',			 
	   	],'./public/js/main.js');
	})
