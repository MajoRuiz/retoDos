// Importa el módulo http para la creación del servidor
const http = require ("http");

//Importa modulo para la manipulación de archivos
const fs = require("fs");

// Importa axios
const axios = require("axios");

//Funcion para importar los Jsons
function importacionDeJson() {
    axios //Se obtiene los datos proveedores
      .get(
        "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
      )
      .then((Response) => {
        let contenido = '>'
        let file = ''
        Response.data.forEach(element => {
            contenido+= `<tr>
            <th scope="row">${element.idproveedor}</th>
            <td>${element.nombrecompania}</td>
            <td>${element.nombrecontacto}</td>
          </tr>`
        });
        contenido+='</'
        // Lee un archivo del sistema de archivos
        file = fs.readFileSync('lista_Proveedores.html', 'utf-8')
        const arr = file.split('tbody')
        arr[1]=contenido
         // Crea un archivo dentro del sistema de archivos
        fs.writeFile('lista_Proveedores.html', arr.join('tbody'), (err)=>{
            console.error(err)})
  
  
      });
  
    axios
      .get(
        "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
      )
      .then((Response) => {
          let contenido= '>'
          let file = ''
          Response.data.forEach(element => {
              contenido+= `<tr>
              <th scope="row">${element.idCliente}</th>
              <td>${element.NombreCompania}</td>
              <td>${element.NombreContacto}</td>
            </tr>`
          });
          contenido+='</'
          file = fs.readFileSync('lista_Clientes.html', 'utf-8')
          const arr = file.split('tbody')
          arr[1]=contenido
          fs.writeFile('lista_Clientes.html', arr.join('tbody'), (err)=>{console.error(err)})
    
    
        });
  }
  importacionDeJson();
  // Crea una nueva instancia del servidor
  const server = http.
  createServer((req, res) => {
      if (req.url == '/api/proveedores'){
          // Lee un archivo del sistema de archivos
          fs.readFile('lista_Proveedores.html', function(err, data) {
              //Encabezado de la respuesta por defecto del servidor
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              return res.end();
            });
      }
      else if(req.url == '/api/clientes'){
          // Lee un archivo del sistema de archivos
          fs.readFile('lista_Clientes.html', function(err, data) {
              //Encabezado de la respuesta por defecto del servidor
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              return res.end();
            });
      }
      else {
          res.writeHead(404, {'Content-Type':'text/html'})
          res.end()
      }
       //Puerto que usará el servidor para escuchar las solicitudes
  }).listen(8081);
  