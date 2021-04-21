//Preparar variables

//Funciones ajax
function saveNewEmployee(){
    const data = prepareDataEmployees();
    $.ajax({
        url:'/saveNewEmployee',
        type:'post',
        data:data,
        success:function(response){
            console.log(response);
            if(response=='good'){
                popUp('Se registró con exito', 'Exitoso', 'success');
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
function prepareDataEmployees(){
    const f = new Date();
    const data = {
        empNum:document.getElementById('empNum').value,
        birthday:document.getElementById('birthday').value,
        firstName:document.getElementById('name').value,
        lastName:document.getElementById('las').value,
        fromDate:document.getElementById('from').value,
        toDate:document.getElementById('to').value,
        salary:document.getElementById('sala').value,
        title:document.getElementById('title').value,
        idDepartament:document.getElementById('selectEmployee').value,
        gender:document.getElementById('gender').value,
        manager:document.getElementById('manager').checked,
        hireDate:(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate())
    };

    return data;
}