<!doctype html>
<html>
    <head>
    <link rel="shortcut icon" href="#" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <!-- Bootstrap CSS -->    
    <link rel="icon" href="img/ecosaba.png" type="ecosaba.png">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- FontAwesom CSS -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">        
    <!--Sweet Alert 2 -->
    <link rel="stylesheet" href="plugins/sweetalert2/sweetalert2.min.css">        
    <!--CSS custom -->  
    <link rel="stylesheet" href="main.css">  
    </head>
    <body>
    <header>
        <h2 class="text-center text-dark"><span class="badge badge-warning">CRUD pasteles e ingredientes</span></h2>
        <title>
        CRUD 
    </title>
    </header>    
    
     <div id="crudingrediente">               
        <div class="container">                
            <div class="row">       
                <div class="col">        
                    <button @click="btnAlta" class="btn btn-success" title="Nuevo"><i class="fas fa-plus-circle fa-2x"></i></button>
                </div>
                <div class="col text-right">                        
                    <h5>Stock Total: <span class="badge badge-success">{{totalstock}}</span></h5>
                </div>    
            </div>                
            <div class="row mt-5">
                <div class="col-lg-12">                    
                    <table class="table table-warning">
                        <thead>
                            <tr class="bg-primary text-light">
                                <th>ID</th>                                    
                                <th>Ingrediente</th>
                                <th>Descripción</th>
                                <th>Fecha de ingreso</th>    
                                <th>Fecha de vencimiento</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                                
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="(ingredient,indice) of ingredientes">                                
                                <td>{{ingredient.id_ingredientes}}</td>                                
                                <td>{{ingredient.ingrediente}}</td>
                                <td>{{ingredient.descripcion}}</td>
                                <td>{{ingredient.fecha_ingreso}}</td>
                                <td>{{ingredient.fecha_vencimiento}}</td>
                                <td>
                                    <div class="col-md-8">
                                    <input type="number" v-model.number="ingredient.stock" class="form-control text-right" disabled>      
                                    </div>    
                                </td>
                                <td>
                                <div class="btn-group" role="group">
                                    <button class="btn btn-secondary" title="Editar" @click="btnEditar(ingredient.id_ingredientes, ingredient.ingrediente, ingredient.descripcion, ingredient.fecha_ingreso, ingredient.fecha_vencimiento, ingredient.stock)"><i class="fas fa-pencil-alt"></i></button>    
                                    <button class="btn btn-danger" title="Eliminar" @click="btnBorrar(ingredient.id_ingredientes)"><i class="fas fa-trash-alt"></i></button>      
								</div>
                                </td>
                            </tr>    
                        </tbody>
                    </table>                    
                </div>
            </div>
        </div>        
    </div>        


    <div id="crudpastel">               
        <div class="container">                
            <div class="row">       
                <div class="col">        
                    <button @click="btnAlta" class="btn btn-success" title="Nuevo"><i class="fas fa-plus-circle fa-2x"></i></button>
                </div>
                <div class="col text-right">                        
                    <h5>Stock Total: <span class="badge badge-success">{{totalstock_pastel}}</span></h5>
                </div>    
            </div>                
            <div class="row mt-5">
                <div class="col-lg-12">                    
                    <table class="table table-warning">
                        <thead>
                            <tr class="bg-primary text-light">
                                <th>ID</th>                                    
                                <th>Nombre pastel</th>
                                <th>Preparado por</th>
                                <th>Fecha de creación</th>
                                <th>Fecha de vencimiento</th>
                                <th>Ingredientes</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                                
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="(cake,indice) of pasteles">                                
                                <td>{{cake.id_pastel}}</td>                                
                                <td>{{cake.nombre_pastel}}</td>
                                <td>{{cake.preparado}}</td>
                                <td>{{cake.fecha_creacion}}</td>
                                <td>{{cake.fecha_de_vencimiento}}</td>
                                <td>{{cake.ingrediente}}</td>
                                <td>
                                    <div class="col-md-8">
                                    <input type="number" v-model.number="cake.stock_pastel" class="form-control text-right" disabled>      
                                    </div>    
                                </td>
                                <td>
                                <div class="btn-group" role="group">
                                    <button class="btn btn-secondary" title="Editar" @click="btnEditar(cake.id_pastel, cake.nombre_pastel, cake.preparado, cake.fecha_creacion, cake.fecha_de_vencimiento, cake.stock_pastel)"><i class="fas fa-pencil-alt"></i></button>    
                                    <button class="btn btn-warning" title="Eliminar" @click="btnBorrar(cake.id_ingredientes)"><i class="fas fa-trash-alt"></i></button>      
								</div>
                                </td>
                            </tr>    
                        </tbody>
                    </table>                    
                </div>
            </div>
        </div>        
    </div>        
    <!-- jQuery, Popper.js, Bootstrap JS -->
    <script src="jquery/jquery-3.3.1.min.js"></script>
    <script src="popper/popper.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>         
    <!--Vue.JS -->    
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>              
    <!--Axios -->      
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.2/axios.js"></script>    
    <!--Sweet Alert 2 -->        
    <script src="plugins/sweetalert2/sweetalert2.all.min.js"></script>      
    <!--Código custom -->          
    <script src="main.js"></script>         
    </body>
</html>