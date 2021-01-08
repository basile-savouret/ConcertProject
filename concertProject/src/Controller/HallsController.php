<?php

namespace App\Controller;

use App\Entity\Hall;
use App\Repository\HallRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class HallsController extends AbstractController
{
    /**
     * @Route("/api/halls", name="getAllHalls", methods={"GET"})
     */
    public function getAllHalls(HallRepository $hallRepository): Response
    {
        $halls = $hallRepository->findAll();
        return $this->json($halls, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/halls/{hallId}", name="getHall", methods={"GET"})
     */
    public function getHall(HallRepository $hallRepository, $hallId): Response
    {
        $hall = $hallRepository->find($hallId);
        return $this->json($hall, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/halls/{HallId}", name="updateHall", methods={"PUT"})
     * @Security("has_role('ROLE_ADMIN_SHOW')")
     */
    public function updateHall(Request $request, HallRepository $hallRepository, $HallId, SerializerInterface $serializer): Response
    {
        try {
            $hall = $hallRepository->find($HallId);
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $hallUpdate = $serializer->deserialize($param, Hall::class, 'json');
            $hall->setName($hallUpdate->getName())
                ->setAddress($hallUpdate->getAddress())
                ->setCapacity($hallUpdate->getCapacity())
                ->setCity($hallUpdate->getCity());
            $em->flush();

            return $this->json($hall, 200, [], ["groups" => "normalized"]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/api/halls", name="addHall", methods={"POST"})
     * @Security("has_role('ROLE_ADMIN_SHOW')")
     */
    public function addHall(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $hall = $serializer->deserialize($param, Hall::class, 'json');
            $errors = $validator->validate($hall);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $em->persist($hall);
            $em->flush();

            return $this->json($hall, 200, [], ["groups" => "normalized"]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
