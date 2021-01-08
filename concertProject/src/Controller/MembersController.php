<?php

namespace App\Controller;

use App\Entity\Member;
use App\Repository\MemberRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class MembersController extends AbstractController
{
    /**
     * @Route("/api/members", name="getAllMembers", methods={"GET"})
     */
    public function getAllMembers(MemberRepository $memberRepository): Response
    {
        $members = $memberRepository->findAll();
        return $this->json($members, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/members/{memberId}", name="getMember", methods={"GET"})
     */
    public function getMember(MemberRepository $memberRepository, $memberId): Response
    {
        $members = $memberRepository->find($memberId);
        return $this->json($members, 200, [], ["groups" => "normalized"]);
    }

    /**
     * @Route("/api/members/{memberId}", name="updateMember", methods={"PUT"})
     * @Security("has_role('ROLE_ADMIN_MEMBER')")
     */
    public function updateMember(Request $request, MemberRepository $memberRepository, $memberId, SerializerInterface $serializer): Response
    {
        try {
            $member = $memberRepository->find($memberId);
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $memberUpdate = $serializer->deserialize($param, Member::class, 'json');
            $member->setName($memberUpdate->getName())
                ->setJob($memberUpdate->getJob())
                ->setFirstName($memberUpdate->getFirstname());
            $em->flush();

            return $this->json($member, 200, [], ["groups" => "normalized"]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/api/members", name="addMember", methods={"POST"})
     * @Security("has_role('ROLE_ADMIN_MEMBER')")
     */
    public function addMember(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $member = $serializer->deserialize($param, Member::class, 'json');
            $errors = $validator->validate($member);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $em->persist($member);
            $em->flush();

            return $this->json($member, 200, [], ["groups" => "normalized"]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
