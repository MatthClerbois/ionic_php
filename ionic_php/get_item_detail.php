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
   $item_detail = array();
   $custom_fields = array();
   
   $key  = strip_tags($_REQUEST['key']);
   if($key==='detail'){
      $item_id       = filter_var($_REQUEST['item_id'], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_ENCODE_LOW);
      try {
           $sql=("SELECT DISTINCT 
            wi.ID as'item_id',
            w.ID as 'workflow_id',
            w.definition as 'workflow',
            u.lastname as 'user',
            u.ID as 'user_id',
              ws.definition as 'status',
              ws.ID as 'status_id',
            wc.definition as 'category',
            wc.ID as 'category_id',
            wi.subject as 'subject',
            wi.comment as 'comment',
            wi.date_creation as 'date_creation',
            (SELECT COUNT(wwf.ID)
              from workflow_files wwf 
              LEFT JOIN workflow_items wwi 
              ON wwf.item_id=wwi.ID where wwi.ID=wi.ID) as 'n_files'
          FROM workflow_items wi 
          LEFT JOIN workflow w 
            ON wi.workflow_id = w.ID
          LEFT JOIN workflow_item_status ws 
            ON wi.status_id = ws.ID
          LEFT JOIN workflow_category wc 
            ON wi.category_id = wc.ID
          LEFT JOIN users u 
            ON wi.user_id = u.ID
          WHERE wi.ID= :item_id "); 
        $stmt    = $pdo->prepare($sql);
        $stmt->bindParam(':item_id', $item_id, PDO::PARAM_INT);
        $stmt->execute();
        while($row_1  = $stmt->fetch(PDO::FETCH_OBJ)){
            $item_detail[] = $row_1;
        }
           $sql=("SELECT  
                cf.definition as 'cf_definition',
                icf.valeur as 'cf_value'
            FROM workflow_items_custom_fields icf
            LEFT JOIN workflow_custom_fields cf
                ON icf.custom_field_id=cf.ID
            WHERE icf.item_id= :item_id ");   
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':item_id', $item_id, PDO::PARAM_INT);
            $stmt->execute();
            while($row_2  = $stmt->fetch(PDO::FETCH_OBJ)){
                $custom_fields[]=$row_2; 
            }   
            $data=array('item'=>$item_detail,'custom_fields'=>$custom_fields);
            //var_dump($data);
            echo json_encode($data);
        }catch(PDOException $e){
           echo $e->getMessage();
        }
   }else echo('error with key: '.$key);  
?>