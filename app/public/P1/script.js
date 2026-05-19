//Constantes que busca todos los elementos de tipo boton en el documento
const botones = document.querySelectorAll(".boton")
//Recorremos el arreglo para ver todos los elemento encontrados
botones.forEach(boton =>{
    //Escuchador de nuestro evento
    boton.addEventListener('click', ()=>{
        //Constantes para nuestro elementos a utilizar
        const seccion = boton.closest(".concepto");
        const terminal = seccion.querySelector(".terminal-texto")
        const resultado = boton.dataset.resultado;
        //Verificamos el estado del boton
        if(boton.dataset.estado !== "ejecutado"){
            terminal.textContent += "\n\n> Compilando...";
            
            setTimeout(()=>{
                terminal.textContent += "\n> Ejecutando..."
            }, 800);

            setTimeout(()=>{
                terminal.innerHTML += `\n\nResultado:\n${resultado}`;
            }, 1600);

            boton.textContent = "Limpiar terminal"
            boton.dataset.estado = "ejecutado"
        }
        else{
            //Regresamos al estado original
            const codigoOriginal = terminal.textContent.split("\n\n>")[0];
            terminal.textContent = codigoOriginal;
            boton.textContent = "Probar ejemplo";
            boton.dataset.estado = "limpio"
        }
    })
})
