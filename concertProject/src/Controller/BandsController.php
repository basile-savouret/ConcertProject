<?php

namespace App\Controller;

use App\Entity\Band;
use App\Repository\BandRepository;
use App\Repository\MemberRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BandsController extends AbstractController
{
    /**
     * @Route("/api/bands", name="getAllBands", methods={"GET"})
     */
    public function getAllBands(BandRepository $bandRepository): Response
    {
        $bands = $bandRepository->findAll();
        return $this->json($bands, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/bands/{bandId}", name="getBand", methods={"GET"})
     */
    public function getBand(BandRepository $bandRepository, $bandId): Response
    {
        $band = $bandRepository->find($bandId);
        return $this->json($band, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/bands/{BandId}", name="updateBand", methods={"PUT"})
     * @Security("has_role('ROLE_ADMIN_BAND')")
     */
    public function updateBand(Request $request, BandRepository $bandRepository, $BandId, SerializerInterface $serializer, MemberRepository $memberRepository): Response
    {
        try {
            $band = $bandRepository->find($BandId);
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $bodyDecoded = json_decode($param, true);
            $bandUpdate = $serializer->deserialize($param, Band::class, 'json');
            $oldMembers = $band->getMembers();
            foreach ($oldMembers as $member) {
                $band->removeMember($member);
            }
            foreach ($bodyDecoded["members"] as $ref) {
                $member = $memberRepository->find($ref["id"]);
                $band->addMember($member);
            }
            $band->setLastAlbumName($bandUpdate->getLastAlbumName())
                ->setStyle($bandUpdate->getStyle())
                ->setYearOfCreation($bandUpdate->getYearOfCreation())
                ->setName($bandUpdate->getName());
            $em->flush();

            return $this->json($band, 200, [], ["groups" => "normalized"]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/api/bands", name="addBand", methods={"POST"})
     * @Security("has_role('ROLE_ADMIN_BAND')")
     */
    public function addBand(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, MemberRepository $memberRepository): Response
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $bodyDecoded = json_decode($param, true);
            unset($bodyDecoded['members']);
            $band = $serializer->deserialize(json_encode($bodyDecoded), Band::class, 'json');
            $bodyDecoded = json_decode($param, true);
            foreach ($bodyDecoded["members"] as $ref) {
                $member = $memberRepository->find($ref["id"]);
                $band->addMember($member);
            }
            $errors = $validator->validate($band);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $em->persist($band);
            $em->flush();

            return $this->json($band, 200, [], ["groups" => "normalized"]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
