google.load('visualization', '1', {packages:['table']});
google.setOnLoadCallback(drawTable);

var drawTable = function ()
{
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Party');
    data.addColumn('number', 'Contribution');
    data.addRows(4);
    data.setCell(0, 0, 'Mike');
    data.setCell(0, 1, 'R');
    data.setCell(0, 2, 10, '$10');
    data.setCell(1, 0, 'Jim');
    data.setCell(1, 1, 'D');
    data.setCell(1, 2, 8000, '$8,000');
    data.setCell(2, 0, 'Mike');
    data.setCell(2, 1, 'R');
    data.setCell(2, 2, 10, '$10');
    data.setCell(3, 0, 'Jim');
    data.setCell(3, 1, 'D');
    data.setCell(3, 2, 8000, '$8,000');

    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: true});
}

