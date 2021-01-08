<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder) {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $a1 = new User();
        $hash1 = $this->encoder->encodePassword($a1, 'admin');
        $a1->setEmail("admin@admin.fr")
            ->setRoles(["ROLE_ADMIN_SHOW", "ROLE_ADMIN_BAND", "ROLE_ADMIN_MEMBER"])
            ->setName("admin")
            ->setPassword($hash1);
        $manager->persist($a1);

        $a2 = new User();
        $hash2 = $this->encoder->encodePassword($a2, 'user');
        $a2->setEmail("user@user.fr")
            ->setName("user")
            ->setPassword($hash2);
        $manager->persist($a2);

        $manager->flush();
    }
}
