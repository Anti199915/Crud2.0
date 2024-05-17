var url = "bd/crud.php";

var crudingrediente = new Vue({    
    el: "#crudingrediente",   
    data: {     
        ingredientes: [],          
        ingrediente: "",
        descripcion: "",
        fecha_ingreso: "",
        fecha_vencimiento: "",
        stock: "",
        total: 0,       
    },    
    methods: {  
        // BOTONES        
        btnAlta: async function() {                    
            const {value: formValues} = await Swal.fire({
                title: 'NUEVO',
                html: `
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Ingrediente</label>
                        <div class="col-sm-7">
                            <input id="ingrediente" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Descripción</label>
                        <div class="col-sm-7">
                            <input id="descripcion" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Fecha de ingreso</label>
                        <div class="col-sm-7">
                            <input id="fecha_ingreso" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Fecha de vencimiento</label>
                        <div class="col-sm-7">
                            <input id="fecha_vencimiento" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Stock</label>
                        <div class="col-sm-7">
                            <input id="stock" type="number" min="0" class="form-control">
                        </div>
                    </div>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',          
                confirmButtonColor: '#1cc88a',          
                cancelButtonColor: '#3085d6',  
                preConfirm: () => {            
                    return [
                        document.getElementById('ingrediente').value,
                        document.getElementById('descripcion').value,
                        document.getElementById('fecha_ingreso').value,
                        document.getElementById('fecha_vencimiento').value,       
                        document.getElementById('stock').value
                    ]
                }
            });

            if (!formValues || formValues.includes("") || formValues[4] <= 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',                                    
                }); 
            } else {
                [this.ingrediente, this.descripcion, this.fecha_ingreso, this.fecha_vencimiento, this.stock] = formValues;
                this.altaingredient();
                Swal.fire({
                    icon: 'success',
                    title: 'Ingrediente agregado',
                });
            }
        },           
        btnEditar: async function(id_ingredientes, ingrediente, descripcion, fecha_ingreso, fecha_vencimiento, stock) {                            
            const {value: formValues} = await Swal.fire({
                title: 'EDITAR',
                html: `
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Ingrediente</label>
                            <div class="col-sm-7">
                                <input id="ingrediente" value="${ingrediente}" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Descripción</label>
                            <div class="col-sm-7">
                                <input id="descripcion" value="${descripcion}" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Fecha de ingreso</label>
                            <div class="col-sm-7">
                                <input id="fecha_ingreso" value="${fecha_ingreso}" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Fecha de vencimiento</label>
                            <div class="col-sm-7">
                                <input id="fecha_vencimiento" value="${fecha_vencimiento}" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Stock</label>
                            <div class="col-sm-7">
                                <input id="stock" value="${stock}" type="number" min="0" class="form-control">
                            </div>
                        </div>
                    </div>
                `, 
                focusConfirm: false,
                showCancelButton: true,                         
            }).then((result) => {
                if (result.value) {                                             
                    const updatedValues = [
                        document.getElementById('ingrediente').value,
                        document.getElementById('descripcion').value,
                        document.getElementById('fecha_ingreso').value,
                        document.getElementById('fecha_vencimiento').value, 
                        document.getElementById('stock').value
                    ];

                    this.editaringredient(id_ingredientes, ...updatedValues);
                    Swal.fire(
                        '¡Actualizado!',
                        'El registro ha sido actualizado.',
                        'success'
                    );                  
                }
            });
        },        
        btnBorrar: function(id_ingredientes) {        
            Swal.fire({
                title: `¿Está seguro de borrar el registro: ${id_ingredientes}?`,         
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Borrar'
            }).then((result) => {
                if (result.value) {            
                    this.borraringredient(id_ingredientes);             
                    Swal.fire(
                        '¡Eliminado!',
                        'El registro ha sido borrado.',
                        'success'
                    );
                }
            });                
        },       
        
        // PROCEDIMIENTOS para el CRUD     
        listaringredientes: function() {
            axios.post(url, {opcion: 4}).then(response => {
                this.ingredientes = response.data;       
            });
        },    
        // Procedimiento CREAR.
        altaingredient: function() {
            axios.post(url, {opcion: 1, ingrediente: this.ingrediente, descripcion: this.descripcion, fecha_ingreso: this.fecha_ingreso, fecha_vencimiento: this.fecha_vencimiento, stock: this.stock}).then(response => {
                this.listaringredientes();
            });        
            this.ingrediente = "";
            this.descripcion = "";
            this.fecha_ingreso = "";
            this.fecha_vencimiento = "";
            this.stock = ""; // Cambiado de 0 a ""
        },               
        // Procedimiento EDITAR.
        editaringredient: function(id_ingredientes, ingrediente, descripcion, fecha_ingreso, fecha_vencimiento, stock) {       
            axios.post(url, {opcion: 2, id_ingredientes: id_ingredientes, ingrediente: ingrediente, descripcion: descripcion, fecha_ingreso: fecha_ingreso, fecha_vencimiento: fecha_vencimiento, stock: stock}).then(response => {           
                this.listaringredientes();           
            });                              
        },    
        // Procedimiento BORRAR.
        borraringredient: function(id_ingredientes) {
            axios.post(url, {opcion: 3, id_ingredientes: id_ingredientes}).then(response => {           
                this.listaringredientes();
            });
        }             
    },      
    created: function() {            
        this.listaringredientes();            
    },    
    computed: {
        totalstock() {
            this.total = 0;
            for (let ingredient of this.ingredientes) {
                this.total += parseInt(ingredient.stock, 10);
            }
            return this.total;   
        }
    }    
});



var url = "bd/crud.php";

var crudpastel = new Vue({    
    el: "#crudpastel",   
    data: {     
      pasteles: [],          
      nombre_pastel: "",
      preparado: "",
      fecha_creacion: "",
      fecha_de_vencimiento: "",
      stock_pastel: "",
      total: 0,       
    },    
    methods: {  
        // BOTONES        
        btnAlta: async function() {                    
            const {value: formValues} = await Swal.fire({
                title: 'NUEVO',
                html: `
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Pastel</label>
                        <div class="col-sm-7">
                            <input id="nombre_pastel" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Preparado por</label>
                        <div class="col-sm-7">
                            <input id="preparado" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Fecha de creación</label>
                        <div class="col-sm-7">
                            <input id="fecha_creacion" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Fecha de vencimiento</label>
                        <div class="col-sm-7">
                            <input id="fecha_de_vencimiento" type="date" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Ingredientes</label>
                        <div class="col-sm-7">
                            <input id="Ingredientes" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <label class="col-sm-3 col-form-label">Stock</label>
                        <div class="col-sm-7">
                            <input id="stock_pastel" type="number" min="0" class="form-control">
                        </div>
                    </div>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',          
                confirmButtonColor: '#1cc88a',          
                cancelButtonColor: '#3085d6',  
                preConfirm: () => {            
                    return [
                        document.getElementById('nombre_pastel').value,
                        document.getElementById('preparado').value,
                        document.getElementById('fecha_creacion').value,
                        document.getElementById('fecha_de_vencimiento').value,       
                        document.getElementById('stock_pastel').value
                    ]
                }
            });

            if (!formValues || formValues.includes("") || formValues[4] <= 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',                                    
                }); 
            } else {
                [this.nombre_pastel, this.preparado, this.fecha_creacion, this.fecha_de_vencimiento, this.stock_pastel] = formValues;
                this.altacake();
                Swal.fire({
                    icon: 'success',
                    title: 'Pastel agregado',
                });
            }
        },           
        btnEditar: async function(id_pastel, nombre_pastel, preparado, fecha_creacion, fecha_de_vencimiento, stock_pastel) {                            
            const {value: formValues} = await Swal.fire({
                title: 'EDITAR',
                html: `
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Pastel</label>
                            <div class="col-sm-7">
                                <input id="nombre_pastel" value="${nombre_pastel}" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Preparado por</label>
                            <div class="col-sm-7">
                                <input id="preparado" value="${preparado}" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Fecha de creación</label>
                            <div class="col-sm-7">
                                <input id="fecha_creacion" value="${fecha_creacion}" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Fecha de vencimiento</label>
                            <div class="col-sm-7">
                                <input id="fecha_de_vencimiento" value="${fecha_de_vencimiento}" type="date" class="form-control">
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 col-form-label">Stock</label>
                            <div class="col-sm-7">
                                <input id="stock_pastel" value="${stock_pastel}" type="number" min="0" class="form-control">
                            </div>
                        </div>
                    </div>
                `, 
                focusConfirm: false,
                showCancelButton: true,                         
            }).then((result) => {
                if (result.value) {                                             
                    const updatedValues = [
                        document.getElementById('nombre_pastel').value,
                        document.getElementById('preparado').value,
                        document.getElementById('fecha_creacion').value,
                        document.getElementById('fecha_de_vencimiento').value, 
                        document.getElementById('stock_pastel').value
                    ];

                    this.editarcake(id_pastel, ...updatedValues);
                    Swal.fire(
                        '¡Actualizado!',
                        'El registro ha sido actualizado.',
                        'success'
                    );                  
                }
            });
        },        
        btnBorrar: function(id_pastel) {        
            Swal.fire({
                title: `¿Está seguro de borrar el registro: ${id_pastel}?`,         
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Borrar'
            }).then((result) => {
                if (result.value) {            
                    this.borrarcake(id_pastel);             
                    Swal.fire(
                        '¡Eliminado!',
                        'El registro ha sido borrado.',
                        'success'
                    );
                }
            });                
        },       
        
        listarpasteles: function() {
            axios.post(url, {opcion: 8}).then(response => {
                this.pasteles = response.data;       
            });
        },    
        // Procedimiento CREAR.
        altacake: function() {
            axios.post(url, {opcion: 5, nombre_pastel: this.nombre_pastel, preparado: this.preparado, fecha_creacion: this.fecha_creacion, fecha_de_vencimiento: this.fecha_de_vencimiento, ingredientes: this.ingredientesSeleccionados, stock_pastel: this.stock_pastel}).then(response => {
                this.listarpasteles();
            });        
            this.nombre_pastel = "";
            this.preparado = "";
            this.fecha_creacion = "";
            this.fecha_de_vencimiento = "";
            this.ingredientesSeleccionados = [];
            this.stock_pastel = "";
        },               
        // Procedimiento EDITAR.
        editarcake: function(id_pastel , nombre_pastel, preparado, fecha_creacion, fecha_de_vencimiento, stock_pastel) {       
            axios.post(url, {opcion: 6, id_pastel: id_pastel, nombre_pastel: nombre_pastel, preparado: preparado, fecha_creacion: fecha_creacion, fecha_de_vencimiento: fecha_de_vencimiento, ingredientes: this.ingredientesSeleccionados, stock_pastel: stock_pastel}).then(response => {           
                this.listarpasteles();           
            });                              
        },    
        // Procedimiento BORRAR.
        borrarcake: function(id_pastel) {
            axios.post(url, {opcion: 7, id_pastel: id_pastel}).then(response => {           
                this.listarpasteles();
            });
        }             
    },      
    created: function() {            
        this.listarpasteles();            
    },    
    computed: {
        totalstock_pastel() {
            this.total = 0;
            for (let cake of this.pasteles) {
                this.total += parseInt(cake.stock_pastel, 10);
            }
            return this.total;   
        }
    }    
});
