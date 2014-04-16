
$(document).ready(function()
{
	populateTable();
});

function populateTable(){
	$.getJSON( '/printJSON', function( data ) {
		var tableContent = '';
		$.each(data, function(){
			  tableContent += '<tr>';
			  tableContent += '<td>' + this.Name + '</td>';
			  tableContent += '<td>' + this.Drink + '</td>';
			  tableContent += '<td>' + this.Phone + '</td>';
			  tableContent += '<td>' + this.Price + '</td>';
			  tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
			  tableContent += '</tr>';
			});
		$('#userList table tbody').html(tableContent);
  	});
};

$('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

function deleteUser(event) {

 	event.preventDefault();
		$.ajax({
			type: 'DELETE',
			url: '/deleteuser/' + $(this).attr('rel')
		}).done(function( response ) {
			if (response.msg === '') {
			}
			else {
				alert('Error: ' + response.msg);
			}
			populateTable();

		});

};

window.setInterval(function(){
  /// call your function here
  populateTable();
}, 1000);

