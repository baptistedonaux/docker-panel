<?php

namespace Panel\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template("PanelAppBundle:Default:index.html.twig")
     */
    public function indexAction()
    {
    	$version = $this->get("docker.api")->version();
    	$containers = $this->get("docker.api.container")->ps(array("all" => true));
    	$images = $this->get("docker.api")->images();

    	return array("containers" => $containers, "images" => $images, "version" => $version);
    }
}
