const resultados = document.querySelector(".resultados");
const buscador = document.querySelector(".buscador");
const botonBuscar = document.querySelector(".boton_buscar");

let arregloPrinc = [];

obtenerDatos();

botonBuscar.addEventListener("click", () => {
    arregloPrinc.forEach(item => {
        var nombreB = item.querySelector("h1").textContent;

        if (nombreB.toLowerCase().includes(buscador.value.toLowerCase())) {
            item.classList.add("show");
            item.classList.remove("hide");
        } else {
            item.classList.remove("show");
            item.classList.add("hide");
        }
    });
});

buscador.addEventListener("keydown", (event)  => {
    if (event.key == "Enter") {
        arregloPrinc.forEach(item => {
            var nombre = item.querySelector("h1").textContent;
    
            if (nombre.toLowerCase().includes(buscador.value.toLowerCase())) {
                item.classList.add("show");
                item.classList.remove("hide");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});


async function obtenerDatos() {
    datosUsuario = localStorage.getItem("datos_usuario");

    if (datosUsuario) {
        const results = JSON.parse(datosUsuario);

        results.forEach(element => {
            let div1 = document.createElement("div");
            let img = document.createElement("img");
            let h1 = document.createElement("h1");
            let p = document.createElement("p");
            let div2 = document.createElement("div");
            let inp = document.createElement("input");
            let div3 = document.createElement("div");//Contine lo de los comentarios
            let div4 = document.createElement("div");//Contiene los comentarios

            h1.textContent = element.name.first + " " + element.name.last;
            p.textContent = element.location.city + ", " + element.location.state;
            img.setAttribute("src", element.picture.large);
           
    
            div1.appendChild(img);
            div1.appendChild(h1);
            div1.appendChild(p);
            div1.appendChild(div2);
            div2.appendChild(inp);
            div2.appendChild(div3);
            div3.appendChild(div4);
            
            div1.classList.add("show");
            div4.classList.add("contenedor");
            div3.classList.add("comentarios");
            inp.addEventListener("keypress", function(event) {
                comentario(event, div4); 
              });
    
            arregloPrinc.push(div1);
            resultados.appendChild(div1);
            
        });
        
        
    } else {
        const res = await fetch("https://randomuser.me/api?results=10");
        const {results} = await res.json();

        results.forEach(element => {
            let div1 = document.createElement("div");
            let img = document.createElement("img");
            let h1 = document.createElement("h1");
            let p = document.createElement("p");
            let div2 = document.createElement("div");
            let inp = document.createElement("input");
            let div3 = document.createElement("div");//Contine lo de los comentarios
            let div4 = document.createElement("div");//Contiene los comentarios

            h1.textContent = element.name.first + " " + element.name.last;
            p.textContent = element.location.city + ", " + element.location.state;
            img.setAttribute("src", element.picture.large);
           
            div1.appendChild(img);
            div1.appendChild(h1);
            div1.appendChild(p);
            div1.appendChild(div2);
            div2.appendChild(inp);
            div2.appendChild(div3);
            div3.appendChild(div4);
            
            div1.classList.add("show");
            div3.classList.add("comentarios");
            div4.classList.add("contenedor");
            inp.addEventListener("keypress", function(event) {
                comentario(event, div4); 
              });
           
    
            arregloPrinc.push(div1);
            resultados.appendChild(div1);
    
        });

        localStorage.setItem("datos_usuario", JSON.stringify(results));
    }
    
}

//Aquí comienzan los comentarios
//No funciona el localstorage
arreglo=[];

function comentario(event,contenedor){
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    
    if(event.key == "Enter" && event.target.value!=""){
        //Creamos un objeto
        var nuevo = {
            texto:event.target.value,
            noLikes:0
        }

        arreglo.push(nuevo);//arreglo.unshift (quitar)
        
        //Limpiamos el input y el contenedor
        event.target.value="";
        localStorage.setItem("comentarios",JSON.stringify(arreglo));

        arreglo.forEach(element => {
            var div1=document.createElement("div");
            var boton = document.createElement("button");
            var boton2 = document.createElement("button");
            boton.textContent=element.noLikes+": LIKES";
            div1.textContent=element.texto;
            boton2.textContent="Eliminar";

            div1.appendChild(boton);
            div1.appendChild(boton2);
            contenedor.appendChild(div1);

            boton.addEventListener("click",function(){
                element.noLikes = element.noLikes+1;
                boton.textContent=element.noLikes+": LIKES";
                localStorage.setItem("comentarios",JSON.stringify(arreglo));

            });
            boton2.addEventListener("click",function(){
                arreglo.pop();
                div1.innerHTML="";
                localStorage.setItem("comentarios",JSON.stringify(arreglo));

            });
            contenedor.appendChild(div1);
        });
        localStorage.setItem("comentarios",JSON.stringify(arreglo));
    }else{
         arreglo=[];
         localStorage.setItem("comentarios",JSON.stringify(arreglo));
    }
   
}