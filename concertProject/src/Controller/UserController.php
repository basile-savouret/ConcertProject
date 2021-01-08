<?php

namespace App\Controller;


use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/api/register", name="register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder, JWTTokenManagerInterface $JWTManager, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        try {
            $param = $request->getContent();
            $user = $serializer->deserialize($param, User::class, 'json');
            $pass = $encoder->encodePassword($user, $user->getPassword());
            $user->setPassword($pass);
            $errors = $validator->validate($user);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return new JsonResponse(['token' => $JWTManager->create($user)]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/api/user", name="updateUser", methods={"PUT"})
     */
    public function updateUser(Request $request, UserPasswordEncoderInterface $encoder, JWTTokenManagerInterface $JWTManager, SerializerInterface $serializer, ValidatorInterface $validator, UserRepository $userRepository): Response
    {
        try {
            $user = $userRepository->find($this->getUser()->getId()) ;
            $em = $this->getDoctrine()->getManager();
            $param = $request->getContent();
            $userUpdate = $serializer->deserialize($param, User::class, 'json');
            $user->setName($userUpdate->getName())
                ->setRoles($userUpdate->getRoles());
            $em->flush();

            return new JsonResponse(['token' => $JWTManager->create($user)]);
        } catch (NotAcceptableHttpException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
