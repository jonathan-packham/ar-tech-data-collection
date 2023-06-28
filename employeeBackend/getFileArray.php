<?php
/*  
Motivation: To help provide an accurate list of files
for JavScript service workers to cache. Saves time,
tedium, and possible typos in doing it manually.
        
Use the POSTed directory path to return an array
that lists all the files in that directory,
less the "." and ".." entries.
Prepend the directory name to the filenames so that
we have the "full path" to each file.
Return this array as a json string.
*/   
     $directory = $_POST["directory"] ;
      /* 
       You should probably sanitize $directory of all "../" prefixes
       in order to prevent a Directory Traversal Attack. 
       Using str_replace("/", "", $directory) has been suggested.
       It throws an error but prevents the attack.
     */
     $filelistArray = scandir( "../" . $directory );
     $cleanFileArray =  array();
     foreach( $filelistArray  as $file ){
         if ( $file !== "." and $file !== ".." ){
                array_push( $cleanFileArray, $directory . "/" . $file );
                echo($cleanFileArray);
         }       
     }
     $fileArrayJson = json_encode( $cleanFileArray );
     exit( $fileArrayJson );
?>