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
        },
        error:function(response){
            console.log('getDep-error')
            console.log(response);
        }
    });
}


//Funciones complementarias