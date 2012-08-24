<?php
//в текущем каталоге
$dir = opendir('.');
while($file = readdir($dir)){
	$result=array();
	if(is_file($file)){
			$ext=explode('.',$file);
			$ext=$ext[1];
			if($ext=='txt'){
				$str='школа разработки интерфейсов'; 
				$text_of_file=file($file); 
				$text_of_file=$text_of_file[0];
				if(substr_count($text_of_file,$str)){ 
					echo 'найдено в '. $file.'<br>'; 
					$result[]=$file;
				}else{
				   echo 'не найдено в '. $file.'<br>'; 
				}
			}else{
				echo 'проигнорирован ' .$file.'<br>';
			}
	}
}
//массив $result хранит имена файлов, где есть строка школа разработки интерфейсов
closedir($dir);
?>