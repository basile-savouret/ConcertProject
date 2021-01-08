<?php

namespace App\Controller;

use App\Entity\Show;
use App\Repository\BandRepository;
use App\Repository\HallRepository;
use App\Repository\ShowRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class ShowsController extends AbstractController
{
    /**
     * @Route("/api/shows/next", name="getPaginatedNextShows", methods={"GET"})
     */
    public function getPaginatedNextShows(Request $request, ShowRepository $showRepository): Response
    {
        $page = $request->query->get('page') ?? 0;
        $size = $request->query->get('size') ?? 10;
        $bandId = trim($request->query->get('bandId'));

        if (!is_null($bandId) && $bandId != "") {
            $shows = $showRepository->findAllByBand($bandId);
            $paginatedResult = ["list" => $shows, "total" => count($shows)];
            return $this->json($paginatedResult, 200, [], ["groups" => "normalized"]);
        }
        $total = $showRepository->getNextTotalCount();
        $shows = $showRepository->findAllNextPaginated($page, $size);
        $paginatedResult = ["list" => $shows, "total" => $total];
        return $this->json($paginatedResult, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/shows/before", name="getPaginatedBeforeShows", methods={"GET"})
     */
    public function getPaginatedBeforeShows(Request $request, ShowRepository $showRepository): Response
    {
        $page = $request->query->get('page') ?? 0;
        $size = $request->query->get('size') ?? 10;

        $total = $showRepository->getBeforeTotalCount();
        $shows = $showRepository->findAllBeforePaginated($page, $size);
        $paginatedResult = ["list" => $shows, "total" => $total];
        return $this->json($paginatedResult, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/shows/{showId}", name="getShow", methods={"GET"})
     */
    public function getShow(ShowRepository $showRepository, $showId): Response
    {
        $show = $showRepository->find($showId);
        return $this->json($show, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/shows/{showId}", name="updateShow", methods={"PUT"})
     * @Security("has_role('ROLE_ADMIN_SHOW')")
     */
    public function updateShow(Request $request, ShowRepository $showRepository, $showId, SerializerInterface $serializer, BandRepository $bandRepository, HallRepository $hallRepository): Response
    {
        try {
            $show = $showRepository->find($showId);
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $bodyDecoded = json_decode($param, true);
            $showUpdate = $serializer->deserialize($param, Show::class, 'json');
            $band = $bandRepository->find($bodyDecoded["band"]["id"]);
            $hall = $hallRepository-> find($bodyDecoded["hall"]["id"]);
            $show->setTourName($showUpdate->getTourName())
                ->setDate($showUpdate->getDate())
                ->setBand($band)
                ->setHall($hall);
            $em->flush();

            return $this->json($show, 200, [], ["groups" => "normalized"]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/api/shows", name="addShow", methods={"POST"})
     * @Security("has_role('ROLE_ADMIN_SHOW')")
     */
    public function addShow(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, BandRepository $bandRepository, HallRepository $hallRepository): Response
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $bodyDecoded = json_decode($param, true);
            $show = $serializer->deserialize($param, Show::class, 'json');
            $band = $bandRepository->find($bodyDecoded["band"]["id"]);
            $hall = $hallRepository-> find($bodyDecoded["hall"]["id"]);
            $show->setBand($band)
                ->setHall($hall);
            $errors = $validator->validate($show);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $em->persist($show);
            $em->flush();

            return $this->json($show, 200, [], ["groups" => "normalized"]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
