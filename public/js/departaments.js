//Funciones iniciales
getDepartaments();

//En la primer parte deeste documento van los ajax y luego las demás funciones secundarias a ellos
function getDepartaments(){
    $.ajax({
        url:'/getDepartaments',
        type:'post',
        success:function(response){
            console.log('getDept-success');
            console.log(response);
            showDepartaments(response);
        },
        error:function(response){
            console.log('getDep-error')
            console.log(response);
        }
    });
}

function saveNewDept(){
    let name = document.getElementById("dept").value;
    let id = document.getElementById("idDept").value;
    $.ajax({
        url:'/addNewDepartament',
        type:'post',
        data:{
            nameDept:name,
            idDept:id
        },
        success:function(response){
            console.log(response);
            if(response=='good'){
                getDepartaments();
                popUp('Se registró con exito', 'Exitoso', 'success');
                document.getElementById("dept").value = '';
                document.getElementById("idDept").value = '';
            }else{
                console.log('Error at addNewDept');
                popUp('Ha ocurrido un error', 'Erroneo', 'error');
            }
        },
        error:function(response){
            console.log(response);
            popUp('Ha ocurrido un error', 'Erroneo', 'error');
        }
    });
}


//Funciones complementarias
function showDepartaments(depts){
    let code = `<thead class="thead-dark">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Departament</th>
                    </tr>
                </thead>
                <tbody>`;
    depts.forEach((dept) =>{
        code += `<tr>
                    <th scope="row">`+dept.dept_no+`</th>
                    <td>`+dept.dept_name+`</td>
                </tr>`;
    });
    code += '</tbody>';
    $('#showDpt').html(code);
}