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

   if($key==='status'){
      $status_id       = filter_var($_REQUEST['status_id'], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_ENCODE_LOW);
      try {
           $sql=("SELECT wf.status_id_to as 'ID' ,ws.definition as'definition' 
                    FROM workflow_item_status ws 
                    LEFT JOIN workflow_item_status_flow wf
                  ON wf.status_id_to=ws.ID 
                    where wf.status_id_from= :status_id ");   
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':status_id', $status_id, PDO::PARAM_INT);
            $stmt->execute();

           while($row  = $stmt->fetch(PDO::FETCH_OBJ))
           {
              $data[] = $row;
           }
           echo json_encode($data);
        }
        catch(PDOException $e)
        {
           echo $e->getMessage();
        }
   }else die('error with key: '.$key);
?>