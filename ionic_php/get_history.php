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

   if($key==='history'){
      $item_id       = filter_var($_REQUEST['item_id'], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_ENCODE_LOW);
      try {
           $sql=("SELECT h.ID,
            h.date_modif_item as 'date_modif',
            wc.definition as 'category',
            h.comment,
            ws.definition as 'status',
            h.subject,
            u.lastname as 'user',
            w.definition as 'workflow'
        FROM history h 
        LEFT JOIN workflow_category wc 
          ON h.category_id=wc.ID 
        LEFT JOIN workflow_item_status ws 
          ON h.status_id=ws.ID 
        LEFT JOIN users u 
          ON h.user_id=u.ID
        LEFT JOIN workflow w 
          ON h.workflow_id=w.ID 
        WHERE h.item_id= :item_id
        ORDER BY h.date_modif_item DESC");
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':item_id', $item_id, PDO::PARAM_INT);
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
   }else echo 'error with key : '.$key;
?>