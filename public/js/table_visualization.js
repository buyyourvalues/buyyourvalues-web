google.load('visualization', '1', {packages:['table']});
google.setOnLoadCallback(drawTable);

var drawTable = function ()
{
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Salary');
    data.addColumn('boolean', 'Full Time Employee');
    data.addRows(4);
    data.setCell(0, 0, 'Mike');
    data.setCell(0, 1, 10000, '$10,000');
    data.setCell(0, 2, true);
    data.setCell(1, 0, 'Jim');
    data.setCell(1, 1, 8000, '$8,000');
    data.setCell(1, 2, false);
    data.setCell(2, 0, 'Alice');
    data.setCell(2, 1, 12500, '$12,500');
    data.setCell(2, 2, true);
    data.setCell(3, 0, 'Bob');
    data.setCell(3, 1, 7000, '$7,000');
    data.setCell(3, 2, true);

    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: true});
}

