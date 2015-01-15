<?php

namespace Panel\AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/container")
 */
class ContainerController extends Controller
{
    /**
     * @Route("/{id}/delete", name="container_delete", condition="request.headers.get('X-Requested-With') == 'XMLHttpRequest'", options={"expose"=true})
     */
    public function delete($id)
    {
    	die("not implemented");
    }

    /**
     * @Route("/{id}/stop", name="container_stop", condition="request.headers.get('X-Requested-With') == 'XMLHttpRequest'", options={"expose"=true})
     */
    public function stop($id)
    {
    	$this->container->get("docker.api.container")->stop($id);

    	return new JsonResponse(array("success" => true));
    }

    /**
     * @Route("/{id}/pause", name="container_pause", condition="request.headers.get('X-Requested-With') == 'XMLHttpRequest'", options={"expose"=true})
     */
    public function pause($id)
    {
    	$this->container->get("docker.api.container")->pause($id);

    	return new JsonResponse(array("success" => true));
    }

    /**
     * @Route("/{id}/play", name="container_play", condition="request.headers.get('X-Requested-With') == 'XMLHttpRequest'", options={"expose"=true})
     */
    public function play($id)
    {
        $this->container->get("docker.api.container")->play($id);

        return new JsonResponse(array("success" => true));
    }

    /**
     * @Route("/{id}/trash", name="container_trash", condition="request.headers.get('X-Requested-With') == 'XMLHttpRequest'", options={"expose"=true})
     */
    public function trash($id)
    {
    	$this->container->get("docker.api.container")->trash($id);

    	return new JsonResponse(array("success" => true));
    }

    /**
     * @Route("/search", name="container_search")
     */
    public function search(Request $request)
    {
        $containers = $this->container->get("docker.api")->containers();
        foreach ($containers as $key => $container) {
            $found = false;

            if (strpos($container["Image"], $request->query->get("q")) !== false) {
                $found = true;
            } else {
                foreach ($container["Names"] as $name) {
                    if (strpos($name, $request->query->get("q")) !== false) {
                        $found = true;
                    }
                }
            }

            if ($found === false) {
                unset($containers[$key]);
            }
        }

        return new JsonResponse($containers);
    }
}
