<?php
         $to = "anne-lise@all-pictures.fr";
         $subject = "Nouvelle subscription";

         $message = "";
         $message .= "E-mail : ";
         $message .= $_POST['email'];

         $headers = "From: anne-lise@all-pictures.fr\r\n";
         $header .= "Content-type: text/html\r\n";

         $retval = mail ($to,$subject,$message,$header);

         if( $retval == true )
         {
            echo "OK : " . $_POST['email'];
         }
         else
         {
            die( "KO");
         }
      ?>
