//Funciones iniciales
getDepartaments();
$('#updateDepartament').hide();

//En la primer parte deeste documento van los ajax y luego las demás funciones secundarias a ellos
function getDepartaments(){
    $('#selectEmployee').html('');
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

$('#updateDepartament').click(function(){
    let name = document.getElementById("dept").value;
    let id = document.getElementById("idDept").value;
    $.ajax({
        url:'/updateDepartament',
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
                $('#saveDepartament').show();
                $('#updateDepartament').hide();
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
});

function deleteDepartament(id){
    $.ajax({
        url:'/deleteDepartament',
        type:'post',
        data:{
            id:id
        },
        success:function(response){
            console.log(response);
            getDepartaments();
            if(response=='good'){
                popUp('Se eliminó con exito', 'Exitoso', 'success');
            }else{
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
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>`;
    depts.forEach((dept) =>{
        code += `<tr>
                    <th scope="row">`+dept.dept_no+`</th>
                    <td>`+dept.dept_name+`</td>
                    <td><a class="btn btn-success btn-sm" href="#updateDept" id="`+dept.dept_no+`" onclick="prepareUpdateDept('`+dept.dept_no+`')">Actualizar</a></td>
                    <td><input type="button" class="btn btn-danger btn-sm" value="Eliminar" onclick="deleteDepartament('`+dept.dept_no+`')"></td>
                </tr>`;
        //esto es para agregar al select los depts
        $('#selectEmployee').append('<option value="'+dept.dept_no+'" id="'+dept.dept_no+'">'+dept.dept_name+'</option>');
    });
    code += '</tbody>';
    $('#showDpt').html(code);
}

function prepareUpdateDept(id){
    $('#saveDepartament').hide();
    $('#updateDepartament').show();
    $('#alertDepartaments').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
            Actualice las cajas y guarde los cambios.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
    $.ajax({
        url:'/getDepartament',
        type:'post',
        data:{
            id:id
        },
        success:function(dept){
            console.log('Regresó: '+dept);
            document.getElementById('dept').value = dept[0].dept_name;
            document.getElementById('idDept').value = id;
        },
        error:function(response){
            console.log('Error: '+response);
        }
    });
}