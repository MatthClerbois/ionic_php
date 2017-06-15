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
   if($key==='profile'){
      $user_id = filter_var($_REQUEST['user_id'], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_ENCODE_LOW);

      try {
         $sql=("SELECT firstname,lastname,email,date_creation FROM users where ID= :user_id "); 
         $stmt    = $pdo->prepare($sql);
         $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
         $stmt->execute();
         while($row  = $stmt->fetch(PDO::FETCH_OBJ)) {
            $data[] = $row;
         }
         echo json_encode($data);
      }
      catch(PDOException $e) {
         echo $e->getMessage();
      }
   }
?>