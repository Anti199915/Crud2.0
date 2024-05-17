<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$_POST = json_decode(file_get_contents("php://input"), true);
$opcion = isset($_POST['opcion']) ? $_POST['opcion'] : '';
$id_ingredientes = isset($_POST['id_ingredientes']) ? $_POST['id_ingredientes'] : '';
$ingrediente = isset($_POST['ingrediente']) ? $_POST['ingrediente'] : '';
$descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : '';
$fecha_ingreso = isset($_POST['fecha_ingreso']) ? $_POST['fecha_ingreso'] : '';
$fecha_vencimiento = isset($_POST['fecha_vencimiento']) ? $_POST['fecha_vencimiento'] : '';
$stock = isset($_POST['stock']) ? $_POST['stock'] : '';

$id_pastel = (isset($_POST['id_pastel'])) ? $_POST['id_pastel'] : '';
$nombre_pastel = (isset($_POST['nombre_pastel'])) ? $_POST['nombre_pastel'] : '';
$preparado = (isset($_POST['preparado'])) ? $_POST['preparado'] : '';
$fecha_creacion = (isset($_POST['fecha_creacion'])) ? $_POST['fecha_creacion'] : '';
$fecha_de_vencimiento = (isset($_POST['fecha_de_vencimiento'])) ? $_POST['fecha_de_vencimiento'] : '';
$stock_pastel = (isset($_POST['stock_pastel'])) ? $_POST['stock_pastel'] : '';
$selectedIngredients = (isset($_POST['selectedIngredients'])) ? $_POST['selectedIngredients'] : [];

$data = [];

try {
    switch($opcion){
        case 1:
            $consulta = "INSERT INTO ingredientes (ingrediente, descripcion, fecha_ingreso, fecha_vencimiento, stock) 
                         VALUES(:ingrediente, :descripcion, :fecha_ingreso, :fecha_vencimiento, :stock)";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute([
                ':ingrediente' => $ingrediente,
                ':descripcion' => $descripcion,
                ':fecha_ingreso' => $fecha_ingreso,
                ':fecha_vencimiento' => $fecha_vencimiento,
                ':stock' => $stock
            ]);
            break;
        case 2:
            $consulta = "UPDATE ingredientes 
                         SET ingrediente = :ingrediente, descripcion = :descripcion, fecha_ingreso = :fecha_ingreso, fecha_vencimiento = :fecha_vencimiento, stock = :stock 
                         WHERE id_ingredientes = :id_ingredientes";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute([
                ':ingrediente' => $ingrediente,
                ':descripcion' => $descripcion,
                ':fecha_ingreso' => $fecha_ingreso,
                ':fecha_vencimiento' => $fecha_vencimiento,
                ':stock' => $stock,
                ':id_ingredientes' => $id_ingredientes
            ]);
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;        
        case 3:
            $consulta = "DELETE FROM ingredientes WHERE id_ingredientes = :id_ingredientes";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute([':id_ingredientes' => $id_ingredientes]);
            break;         
        case 4:
            $consulta = "SELECT id_ingredientes, ingrediente, descripcion, fecha_ingreso, fecha_vencimiento, stock FROM ingredientes";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 5:
            $consulta = "INSERT INTO pasteles (nombre_pastel, preparado, fecha_creacion, fecha_de_vencimiento, stock_pastel) 
                         VALUES(:nombre_pastel, :preparado, :fecha_creacion, :fecha_de_vencimiento, :stock_pastel)";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute([
                ':nombre_pastel' => $nombre_pastel,
                ':preparado' => $preparado,
                ':fecha_creacion' => $fecha_creacion,
                ':fecha_de_vencimiento' => $fecha_de_vencimiento,
                ':stock_pastel' => $stock_pastel
            ]);
            break;
        case 6:
            $consulta = "UPDATE pasteles 
                         SET nombre_pastel = :nombre_pastel, preparado = :preparado, fecha_creacion = :fecha_creacion, fecha_de_vencimiento = :fecha_de_vencimiento, stock_pastel = :stock_pastel 
                         WHERE id_pastel = :id_pastel";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute([
                ':nombre_pastel' => $nombre_pastel,
                ':preparado' => $preparado,
                ':fecha_creacion' => $fecha_creacion,
                ':fecha_de_vencimiento' => $fecha_de_vencimiento,
                ':stock_pastel' => $stock_pastel,
                ':id_pastel' => $id_pastel
            ]);
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;        
        case 7:
            $consulta = "DELETE FROM pasteles WHERE id_pastel = :id_pastel";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute([':id_pastel' => $id_pastel]);
            break;         
        case 8:
            $consulta = "SELECT id_pastel, nombre_pastel, preparado, fecha_creacion, fecha_de_vencimiento, stock_pastel FROM pasteles";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
        default:
            throw new Exception('Opción no válida');

    
            
    }
} catch (Exception $e) {
    $data = ['error' => $e->getMessage()];
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = NULL;
