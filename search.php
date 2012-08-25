<?php
//если не работает, то возможно на сервере не правильно настроена кодировка
//ищем в текущем каталоге
$dir = opendir('.');
$result=array();
$str='школа разработки интерфейсов';
while($file = readdir($dir)){
 if(is_file($file)){
		$ext=explode('.',$file);
		$name=$ext[0];
		$ext=$ext[1];
		if($ext=='txt' && substr_count($name,'yandex')){
			$text_of_file=file($file); 
			$text_of_file=$text_of_file[0];
			if(substr_count($text_of_file,$str)){ 
				//echo 'found! '. $file.'<br>'; 
			    $result[]=$file;	
			}else{
			   // echo 'not found ' . $file . '<br>';
			}
		}else{
			//echo 'ignored ' .$file.'<br>';
		}
	}
}
//массив $result хранит имена файлов, удовлетворяющих поставленному условию
closedir($dir);
echo '<pre>'.print_r($result,1).'</pre>';
?>