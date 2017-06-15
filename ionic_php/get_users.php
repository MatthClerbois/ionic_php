<?php
   header('Access-Control-Allow-Origin: *');

   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = '';
   $db      = 'mainsys';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn  = "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt  = array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo  = new PDO($dsn, $un, $pwd, $opt);
   $data = array();

   $key  = strip_tags($_REQUEST['key']);
   $data    = array();


   if($key==="newUser"){
        $user_id       = filter_var($_REQUEST['user_id'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
        $item_id   = filter_var($_REQUEST['item_id'], FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
         
      try {
         $sql="UPDATE workflow_items SET user_id = :user_id WHERE ID = :item_id";
         $stmt    = $pdo->prepare($sql);
         $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
         $stmt->bindParam(':item_id', $item_id, PDO::PARAM_INT);
         if($stmt->execute()){
             $success=true;
         }else{    
             $success=$stmt->errorCode();
         }
      }
      catch(PDOException $e)
      {
         $success=$e->getMessage();
      }
      echo json_encode($success);

   }
   if($key==='getUsers'){
      try {
         $stmt    = $pdo->query('SELECT ID,lastname,firstname,login,email,date_creation FROM users ORDER BY ID ASC');
         while($row  = $stmt->fetch(PDO::FETCH_OBJ))
         {
            // Assign each row of data to associative array
            $data[] = $row;
         }
      }catch(PDOException $e){
         $data=$e->getMessage();
      }
      echo json_encode($data);
   }


?>