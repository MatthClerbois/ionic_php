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

   // Retrieve specific parameter from supplied URL
   $key  = strip_tags($_REQUEST['key']);
   $data    = array();


   // Determine which mode is being requested
   //print_r($_REQUEST);

   if($key){
        // print_r($_REQUEST);
         $user       = filter_var($_REQUEST['user'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $password   = filter_var($_REQUEST['password'], FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
         //echo '<br/>user: '.$user;
         //echo '<br/>password: '.$password;


         // Attempt to run PDO prepared statement
         try {
            $sql="SELECT * FROM users u where u.login = :user AND u.password = :password ";

            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':user', $user, PDO::PARAM_STR);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
            $stmt->execute();

            while($row  = $stmt->fetch(PDO::FETCH_OBJ)){
               $data[] = $row;
            }
            echo json_encode($data);
         }
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }
   }

?>