<?php
   header('Access-Control-Allow-Origin: *');
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = '';
   $db      = 'mainsys';
   $cs      = 'utf8';

   $dsn  = "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt  = array(
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
            PDO::ATTR_EMULATE_PREPARES   => false,
           );
   $pdo  = new PDO($dsn, $un, $pwd, $opt);
   $data = array();


   $key  = strip_tags($_REQUEST['key']);  
   if($key){
     	$user_id = filter_var($_REQUEST['user_id'], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_ENCODE_LOW);

      try {
         $sql=("SELECT wi.ID,wi.status_id, wi.subject, wi.comment,u.lastname as 'user' FROM workflow_items wi LEFT JOIN users u ON wi.user_id=u.ID where wi.user_id = :user_id ORDER BY wi.date_creation DESC"); 
         $stmt    = $pdo->prepare($sql);
         $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
         $stmt->execute();
         while($row  = $stmt->fetch(PDO::FETCH_OBJ)) {
            // Assign each row of data to associative array
            $data[] = $row;
         }

         // Return data as JSON
         echo json_encode($data);
      }
      catch(PDOException $e) {
         echo $e->getMessage();
      }
   }
?>