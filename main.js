BRAID.txt
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mover Triángulo</title>
    <style>
        canvas { background-color: #f0f0f0; }
    </style>
</head>
<body>
    <p id="info"></p>
<canvas id="canvas" width="400" height="400"></canvas>
<script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Posición inicial del triángulo
    let x = 200, y = 200;
    
    // Array para guardar las posiciones
    let posiciones = [];
    let lastArray=[]
    let lastDireccion=1;
    let posicionTiempo=-1;
    function dibujarTriangulo(direccion,modTiempo) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.beginPath();

        console.log("x "+x+"  y "+y+" direc "+direccion)
        switch(direccion) {
            case 1:ctx.moveTo(x, y);array=[40,0,20,-40]; break; 
            case 2:ctx.moveTo(x, y);array= [40,0,20,+40]; break; 
            case 3: ctx.moveTo(x+20, y); array=[20,20,-20,0,20,-20];break; 
            case 4: ctx.moveTo(x+20, y);array=[20,20,+60,0,20,-20]; break; 
        }

        ctx.lineTo(x +array[0], y + array[1]);
        ctx.lineTo(x  +array[2], y + array[3]);
        if(direccion>2){
            ctx.lineTo(x  +array[4], y + array[5]);
        }
        ctx.closePath();
        


        ctx.fillStyle = "blue";
        ctx.fill();
        //RASTRO
        rastro(ctx)
        


        // Guardar la posición actual
        console.log(posicionTiempo+"   leng+  "+posiciones.length)

        if(modTiempo==false){
            if(posicionTiempo!=posiciones.length-1){
            console.log("slice")
            posiciones.splice(posicionTiempo+1)
        }
            posicionTiempo=posiciones.length
            posiciones.push({x: x, y: y,dir:direccion});
        }
        

              // Mostrar la posición
       // mostrarPosicion();

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        //ctx.fillText(`Posición: (${x}, ${y})`, 10, 20);
        ctx.fillText(`Posición: (${x +array[0]}, ${y + array[1]}, ${x  +array[2]}, ${y + array[3]})`, 10, 20);
        document.getElementById("info").textContent=posiciones[posiciones.length-1].x+"  "+posiciones[posiciones.length-1].y
    }
    
    function rastro(ctx) {
       for (var i = 0; i < posiciones.length; i++) {
    ctx.beginPath(); // Comienza un nuevo camino
    // arc(x, y, radio, anguloInicio, anguloFin, [antihorario])
   // if(posiciones[i].dir==1||posiciones[i].dir==2){
    ctx.arc(posiciones[i].x, posiciones[i].y, 5, 0, Math.PI * 2, false); // Dibuja el círculo
    ctx.closePath(); // Cierra el camino
    ctx.fill(); // Rellena el círculo
} 
      
    }

    function mostrarPosicion() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        //ctx.fillText(`Posición: (${x}, ${y})`, 10, 20);
        ctx.fillText(`Posición: (${ctx.font}, ${y})`, 10, 20);
 
    }



    document.addEventListener('keydown', function(evento) {
        const velocidad = 5;
        let array=[]
        let direccion=1;
        let modTiempo=false;
        let ultimaPos
        switch(evento.key) {
            case 'ArrowUp':    y -= velocidad;direccion=1; break;
            case 'ArrowDown':  y += velocidad;direccion=2;break;
            case 'ArrowLeft':  x -= velocidad;direccion=3;break;
            case 'ArrowRight': x += velocidad;direccion=4; break;
            case 'q':console.log("qqq");
            modTiempo=true;
            direccion=posiciones[0].dir
            if(posicionTiempo!=0){
            if(posicionTiempo==-1){
                posicionTiempo=posiciones.length-1
                           }
                posicionTiempo-=1
                ultimaPos=posiciones[posicionTiempo];
                x=ultimaPos.x
                y=ultimaPos.y
                direccion=ultimaPos.dir
                }
            break;
            case 'e':console.log(posiciones.length+"  eee  "+posicionTiempo);
            modTiempo=true
            direccion=posiciones[posiciones.length-1].dir
            if(posicionTiempo!=-1&&posicionTiempo<posiciones.length-1){
  
                posicionTiempo+=1
                ultimaPos=posiciones[posicionTiempo];
                x=ultimaPos.x
                y=ultimaPos.y
                direccion=ultimaPos.dir
                
            
        }
            break;
        }
        dibujarTriangulo(direccion,modTiempo);
    });

    // Dibujar el triángulo inicialmente
    let array=[40,0,20,-40]
    dibujarTriangulo(1);
</script>
</body>
</html>