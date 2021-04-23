//Preparar variables
getEmployees();
$('#updateEmployee').hide();

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
                cleanInputsEmployees();
                getEmployees();
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

function getEmployees(){
    $.ajax({
        url:'/getEmployees',
        type:'post',
        success:function(employees){
            console.log(employees);
            if(employees.employees){
                showEmployees(employees);
            }else{
                console.log('error no sw recibio');
                popUp('Ha ocurrido un error', 'Erroneo', 'error');
            }
        },
        error:function(error){
            console.log(error);
        }
    });
}

$('#updateEmployee').click(function(){
    const data = prepareDataEmployees();
    $.ajax({
        url:'/updateEmployee',
        type:'post',
        data:data,
        success:function(response){
            console.log(response);
            if(response=='good'){
                $('#updateEmployee').hide();
                $('#registerEmployee').show();
                getEmployees();
                cleanInputsEmployees();
                popUp('Se registró con exito', 'Exitoso', 'success');
            }else{
                popUp('Ha ocurrido un error', 'Erroneo', 'error');
            }
        },
        error:function(response){
            console.log(response);
            popUp('Ha ocurrido un error', 'Erroneo', 'error');
        }
    });
});

function deleteEmployee(idEmp){
    $.ajax({
        url:'/deleteEmployee',
        type:'post',
        data:{idEmp:idEmp},
        success:function(response){
            console.log(response);
            if(response=='good'){
                getEmployees();
                cleanInputsEmployees();
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

function cleanInputsEmployees(){
    document.getElementById('empNum').value='';
    document.getElementById('birthday').value='';
    document.getElementById('name').value='';
    document.getElementById('las').value='';
    document.getElementById('from').value='';
    document.getElementById('to').value='';
    document.getElementById('sala').value='';
    document.getElementById('title').value='';
}

function showEmployees(data){
    const employees = data.employees;
    const dept = data.depts;
    const salaries = data.salaries;
    const titles = data.titles;
    const empDepts = data.empDepts;
    console.log('data? '+data);
    console.log('employees? '+employees);
    let code = `<thead class="thead-dark">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Hire date</th>
                    <th scope="col">Departament</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>`;
    employees.forEach((employee, i)=>{
        code += `<tr class="hand">
                    <th scope="row" onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+employee.emp_no+`</th>
                    <td onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+employee.first_name+`</td>
                    <td onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+employee.last_name+`</td>
                    <td onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+transformDateFormat(employee.birth_date)+`</td>
                    <td onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+employee.gender+`</td>
                    <td onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+transformDateFormat(employee.hire_date)+`</td>
                    <td onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+getDepartamentById(dept,empDepts[i].dept_no)+`</td>
                    <td onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+salaries[i].salary+`</td>
                    <td onclick="prepareEmployeeEdit('`+employee.emp_no+`')">`+titles[i].title+`</td>
                    <td><input type="button" class="btn btn-danger btn-sm" value="Eliminar" onclick="deleteEmployee('`+employee.emp_no+`')"></td>
                </tr>`;
    });
    code += '</tbody>';
    $('#tableEmployees').html(code);
}

function getDepartamentById(depts, empDeptId){
    let band = false;
    let data;
    depts.forEach((dept,i)=>{
        if(dept.dept_no==empDeptId){
            data = dept.dept_name;
            band = true;
        }
    });
    if(!band){
        return 'Error critico';
    }else{
        return data;
    }
}

function prepareEmployeeEdit(idEmp){
    $('#alertEmployee').html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
            Actualice las cajas y guarde los cambios usando el boton verde.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
    $.ajax({
        url:'/getEmployee',
        type:'post',
        data:{idEmp:idEmp},
        success:function(data){
            console.log('bien: '+data);
            showDataEmpoyeeEdit(data);
        },
        error:function(err){
            console.log('error: '+err);
        }
    });
}

function showDataEmpoyeeEdit(data){
    document.getElementById('empNum').value = data.employeeData[0].emp_no;
    document.getElementById('birthday').value = transformDateFormat(data.employeeData[0].birth_date);
    document.getElementById('name').value = data.employeeData[0].first_name;
    document.getElementById('las').value = data.employeeData[0].last_name;
    document.getElementById('from').value = transformDateFormat(data.salaryData[0].from_date);
    document.getElementById('to').value = transformDateFormat(data.salaryData[0].to_date);
    document.getElementById('sala').value= data.salaryData[0].salary;
    document.getElementById('title').value=data.titleData[0].title;
    document.getElementById(data.deptData[0].dept_no).selected = true;
    document.getElementById(data.employeeData[0].gender).selected = true;
    console.log('manager? '+data.managerData[0].emp_no);
    if(data.managerData[0].emp_no){
        document.getElementById('manager').checked = true;
    }else{
        document.getElementById('manager').checked = false;
    }
    $('#registerEmployee').hide();
    $('#updateEmployee').show();
}

function transformDateFormat(date){
    let f = new Date(date);
    let fecha = (f.getFullYear()) + "-";
    if(((f.getMonth()+1)+'').length<2){
        fecha += ('0'+((f.getMonth() +1)+'') + "-");
    }else{
        fecha += (((f.getMonth() +1)+'')+ "-");
    }

    if((f.getDate()+'').length<2){
        fecha += '0'+((f.getDate())+'');
    }else{
        fecha += ((f.getDate())+'');
    }
    return fecha;
}