<?php

namespace Panel\AppBundle\Manager\Api;

use Panel\AppBundle\Utils\Utils;

class Docker
{
	private $errno;
	private $errstr;
	private $socket;

	public function __construct()
	{
		$this->errno  = null;
		$this->errstr = null;
        $this->socket();
	}

	public function get($url)
	{
        $out = "GET ".$url." HTTP/1.1\r\nConnection: Close\r\n\r\n";

		fwrite($this->socket, $out);

		$return = array();
		while (!feof($this->socket)) {
			$return[] = fgets($this->socket);
		}

		$this->socket();

		return $return;
	}

	public function post($url)
	{
        $out = "POST ".$url." HTTP/1.1\r\nConnection: Close\r\n\r\n";

		fwrite($this->socket, $out);

		$return = array();
		while (!feof($this->socket)) {
			$return[] = fgets($this->socket);
		}

		$this->socket();

		return $return;
	}

	public function delete($url)
	{
        $out = "DELETE ".$url." HTTP/1.1\r\nConnection: Close\r\n\r\n";

		fwrite($this->socket, $out);

		$return = array();
		while (!feof($this->socket)) {
			$return[] = fgets($this->socket);
		}

		$this->socket();

		return $return;
	}

	public function images()
	{
		return self::decode($this->get("/images/json"));
	}

	public function containers()
	{
		return self::decode($this->get("/containers/json"));
	}

	public function version()
	{
		$return = $this->get("/version");

		return json_decode(implode("", array_slice($return, array_search("\r\n", $return, true) + 1)), true);
	}

	protected function socket()
	{
		$this->socket = fsockopen("unix:///run/docker.sock", -1, $this->errno, $this->errstr, 60);
	}

	public static function decode(array $return)
	{
		if (array_search("Transfer-Encoding: chunked\r\n", $return)) {
			return json_decode(Utils::http_chunked_decode(implode("", array_slice($return, array_search("\r\n", $return, true) + 1))), true);
		}

		return json_decode(implode("", array_slice($return, array_search("\r\n", $return, true) + 1)), true);
	}
}